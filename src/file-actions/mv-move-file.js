import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { basename, join } from 'path';
import { pipeline } from 'stream/promises';
import { getFilePath, isFileExists } from '../utils/index.js';

export const moveFile = async (filePath, newDirectoryPath) => {
  const fileName = basename(filePath);

  return new Promise(async(resolve, reject) => {
    const sourcePath = getFilePath(filePath);
    const newFileDirectoryPath = getFilePath(newDirectoryPath);
    const targetPath = join(newFileDirectoryPath, fileName);

    try {
      const fileExists = await isFileExists(sourcePath);
      const newFolderExists = await isFileExists(newFileDirectoryPath);

      if (fileExists && newFolderExists) {
        if (sourcePath === targetPath) {
          console.log('File target path is the same as source, file can\'t be moved');
          reject();
        } else {
          const fileExistsInTarget = await isFileExists(targetPath);

          if (fileExistsInTarget) {
            console.log(`File with such name already exists in target folder ${ newFileDirectoryPath }, file can\'t be moved`)
            reject();
          } else {
            const readableStream = createReadStream(sourcePath);
            const writableStream = createWriteStream(targetPath);

            await pipeline(readableStream, writableStream);
            await unlink(sourcePath);

            console.log(`File has been moved to ${ targetPath }`);
            resolve();
          }
        }
      } else {
        console.log(!fileExists ? `There is no such file ${ sourcePath }` : `There is no such directory ${ newFileDirectoryPath }`);
        reject();
      }
    } catch {
      reject();
    }
  });
};
