set -eu

read_input() {
  local message="$1"
  local input_name="$2"
  local input=""

  until [[ "$input" ]]; do
    print "$message: "
    read -r input
    [[ -z "$input" ]] && print_red "$input_name cannot be empty. Please enter a valid $input_name."
  done

  echo "$input"
}

get_action() {
  local action=""

  until [[ $action =~ ^[ar]$ ]]; do
    print "Do you want to add or remove a package from sparse-checkout? (${BROWN}a${RESET}dd/${BROWN}r${RESET}emove): "
    read -r action
    case $action in
    "a") echo "add" ;;
    "r") echo "remove" ;;
    *) print_red "Invalid action. Please enter ${BROWN}a${RESET} (add) or ${BROWN}r${RESET} (remove)." ;;
    esac
  done
}

sparse_checkout_action() {
  local action="$1" # get_action ensures this will always be 'add' or 'remove'
  local repo_dir="$2"
  local choice=""
  local direction=${action/add/to}
  direction=${direction/remove/from}

  cd "$repo_dir"
  maybe_init_sparse_checkout "$repo_dir"

  local package=""

  until [[ $choice =~ ^[eps]$ ]]; do
    printf "%s" "Which package would you like to $action $direction sparse-checkout? (${BROWN}e$RESET)ddsa/(${BROWN}p$RESET)oseidon/(${BROWN}s$RESET)emaphore: "
    read -r choice
    case $choice in
    "e") package="eddsa" ;;
    "p") package="poseidon" ;;
    "s") package="semaphore" ;;
    *) printf "%s %s\n" "${RED}Invalid input.$RESET" "Enter ${BROWN}e$RESET (eddsa), ${BROWN}p$RESET (poseidon) or ${BROWN}s$RESET (semaphore)." ;;
    esac
  done

  git sparse-checkout $action "packages/$package"
  print_brown "Packages/$package $action from sparse checkout."
}
