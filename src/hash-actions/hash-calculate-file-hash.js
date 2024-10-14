import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { isFileExists, getFilePath } from '../utils/index.js';

export const calculateFileHash = (filePath) => {
  const absoluteFilePath = getFilePath(filePath);

  return new Promise(async (resolve, reject) => {
    try {
      const fileExists = await isFileExists(absoluteFilePath);

      if (fileExists) {
        const hash = createHash('sha256');
        const readableStream = createReadStream(absoluteFilePath);

        readableStream.pipe(hash);

        hash.on('finish', () => {
          const fileHash = hash.digest('hex');

          console.log(`Hash of the file (${ absoluteFilePath }) is ${ fileHash }`);
          resolve();
        });
      } else {
        console.log(`There is no such file ${ absoluteFilePath }`);
        reject();
      }
    } catch {
      reject();
    }
  });
};
