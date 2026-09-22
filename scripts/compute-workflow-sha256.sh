#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

check=false
if [[ "${1:-}" == "--check" ]]; then
  check=true
fi

outdated=false

mapfile -t workflow_files < <(grep -lE "^[[:space:]]*workflow_call:[[:space:]]*$" .github/workflows/*.yml)

for workflow_file in "${workflow_files[@]}"; do
  name="$(basename "$workflow_file" .yml)"
  sha_file="$name/workflow-sha256"
  computed_sha="$(sha256sum "$workflow_file" | awk '{print $1}')"

  if [[ "$check" == true ]]; then
    if [[ ! -f "$sha_file" ]] || [[ "$(cat "$sha_file")" != "$computed_sha" ]]; then
      echo "outdated \`$sha_file\`" >&2
      outdated=true
    fi
  else
    mkdir -p "$name"
    echo "$computed_sha" > "$sha_file"
    echo "$sha_file: $computed_sha" >&2
  fi
done

if [[ "$check" == true ]] && [[ "$outdated" == true ]]; then
  echo "found outdated workflow sha256: execute \`compute-workflow-sha256.sh\` to refresh workflows sha256"
  exit 1
fi
