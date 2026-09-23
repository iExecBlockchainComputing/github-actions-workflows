#!/usr/bin/env bash
set -uo pipefail

cd "$(dirname "$0")/.."

check=false
if [[ "${1:-}" == "--check" ]]; then
  check=true
fi

outdated=false
errors=0

say_err() { echo "error: $*" >&2; }

if ! command -v jq >/dev/null 2>&1; then
  say_err "jq is required to run this script"
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then
  sha_cmd=(sha256sum)
elif command -v shasum >/dev/null 2>&1; then
  sha_cmd=(shasum -a 256)
else
  say_err "neither sha256sum nor shasum is available"
  exit 1
fi

mapfile -t package_names < <(jq -r '.packages | keys[]' release-please-config.json)

for name in "${package_names[@]}"; do
  workflow_file=".github/workflows/$name.yml"
  sha_file="$name/workflow-sha256"

  if [[ ! -f "$workflow_file" ]]; then
    say_err "workflow file missing: $workflow_file"
    ((errors += 1))
    continue
  fi

  computed_sha="$("${sha_cmd[@]}" "$workflow_file" | awk '{print $1}')"

  if [[ "$check" == true ]]; then
    if [[ ! -f "$sha_file" ]] || [[ "$(cat "$sha_file")" != "$computed_sha" ]]; then
      echo "outdated \`$sha_file\`" >&2
      outdated=true
    fi
  else
    if ! mkdir -p "$name"; then
      say_err "could not create package dir: $name"
      ((errors += 1))
      continue
    fi
    echo "$computed_sha" > "$sha_file"
    echo "$sha_file: $computed_sha" >&2
  fi
done

if [[ "$check" == true ]] && [[ "$outdated" == true ]]; then
  echo "found outdated workflow sha256: execute \`compute-workflow-sha256.sh\` to refresh workflows sha256"
  exit 1
fi

if ((errors > 0)); then
  say_err "$errors error(s)"
  exit 1
fi
