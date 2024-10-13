import { join, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { isFileExists, getFilePath } from '../utils/index.js';

export const copyFile = async (filePath, newDirectoryPath) => {
  const fileName = basename(filePath);

  return new Promise(async (resolve, reject) => {
    let sourcePath;
    let newFileDirectoryPath;
    let targetPath;

    sourcePath = getFilePath(filePath);
        // isAbsolute(filePath) ? filePath : join(currentDirectory, filePath);
    newFileDirectoryPath = getFilePath(newDirectoryPath);
        // isAbsolute(newDirectoryPath) ? newDirectoryPath : join(currentDirectory, newDirectoryPath);
    targetPath = join(newFileDirectoryPath, fileName);

    try {
      const fileExists = await isFileExists(sourcePath);
      const newFolderExists = await isFileExists(newFileDirectoryPath);

      if (fileExists && newFolderExists) {
        if (sourcePath === targetPath) {
          console.log('File target path is the same as source, file can\'t be copied');
          reject();
        } else {
          const fileExistsInTarget = await isFileExists(targetPath);

          if (fileExistsInTarget) {
            console.log(`File with such name already exists in target folder ${ newFileDirectoryPath }, file can\'t be copied`)
            reject();
          } else {
            const readableStream = createReadStream(sourcePath);
            const writableStream = createWriteStream(targetPath);

            await pipeline(readableStream, writableStream);

            console.log(`File has been copied to ${ newFileDirectoryPath }`);
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
