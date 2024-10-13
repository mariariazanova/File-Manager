import { readdir } from 'fs/promises';
import { getCurrentDirectory, showCurrentDirectory } from '../utils/index.js';

export const getFolderContent = async () => {
  return new Promise(async(resolve, reject) => {
    try {
      const currentDirectory = getCurrentDirectory();

      const folderContent = await readdir(currentDirectory, { withFileTypes: true });

      const folders = folderContent.filter(file => file.isDirectory()).map(file => file.name).sort();
      const fileNames = folderContent.filter(file => file.isFile()).map(file => file.name).sort();

      folders.forEach(folder => console.log(`[DIR] ${ folder }`));
      fileNames.forEach(file => console.log(`[FILE] ${ file }`));

      if (!folders.length && !fileNames.length) {
        console.log('Directory is empty');
      }

      resolve();

    } catch {
      reject();
    }
  });
};
