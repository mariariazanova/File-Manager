import { unlink } from 'fs/promises';
import { isFileExists, getFilePath } from '../utils/index.js';

export const deleteFile = async (filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const absoluteFilePath = getFilePath(filePath);

      const fileExists = await isFileExists(absoluteFilePath);

      if (fileExists) {
        await unlink(absoluteFilePath);

        console.log(`File ${ absoluteFilePath } has been deleted`);
        resolve();
      } else {
        console.log(`There is no such file ${ absoluteFilePath }`);
        reject();
      }
    } catch {
      reject();
    }
  });
};
