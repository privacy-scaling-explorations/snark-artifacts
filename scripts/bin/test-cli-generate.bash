#!/usr/bin/env bash

set -e

main() {
  original_dir=$(pwd)
  zk_kit_repo=$(mktemp -d -t zk_kit-XXX)
  circuit="poseidon-proof"
  vkey_file="groth16_vkey.json"
  dest_dir=$(mktemp -d -t snark-artifacts-poseidon-proof-XXX)

  # setup
  git clone https://github.com/privacy-scaling-explorations/zk-kit.circom.git "$zk_kit_repo"
  cd "$zk_kit_repo"
  yarn
  cd "$original_dir"
  pnpm i

  # generate vkey in zk-kit.circom repo with circomkit
  cd "$zk_kit_repo/packages/$circuit"
  yarn run circomkit setup "$circuit"

  # generate vkey in snark-artifacts repo with cli
  cd "$original_dir/packages/artifacts"
  pnpm start.cli generate -c "$zk_kit_repo/packages/$circuit/circomkit.json" -d "$dest_dir" "$circuit"

  # matching?
  diff "$zk_kit_repo/packages/$circuit/build/$circuit/$vkey_file" "$dest_dir/$circuit/$vkey_file"
}

main
