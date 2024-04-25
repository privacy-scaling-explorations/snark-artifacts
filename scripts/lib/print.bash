print() { printf "%s\n" "$1" >&3; }

print_color() {
  local color="$1"
  local message="$2"
  printf "%s%s%s\n" "$color" "$message" "$RESET" >&3
}

print_brown() { print_color "$BROWN" "$1"; }
print_red() { print_color "$RED" "$1"; }
