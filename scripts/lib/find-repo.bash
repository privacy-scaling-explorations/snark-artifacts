find_repo() {
  local repo_dir
  repo_dir=$(find "$HOME" -type f -name "config" -exec grep -q "$REMOTE_GIT_URL" {} \; -print -quit 2>/dev/null)
  [[ $repo_dir ]] && dirname "$(dirname "$repo_dir")"
}
