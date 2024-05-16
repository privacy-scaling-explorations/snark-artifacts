set -eu

read_input() {
  local message="$1"
  local input_name="$2"
  local input=""

  until [[ "$input" ]]; do
    print_no_newline "$message: "
    read -r input
    # manually expand ~ and literal $HOME to the actual home directory
    input="${input/#~/$HOME}"
    input="${input//\$HOME/$HOME}"

    [[ -z "$input" ]] && print_error "$input_name cannot be empty. Please enter a valid $input_name."
  done

  echo "$input"
}

read_action() {
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

read_package() {
  local action="$1"
  local package=""

  until [[ $package =~ ^[eps]$ ]]; do
    print_no_newline "Which package would you like to $action $(direction "$action") sparse-checkout? (($(brown p))oseidon/($(brown s))emaphore/semaphore-identity($(brown si))): "
    read -r package
    case $package in
    "p") echo "poseidon" ;;
    "s") echo "semaphore" ;;
    "si") echo "semaphore-identity" ;;
    *)
      print_error "Invalid package."
      print "Please enter $(brown e) (eddsa), $(brown p) (poseidon) or $(brown s) (semaphore)."
      ;;
    esac
  done
}
