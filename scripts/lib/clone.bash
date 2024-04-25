clone_repository() {
  local clone_dir

  clone_dir=$(read_input "Enter the directory to clone into" "directory")

  print "Cloning repository..."
  git clone --filter=blob:none "$REMOTE_GIT_URL" "$clone_dir" --sparse
  print "Repository cloned into $(brown "$clone_dir")"

  echo "$clone_dir"
}
