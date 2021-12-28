import { execSync } from 'child_process';
import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import { cwd } from 'process';

(async () => {
  const projectDirPath = cwd();
  const vscodeDirPath = `${projectDirPath}/.vscode`;
  const settingsFilePath = `${vscodeDirPath}/settings.json`;
  const editorSettings = {
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
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
  };
  const hasVscodeDir = await vscodeDirExists();
  const hasSettingsFile = await settingsFileExists();

  if (!hasVscodeDir) await createVscodeDir();

  // return early if we create the file with the data
  if (!hasSettingsFile)
    return await writeSettingsFile(JSON.stringify(editorSettings));

  const currentSettings = JSON.parse(await readSettingsfile());

  Object.keys(editorSettings).forEach(
    (key) => (currentSettings[key] = editorSettings[key])
  );

  await writeSettingsFile(JSON.stringify(currentSettings));

  execSync('npx prettier --write "./.vscode/settings.json"');

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
})();
