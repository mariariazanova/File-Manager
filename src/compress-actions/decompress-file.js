import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { basename, join, parse } from 'path';
import { getFilePath, isFileExists } from '../utils/index.js';

export const decompressFile = (filePath, newDirectoryPath) => {
  const fileName = basename(filePath);
  const { name, ext } = parse(fileName);

  return new Promise(async (resolve, reject) => {
    let sourcePath;
    let newFileDirectoryPath;
    let targetPath;

    sourcePath = getFilePath(filePath);
    newFileDirectoryPath = getFilePath(newDirectoryPath);
    targetPath = join(newFileDirectoryPath, name);

    try {
      const fileExists = await isFileExists(sourcePath);
      const newFolderExists = await isFileExists(newFileDirectoryPath);
      const newFileExists = await isFileExists(targetPath);

      if (fileExists && newFolderExists && !newFileExists) {
        if (ext !== '.br') {
          console.log('File has got invalid file extension, file can\'t be decompressed');
          reject();
        } else {
          const readableStream = createReadStream(sourcePath);
          const writableStream = createWriteStream(targetPath)
          const brotliDecompress = createBrotliDecompress();

          await readableStream.pipe(brotliDecompress).pipe(writableStream);

          console.log(`File has been decompressed to ${ targetPath }`);
          resolve();
        }
      } else {
        console.log(newFileExists
            ? `File with such name ${ targetPath } already exists, file can\'t be decompressed`
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
