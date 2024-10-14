import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { basename, join } from 'path';
import { getFilePath, isFileExists } from '../utils/index.js';

export const compressFile = (filePath, newDirectoryPath) => {
  const fileName = basename(filePath);

  return new Promise(async (resolve, reject) => {
    const sourcePath = getFilePath(filePath);
    const newFileDirectoryPath = getFilePath(newDirectoryPath);
    const targetPath = join(newFileDirectoryPath, `${ fileName }.br`);

    try {
      const fileExists = await isFileExists(sourcePath);
      const newFolderExists = await isFileExists(newFileDirectoryPath);
      const newFileExists = await isFileExists(targetPath);

      if (fileExists && newFolderExists && !newFileExists) {
        const readableStream = createReadStream(sourcePath);
        const writableStream = createWriteStream(targetPath)
        const compressedStream = createBrotliCompress();

        await readableStream.pipe(compressedStream).pipe(writableStream);

        console.log(`File has been compressed to ${ targetPath }`);
        resolve();
      } else {
        console.log(newFileExists
          ? `File with such name ${ targetPath } already exists, file can\'t be compressed`
          : !fileExists
            ? `There is no such file ${ sourcePath }`
            : `There is no such directory ${ newFileDirectoryPath }`
        );
        reject();
      }
    } catch {
      reject();
    }
  });
};
