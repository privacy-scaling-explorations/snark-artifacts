#!/bin/bash

set -euo pipefail

move_tag() {
  local package="$1"
  local commit_sha="$2"
  local tag="$package@latest"

  git push -d origin "$tag"
  git tag "$tag" "$commit_sha"
  git push origin "$tag"
}

get_package_names() {
  echo "$1" | jq -r '.[].name'
}

main() {
  local published_packages="$1"
  local commit_sha="$2"

  while IFS= read -r package; do
    move_tag "$package" "$commit_sha"
  done < <(get_package_names "$published_packages")
}

main "$@"
