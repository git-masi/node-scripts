local node_scripts_dir="$HOME/node-scripts/src/scripts"
if [[ "$1" == "--help" ]]; then
  (ls "$node_scripts_dir")
elif [[ -n "$1" && -e "$node_scripts_dir/${1%.mjs}.mjs" ]]; then
  # Normalize file name by removing .mjs suffix if it exists
  # Then add the .mjs suffix to be sure it's there
  (node "$node_scripts_dir/${1%.mjs}.mjs" "path=$(pwd)" "${@:2}");
else
  echo "You must pass a script name as the first argument"
  echo "For a list of available scripts type runns --help"
fi