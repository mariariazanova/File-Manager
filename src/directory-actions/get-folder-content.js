import { readdir } from 'fs/promises';
import { getCurrentDirectory } from '../utils/index.js';

export const getFolderContent = async () => {
  return new Promise(async(resolve, reject) => {
    try {
      const currentDirectory = getCurrentDirectory();

      const folderContent = await readdir(currentDirectory, { withFileTypes: true });

      const folders = [];
      const files = [];

      folderContent.forEach(file => {
        if (file.isDirectory()) {
          folders.push(file.name);
        }
        else if (file.isFile()) {
          files.push(file.name);
        }
      });

      folders.sort();
      files.sort();

      folders.forEach(folder => console.log(`[DIR] ${ folder }`));
      files.forEach(file => console.log(`[FILE] ${ file }`));

      if (!folders.length && !files.length) {
        console.log('Directory is empty');
      }

      resolve();
    } catch {
      reject();
    }
  });
};
