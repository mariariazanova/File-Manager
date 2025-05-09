import { isAbsolute, join } from 'path';
import { stat } from 'fs/promises';
import { getCurrentDirectory } from './directory-state.js';

export const argumentPrefix = '--';

export const isFileExists = async (url) => {
  try {
    await stat(url);

    return true;
  } catch {
    return false;
  }
};

export const getFilePath = (targetPath) => {
  return isAbsolute(targetPath) ? targetPath : join(getCurrentDirectory(), targetPath);
};
