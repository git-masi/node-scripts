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

You may also wish to add this alias to make reloading your terminal easier

```
alias zshreload="source ~/.zshrc"
```

And make sure you have the [load-nvmrc script](https://github.com/nvm-sh/nvm#calling-nvm-use-automatically-in-a-directory-with-a-nvmrc-file)

## Why

Because life is too short to learn bash scripting!
