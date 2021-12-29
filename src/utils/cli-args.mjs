import { cwd, argv } from 'process';

/**
 * Looks for a CLI arg with the following signature:
 *    path=SOME_DIR_PATH
 * Else returns working directory
 * @returns {string} a file/directory path
 */
export function getPathFromArgs() {
  const pathPrefix = 'path=';
  const args = argv.slice(2);
  const cliPath = args.find((arg) => arg?.startsWith?.(pathPrefix));

  console.log('cliPath', cliPath);

  if (cliPath) return cliPath.replace(pathPrefix, '');

  console.log('cwd', cwd());

  return cwd();
}
