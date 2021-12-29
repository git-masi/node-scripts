local node_scripts_dir="$HOME/node-scripts/src/scripts"
if [[ "$1" == "--help" ]]; then
  (ls "$node_scripts_dir")
elif [[ -n "$1" ]]; then
  (node "$node_scripts_dir/$1.mjs" "path=$(pwd)" "${@:2}");
else
  echo "You must pass a script name as the first argument"
  echo "For a list of available scripts type run-ns --help"
fi