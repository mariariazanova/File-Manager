import { fileURLToPath } from 'url';
import { dirname, isAbsolute, join } from 'path';
import { stat } from 'fs/promises';
import { getCurrentDirectory } from './directory-state.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const argumentPrefix = '--';

export const getPath = (url, fileName) => {
    const __filename = fileURLToPath(url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, fileName);


    return filePath;
};

export const isFileExists = async (url) => {
  try {
    await stat(url);

    return true;
  } catch {
    return false;
  }
};

export const getFilePath = (targetPath) => {
  let pathToFile;

  if (isAbsolute(targetPath)) {
    pathToFile = targetPath;
  } else {
    pathToFile = join(getCurrentDirectory(), targetPath);
  }

  return pathToFile;
};
