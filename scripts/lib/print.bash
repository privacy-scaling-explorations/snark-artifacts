color() {
  local color="$1"
  local message="$2"
  printf "%s" "$color$message$RESET"
}
brown() { color "$BROWN" "$1"; }
red() { color "$RED" "$1"; }

print() { printf "%s\n" "$1" >&3; }
print_no_newline() { printf "%s" "$1" >&3; }
print_color() { color "$1" "$2" >&3; }
print_brown() { brown "$1" >&3; }
print_red() { red "$1" >&3; }
print_error() { print "$RED$1$RESET" >&3; }
