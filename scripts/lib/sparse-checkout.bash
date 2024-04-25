maybe_init_sparse_checkout() {
  git config --local --get core.sparseCheckoutCone >/dev/null &&
    git config --local --get core.sparseCheckout >/dev/null &&
    return

  git config --local core.sparseCheckout true
  git config --local core.sparseCheckoutCone true
  git sparse-checkout add scripts
}

edit_sparse_checkout() {
  local action="$1"
  local package="$2"

  maybe_init_sparse_checkout
  case "$action" in
  add) add_to_sparse_checkout "$package" ;;
  remove) remove_from_sparce_checkout "$package" ;;
  esac

  print "packages/$(brown "$package") ${action}ed $(direction "$action") sparse checkout."
}

add_to_sparse_checkout() { git sparse-checkout add "packages/$1"; }

remove_from_sparce_checkout() {
  sed -i "/packages\/$package/d" ".git/info/sparse-checkout"
  git sparse-checkout reapply
}
