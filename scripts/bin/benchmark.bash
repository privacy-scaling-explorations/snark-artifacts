#!/bin/bash

dl() {
  local cdn="$1"
  local artifact="$2"
  local url="$cdn/$artifact"
  curl -s -L -o /dev/null "$url"
}

dl_all() {
  local cdn="$1"

  start=$(date +%s)
  for artifact in poseidon-{1..16}.{wasm,zkey}; do
    dl "$cdn" "$artifact" # download deliberately sequentially to avoid throttling happening with public CDNs
  done
  end=$(date +%s)
  cdn=${cdn/*github.com*/github}
  cdn=${cdn/*unpkg.com*/unpkg}
  cdn=${cdn/*jsdelivr.net*/jsdelivr}
  cdn=${cdn/*snark-artifacts.pse.dev*/pse}
  echo "$cdn,$((end - start))"
}

average() {
  local log="$1"
  awk -F',' '
/unpkg/ { unpkg_sum += $2; unpkg_count += 1 }
/jsdelivr/ { jsdelivr_sum += $2; jsdelivr_count += 1 }
/github/ { github_sum += $2; github_count += 1 }
/pse/ { pse_sum += $2; pse_count += 1 }
END {
  print "download time average (s)"
  print "  unpkg   ", unpkg_sum/unpkg_count
  print "  jsdelivr", jsdelivr_sum/jsdelivr_count
  print "  github  ", github_sum/github_count
  print "  pse     ", pse_sum/pse_count
}
' "$log"
}

main() {
  local log
  log=$(mktemp)

  # using arbitrarily poseidon artifacts for benchmarking
  for cdn in \
    "https://snark-artifacts.pse.dev/poseidon/latest" \
    "https://cdn.jsdelivr.net/npm/@zk-kit/poseidon-artifacts@latest" \
    "https://unpkg.com/@zk-kit/poseidon-artifacts@latest" \
    "https://github.com/privacy-scaling-explorations/snark-artifacts/raw/@zk-kit/poseidon-artifacts@latest/packages/poseidon"; do
    for _ in {1..10}; do              # compute average over 10 runs
      dl_all "$cdn" | tee -a "$log" & # execute all runs in parallel
    done
  done

  wait
  echo "done, results are in $log"
  average "$log"
}

main
