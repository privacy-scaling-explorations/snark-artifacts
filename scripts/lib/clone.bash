clone_repository() {
  local repo_url
  local clone_dir

  repo_url=$(read_input "Enter the URL of the repository to clone" "URL")
  clone_dir=$(read_input "Enter the directory to clone into" "directory")

  print "Cloning repository..."
  git clone --filter=blob:none "$repo_url" "$clone_dir" --sparse
  print_brown "Repository cloned to $clone_dir"

  echo "$clone_dir"
}
