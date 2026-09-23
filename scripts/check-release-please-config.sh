#!/usr/bin/env bash
# Validates release-please-config.json so manifest releases stay attribution-correct.
#
# The two things that must never regress:
#   1. Every package must declare `component` (or `package-name`); without it
#      release-please resolves an empty component, which silently breaks tag
#      matching, per-component branch names and per-package pull requests.
#   2. Key ordering ($schema, then lexicographic, packages last) for deterministic diffs.
#
# Usage (works locally or in CI):
#   bash scripts/check-release-please-config.sh [path/to/release-please-config.json]
#
# Depends on jq; errors are accumulated and reported all at once.

set -uo pipefail

CONFIG="${1:-release-please-config.json}"

say_err() { echo "error: $*" >&2; }
say_warn() { echo "warning: $*" >&2; }

failures=0

if ! command -v jq >/dev/null 2>&1; then
  say_err "jq is required to run this check"
  exit 1
fi

if [[ ! -f "$CONFIG" ]]; then
  say_err "config file not found: $CONFIG"
  exit 1
fi

# --- JSON validity and object shape ---
if ! jq -e 'type == "object"' "$CONFIG" >/dev/null 2>&1; then
  say_err "$CONFIG is not a valid JSON object"
  exit 1
fi

# --- root key ordering: $schema first, lexicographic, packages last ---
mapfile -t root_keys < <(jq -r 'keys_unsorted[]' "$CONFIG")

if [[ "${root_keys[0]-}" != '$schema' ]]; then
  say_err "root key order: first key must be \"\$schema\" (got \"${root_keys[0]-<none>}\")"
  ((failures += 1))
fi

if [[ "${root_keys[-1]-}" != "packages" ]]; then
  say_err "root key order: \"packages\" must be the last key (got \"${root_keys[-1]-<none>}\")"
  ((failures += 1))
fi

mid_keys=()
for k in "${root_keys[@]}"; do
  [[ "$k" == '$schema' || "$k" == 'packages' ]] && continue
  mid_keys+=("$k")
done
mapfile -t mid_sorted < <(printf '%s\n' "${mid_keys[@]}" | sort)
if [[ "${mid_keys[*]:-}" != "${mid_sorted[*]:-}" ]]; then
  say_err "root key order: keys after \"\$schema\" must be lexicographic (got: ${mid_keys[*]:-none})"
  ((failures += 1))
fi

# --- packages: identity + per-package ordering ---
if ! jq -e '.packages | type == "object"' "$CONFIG" >/dev/null 2>&1; then
  say_err "key \"packages\" must be an object"
  ((failures += 1))
else
  while IFS= read -r pkg; do
    if ! jq -e --arg p "$pkg" '.packages[$p] | type == "object" and (has("component") or has("package-name"))' "$CONFIG" >/dev/null 2>&1; then
      say_err "packages.$pkg must define \"component\" (or \"package-name\"): required for tag matching, per-component branches and per-package pull requests"
      ((failures += 1))
    fi

    mapfile -t pkg_keys < <(jq -r --arg p "$pkg" '.packages[$p] | keys_unsorted[]' "$CONFIG")
    mapfile -t pkg_sorted < <(printf '%s\n' "${pkg_keys[@]}" | sort)
    if [[ "${pkg_keys[*]:-}" != "${pkg_sorted[*]:-}" ]]; then
      say_err "packages.$pkg: keys must be lexicographic (got: ${pkg_keys[*]:-none})"
      ((failures += 1))
    fi

    # version-file / changelog-path resolve relative to the package dir; a value
    # repeating the dir name produces a doubled path (e.g. docker-build/docker-build/CHANGELOG.md)
    for field in version-file changelog-path; do
      if jq -e --arg p "$pkg" --arg f "$field" '.packages[$p] | has($f)' "$CONFIG" >/dev/null 2>&1; then
        value=$(jq -r --arg p "$pkg" --arg f "$field" '.packages[$p][$f]' "$CONFIG")
        case "$field" in
          version-file) default_name="version.txt" ;;
          changelog-path) default_name="CHANGELOG.md" ;;
        esac
        if [[ "$value" == *"$(basename "$pkg")"* ]]; then
          say_warn "packages.$pkg.$field=\"$value\" is resolved relative to the package dir; use a bare filename (or omit it to use the default <package>/$default_name)"
        fi
      fi
    done
  done < <(jq -r '.packages | keys[]' "$CONFIG")
fi

# --- tag format: must resolve to <component>-vX.Y.Z tags ---
# Existing releases use e.g. docker-build-v2.5.2 / docker-build-cloud-v1.1.1; any
# deviation silently orphans tag matching and walks all history in the next run.
tag_include_component=$(jq -r 'if has("include-component-in-tag") then ."include-component-in-tag" else true end' "$CONFIG")
tag_include_v=$(jq -r 'if has("include-v-in-tag") then ."include-v-in-tag" else true end' "$CONFIG")
tag_separator=$(jq -r 'if has("tag-separator") then ."tag-separator" else "-" end' "$CONFIG")
if [[ "$tag_include_component" != "true" || "$tag_include_v" != "true" || "$tag_separator" != "-" ]]; then
  say_err "tags must resolve to <component>-vX.Y.Z: keep include-component-in-tag=true, include-v-in-tag=true and tag-separator=\"-\" (effective: component=$tag_include_component, v-prefix=$tag_include_v, separator=\"$tag_separator\")"
  ((failures += 1))
fi

if ((failures > 0)); then
  echo "release-please-config validation FAILED ($failures error(s))" >&2
  exit 1
fi

echo "release-please-config validation OK"
