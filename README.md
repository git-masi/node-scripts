# Global Node Scripts

## Warning

These scripts assume you are using MacOS with zshell

## Getting started

Be sure this project is located in your root directory. Otherwise you will need to change this line in run-node-scripts.sh to point to the parent directory:

```
local node_scripts_dir="$HOME/node-scripts/src/scripts"
```

Add this alias to your ~/.zshrc file:

```
alias runns="zsh \"$HOME/node-scripts/run-node-scripts.sh\""
```

Run your script anywhere using `runns SCRIPT_NAME_HERE`

For help use `runns --help`

## Why

Because life is too short to learn bash scripting!
