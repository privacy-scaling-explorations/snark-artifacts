maybe_init_sparse_checkout() {
  git config --local --get core.sparseCheckoutCone >/dev/null &&
    git config --local --get core.sparseCheckout >/dev/null &&
    return

  git config core.sparseCheckout true
  git config core.sparseCheckoutCone true
  git config alias.pull-rebase-filtered '!git fetch --filter=blob:none "$@" && git rebase FETCH_HEAD'
  git sparse-checkout add apps scripts .changeset
}

edit_sparse_checkout() {
  local action="$1"
  local package="$2"

  maybe_init_sparse_checkout

  case "$action" in
  add) add_to_sparse_checkout "$package" ;;
  remove) remove_from_sparse_checkout "$package" ;;
  esac

  verb="${action}ed"
  verb="${verb/%eed/ed}"
  print "packages/$(brown "$package") $verb $(direction "$action") sparse checkout."
}

add_to_sparse_checkout() {
  git sparse-checkout add "packages/$1"
  git checkout HEAD "packages/$1"
}

remove_from_sparse_checkout() {
  sed -i "/packages\/$package/d" ".git/info/sparse-checkout"
  git sparse-checkout reapply
}
