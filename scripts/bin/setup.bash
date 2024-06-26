#!/bin/bash
set -eou pipefail

fetch_lib() {
  local url="$1/$3"
  local dest="$2/$3"

  mkdir -p "$(dirname "$dest")"
  curl -sSL "$url" -o "$dest"
}

fetch_libs() {
  local libs_base_url="$1"
  local libs_dest_dir="$2"
  shift 2

  for lib in "$@"; do
    fetch_lib "$libs_base_url" "$libs_dest_dir" "$lib" &
  done
  wait
}

# shellcheck source=/dev/null
source_libs() {
  local libs_dir="$1"
  shift
  for lib in "$@"; do source "$libs_dir/$lib"; done
}

maybe_fetch_then_source_libs() {
  local libs_dir=""
  local fetch="$1"
  local libs_base_url="$2"
  shift 2

  if [[ $fetch = "fetch" ]]; then
    libs_dir=$(mktemp -d)
    fetch_libs "$libs_base_url" "$libs_dir" "$@"
  fi

  # we are in the repo, so we can source the libs from the repo
  source_libs "${libs_dir:-"$(dirname "${BASH_SOURCE[0]}")/../lib"}" "$@"
}

main() {
  local fetch="${1-""}"
  local branch=${2:-main}
  local libs_base_url="https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/$branch/scripts/lib"
  local libs=("clone.bash" "direction.bash" "find-repo.bash" "print.bash" "prompts.bash" "sparse-checkout.bash" "consts/colors.bash" "consts/remote-url.bash")

  maybe_fetch_then_source_libs "$fetch" "$libs_base_url" "${libs[@]}"

  local action
  local repo_dir
  repo_dir=$(find_repo)

  if [[ $repo_dir ]]; then
    print "Repository already cloned at $(brown "$repo_dir")"
  else
    repo_dir=$(clone_repository)
    cd "$repo_dir"
    maybe_init_sparse_checkout "$repo_dir"
  fi

  cd "$repo_dir"
  action=$(read_action)
  edit_sparse_checkout "$action" "$(read_package "$action")"
}

exec 3>/dev/tty
main "$@"
exec 3>&-
