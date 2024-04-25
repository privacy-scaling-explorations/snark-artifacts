clone_repository() {
  local clone_dir
  clone_dir=$(read_input "Enter the directory to clone into" "directory")

  git clone --filter=blob:none "$REMOTE_GIT_URL" "$clone_dir" --sparse

  echo "$clone_dir"
}
