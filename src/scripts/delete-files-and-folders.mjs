// rm requires node v14.14.0 or higher
import { readdir, rm } from 'fs/promises';
import { argv } from 'process';
import { resolve, extname } from 'path';
import { getPathFromArgs } from '../utils/cli-args.mjs';

// To run the script you will need to execute the file with some CLI args
//
// Pass an optional path to start
//    path=SOME_DIR_PATH
// Otherwise the path is the working directory
//
// Specificy explicit dir names by using a backslash
//    some_dir/
//
// Specify explicit file names
//    some_file.js
//
// Remove all matching dirs and files with a generic name
//    some_generic_name
//
// Example:
// node delete-node-modules.mjs path=/Users/some_user/Documents/test/ node_modules/ index.js delete_me

(async () => {
  try {
    const args = argv.slice(2);
    const startingPath = getPathFromArgs();
    const removeList = args.filter((arg) => !arg?.startsWith?.('path='));

    await removeListedFileSystemEntries(startingPath);

    async function removeListedFileSystemEntries(path) {
      const contents = await readdir(path, { withFileTypes: true });

      for (const entry of contents) {
        const { name: entryName } = entry;
        const entryPath = resolve(path, entryName);
        const shouldRemoveEntry = removeList.reduce(reduceRemoveList, false);

        if (shouldRemoveEntry) {
          await removeEntry();
        } else if (entry.isDirectory()) {
          await removeListedFileSystemEntries(entryPath);
        }

        function reduceRemoveList(removed, listItem) {
          // If user passes an explicit dir name then no file should match
          //    "test/" !== "test.js"
          //
          // If user passes an explicit file name then other files should not match
          //    "test.html" !== "test.js"
          //
          // If the user passes in a generic name we must prove it is generic then match

          const isExplicitDir =
            entry.isDirectory() && listItem === `${entryName}/`;
          const isExplicitFile = entry.isFile() && listItem === entryName;
          const isEitherDirOrFile =
            !isExplicitDir &&
            !isExplicitFile &&
            listItem ===
              (entry.isFile()
                ? entryName.replace(extname(entryPath), '')
                : entryName);

          if (isExplicitDir || isExplicitFile || isEitherDirOrFile) {
            return true;
          }

          return removed;
        }

        async function removeEntry() {
          console.info(`removing: ${entryPath}`);

          if (entry.isDirectory()) {
            await rm(entryPath, { recursive: true });
          } else if (entry.isFile()) {
            await rm(entryPath);
          }
        }
      }
    }
  } catch (error) {
    console.info(error);
  }
})();
