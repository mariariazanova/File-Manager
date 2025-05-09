import { createReadStream } from 'fs';
import { getFilePath } from '../utils/index.js';

export const readFileContent = async (targetPath) => {
  const pathToFile = getFilePath(targetPath);
  const readableStream = createReadStream(pathToFile);

  return new Promise((resolve, reject) => {
    let content = '';

    readableStream.on('data', (chunk) => {
      content += chunk;
    });

    readableStream.on('end', () => {
      if (content.length === 0) {
        console.log('File is empty.');
      } else {
        console.log('Content:', content);
      }
      resolve();
    });

    readableStream.on('error', () => {
      reject();
    });
  });
};
