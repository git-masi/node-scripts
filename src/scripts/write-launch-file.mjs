import { writeFile } from 'fs/promises';
import { getPathFromArgs } from '../utils/cli-args.mjs';
import { execAsync } from '../utils/exec.mjs';

(async () => {
  try {
    const projectDirPath = getPathFromArgs();
    const vscodeDirPath = `${projectDirPath}/.vscode`;
    const launchFilePath = `${vscodeDirPath}/launch.json`;
    const launchSettings = {
      configurations: [
        {
          name: 'Launch current go file',
          type: 'go',
          request: 'launch',
          mode: 'debug',
          program: '${file}',
        },
        {
          name: 'Launch main server file',
          type: 'go',
          request: 'launch',
          mode: 'debug',
          program: '${workspaceFolder}/cmd/web/main.go',
          cwd: '${workspaceFolder}/',
        },
      ],
    };

    await writeFile(launchFilePath, JSON.stringify(launchSettings));

    await execAsync('npx prettier --write "./.vscode/launch.json"', {
      cwd: projectDirPath,
    });
  } catch (error) {
    console.log(error);
  }
})();
