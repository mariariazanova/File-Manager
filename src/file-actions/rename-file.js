import { rename } from 'fs/promises';
import { join,dirname, extname } from 'path';
import { isFileExists, getFilePath } from '../utils/index.js';

export const renameFile = (filePath, newFileName) => {
  return new Promise(async(resolve, reject) => {
    const pathToFile = getFilePath(filePath);
    const directory = dirname(pathToFile);
    const originalExtension = extname(filePath);

    // Check if the newFileName has an extension, if not, add the original one
    if (!extname(newFileName)) {
      newFileName += originalExtension;
    }

    const newPath = join(directory, newFileName);

    try {
      const fileExists = await isFileExists(pathToFile);

      if (fileExists) {
        await rename(pathToFile, newPath);

        if (pathToFile === newPath) {
          console.log(`File already has name ${ newFileName } and can't be renamed`);
          reject();
        } else {
          console.log(`File has been renamed to ${ newFileName }`);
          resolve();
        }
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};
