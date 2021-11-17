import { readdir } from 'fs/promises';
import { cwd, argv } from 'process';
import { resolve } from 'path';
import util from 'util';
import { exec } from 'child_process';

(async () => {
  const execAsync = util.promisify(exec);

  try {
    const validCliOptions = { path: 'path=' };
    const args = argv.slice(2);
    const startingPath = getStartingPath();

    await installNodeModules(startingPath);

    function getStartingPath() {
      const { path: pathOption } = validCliOptions;
      const cliPath = args.find((arg) => arg.startsWith(pathOption));

      if (cliPath) return cliPath.replace(pathOption, '');

      return cwd();
    }

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
