import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import { getPathFromArgs } from '../utils/cli-args.mjs';
import { execAsync } from '../utils/exec.mjs';

// Pass in the project directory via CLI arg path=SOME_DIR_PATH
(async () => {
  try {
    const projectDirPath = getPathFromArgs();
    const vscodeDirPath = `${projectDirPath}/.vscode`;
    const settingsFilePath = `${vscodeDirPath}/settings.json`;
    const editorSettings = {
      "editor.formatOnSave": true,
      'editor.defaultFormatter': 'esbenp.prettier-vscode',
      'go.testOnSave': true,
      'go.lintOnSave': 'package',
      '[javascript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.tabSize': 2,
      },
      '[typescript]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.tabSize': 2,
      },
      '[json]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.tabSize': 2,
      },
      '[jsonc]': {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.tabSize': 2,
      },
      '[go]': {
        'editor.defaultFormatter': 'golang.go',
        'editor.insertSpaces': false,
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.organizeImports': true,
        },
        'editor.suggest.snippetsPreventQuickSuggestions': false,
      },
      '[sql]': {
        'editor.defaultFormatter': 'mtxr.sqltools',
      },
      "thunder-client.saveToWorkspace": true
    };
    const hasVscodeDir = await vscodeDirExists();
    const hasSettingsFile = await settingsFileExists();

    if (!hasVscodeDir) await createVscodeDir();

    // return early if we create the file with the data
    if (!hasSettingsFile) {
      await writeSettingsFile(JSON.stringify(editorSettings));
      await execAsync('npx prettier --write "./.vscode/settings.json"', {
        cwd: projectDirPath,
      });
      return;
    }

    const currentSettings = JSON.parse(await readSettingsfile());

    for (const key of Object.keys(editorSettings)) {
      currentSettings[key] = editorSettings[key];
    }

    await writeSettingsFile(JSON.stringify(currentSettings));

    await execAsync('npx prettier --write "./.vscode/settings.json"');

    async function vscodeDirExists() {
      try {
        const dir = await stat(vscodeDirPath);
        return dir.isDirectory();
      } catch (error) {
        return false;
      }
    }

    async function settingsFileExists() {
      try {
        const file = await stat(settingsFilePath);
        return file.isFile();
      } catch (error) {
        return false;
      }
    }

    async function createVscodeDir() {
      await mkdir(vscodeDirPath);
    }

    async function writeSettingsFile(data) {
      await writeFile(settingsFilePath, data);
    }

    async function readSettingsfile() {
      return readFile(settingsFilePath, { encoding: 'utf8' });
    }
  } catch (error) {
    console.log(error);
  }
})();
