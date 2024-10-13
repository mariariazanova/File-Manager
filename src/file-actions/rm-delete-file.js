import { unlink } from 'fs/promises';
import { isFileExists } from '../utils/index.js';
import { getFilePath } from '../utils/fs-utils.js';

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
