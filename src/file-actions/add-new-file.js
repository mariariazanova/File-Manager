import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getCurrentDirectory, isFileExists } from '../utils/index.js';

export const addNewFile = (fileName) => {
  const currentDirectory = getCurrentDirectory();
  const filePath = join(currentDirectory, fileName);

  return new Promise(async(resolve, reject) => {
    try {
      const fileExists = await isFileExists(filePath);

      if (!fileExists) {
        await writeFile(filePath, '');

        console.log(`File ${fileName} has been created`);
        resolve();
      } else {
        reject();
      }
    } catch {
      reject();
    }
  });
};
