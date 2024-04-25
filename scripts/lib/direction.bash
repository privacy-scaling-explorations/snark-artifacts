direction() {
  local action="$1"
  local direction=${action/add/to}
  direction=${direction/remove/from}
  echo "$direction"
}
