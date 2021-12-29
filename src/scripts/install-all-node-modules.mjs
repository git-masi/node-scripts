import { readdir } from 'fs/promises';
import { resolve } from 'path';
import { execAsync } from '../utils/exec.mjs';
import { getPathFromArgs } from '../utils/cli-args.mjs';

// To run the script you can execute the file with an optional CLI arg
//
// Pass an optional path to start
//    path=SOME_DIR_PATH
// Otherwise the path is the working directory
//
// Example:
// node install-all-node-modules.mjs path=/Users/some_user/Documents/test/

(async () => {
  try {
    const startingPath = getPathFromArgs();

    await installNodeModules(startingPath);

    async function installNodeModules(path) {
      const contents = await readdir(path, { withFileTypes: true });

      for (const entry of contents) {
        const { name: entryName } = entry;

        // Ignore node_modules folder
        if (entryName === 'node_modules' && entry.isDirectory()) continue;

        const entryPath = resolve(path, entryName);

        if (entryName === 'package.json') {
          console.info(`Installing packages found in ${path}`);

          const { stdout } = await execAsync('npm i', {
            cwd: path,
          });

          console.info(stdout);
        }

        if (entry.isDirectory()) {
          await installNodeModules(entryPath);
        }
      }
    }
  } catch (error) {
    console.info(error);
  }
})();
