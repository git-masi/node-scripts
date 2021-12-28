import { mkdir, stat, writeFile } from 'fs/promises';
import { cwd } from 'process';

(async () => {
  const projectDir = cwd();
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

  if (!hasSettingsFile) await createSettingsFile();

  async function vscodeDirExists() {
    try {
      const dir = await stat(`${projectDir}/.vscode`);
      return dir.isDirectory();
    } catch (error) {
      return false;
    }
  }

  async function settingsFileExists() {
    try {
      const file = await stat(`${projectDir}/.vscode/settings.json`);
      return file.isFile();
    } catch (error) {
      return false;
    }
  }

  async function createVscodeDir() {
    await mkdir(`${projectDir}/.vscode`);
  }

  async function createSettingsFile() {
    await writeFile(
      `${projectDir}/.vscode/settings.json`,
      JSON.stringify(editorSettings)
    );
  }
})();
