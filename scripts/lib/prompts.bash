set -eu

read_input() {
  local message="$1"
  local input_name="$2"
  local input=""

  until [[ "$input" ]]; do
    print "$message: "
    read -r input
    [[ -z "$input" ]] && print_error "$input_name cannot be empty. Please enter a valid $input_name."
  done

  echo "$input"
}

get_action() {
  local action=""

  until [[ $action =~ ^[ar]$ ]]; do
    print_no_newline "Do you want to add or remove a package from/to sparse-checkout? ($(brown a))dd/($(brown r))emove: "
    read -r action
    case $action in
    "a") echo "add" ;;
    "r") echo "remove" ;;
    *)
      print_error "Invalid action."
      print "Please enter $(brown a) (add) or $(brown r) (remove)."
      ;;
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
    print_no_newline "Which package would you like to $action $direction sparse-checkout? ($(brown e))ddsa/($(brown p))oseidon/($(brown s))emaphore: "
    read -r choice
    case $choice in
    "e") package="eddsa" ;;
    "p") package="poseidon" ;;
    "s") package="semaphore" ;;
    *)
      print-error "Invalid input."
      print "Enter $(brown e) (eddsa), $(brown p) (poseidon) or $(brown s) (semaphore).\n"
      ;;
    esac
  done

  git sparse-checkout "$action" "packages/$package"
  print "Packages/$(brown $package) $action from sparse checkout."
}
