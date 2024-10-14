import { sep } from 'path';
import { setCurrentDirectory, getCurrentDirectory } from '../utils/index.js';

export const goUp = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentDir = getCurrentDirectory();
      const pathArr = currentDir.split(sep);

      if (pathArr.length > 1) {
        pathArr.pop();
      }

      const newDirectory = pathArr.join(sep);

      setCurrentDirectory(newDirectory);
      resolve();
    } catch {
      reject();
    }
  });
};
