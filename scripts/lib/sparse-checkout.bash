maybe_init_sparse_checkout() {
  git config --local --get core.sparseCheckoutCone >/dev/null &&
    git config --local --get core.sparseCheckout >/dev/null &&
    return

  git config --local core.sparseCheckout true
  git config --local core.sparseCheckoutCone true
  git sparse-checkout add scripts
}
