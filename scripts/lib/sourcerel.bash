sourcerel() {
  local relative_path="$1"
  echo "trying to sourcerel $1"
  local caller_dir
  local full_path

  caller_dir="$(dirname "${BASH_SOURCE[1]}")"
  full_path="$(realpath "$caller_dir/$relative_path")"

  # shellcheck source=/dev/null
  [[ -e $full_path ]] && {
    source "$full_path"
    return
  }

  printf "Error: file not found: %s\n" "$full_path" >&2
  return 1

}

export -f sourcerel
