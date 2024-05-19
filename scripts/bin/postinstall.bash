#!/bin/bash

source "$(dirname "${BASH_SOURCE[0]}")/../lib/consts/colors.bash"
source "$(dirname "${BASH_SOURCE[0]}")/../lib/print.bash"

set -euo pipefail

download() {
  local platform="$1"
  local arch="$2"
  local download_url="https://github.com/mvdan/sh/releases/download/v3.8.0/shfmt_v3.8.0_${platform}_$arch"
  local script_dest="node_modules/.bin/shfmt"

  curl -sSL "$download_url" -o "$script_dest"
  chmod +x "$script_dest"
}

is_already_installed() {
  if command -v shfmt >/dev/null 2>&1; then
    printf "%s %s %s\n" "Skipped" "${BROWN}shfmt$RESET" "download (already installed on system)"
    exit
  fi
}

check_install() {
  if pnpm exec shfmt --version &>/dev/null; then
    printf "%s %s\n" "${BROWN}shfmt$RESET" "installed successfully"
  else
    printf "%s\n" "${RED}Installation of shfmt failed$RESET"
    printf "%s %s\n" "Check" "${BROWN}https://github.com/patrickvane/shfmt?tab=readme-ov-file#usage$RESET"
    printf "%s\n" "and install it yourself if you want to be able to format shell scripts."
  fi
}

main() {
  is_already_installed

  printf "%s %s\n" "Installing" "${BROWN}shfmt$RESET"

  local platform
  local arch

  platform=$(uname -s | tr '[:upper:]' '[:lower:]')
  arch=$(uname -m)
  if [ "$arch" = "x86_64" ]; then
    arch="amd64"
  fi

  download "$platform" "$arch"
  check_install
}

main
