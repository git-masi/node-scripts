import { getPathFromArgs } from '../utils/cli-args.mjs';
import { execAsync } from '../utils/exec.mjs';

(async () => {
  // todo: allow user to pass in a version of node
  await execAsync('echo "lts/gallium" > .nvmrc', { cwd: getPathFromArgs() });
})();
