import path from 'path';
import { access } from 'fs/promises';
import { getCurrentDirectory, setCurrentDirectory } from '../utils/index.js';

export const changeDirectory = async (targetPath) => {
  return new Promise(async (resolve, reject) => {
    const pathToDirectory = targetPath ? getPath(targetPath) : undefined;

    try {
      await access(pathToDirectory);

      setCurrentDirectory(pathToDirectory);
      resolve();
    } catch {
      reject();
    }
  });
};

const getPath = (targetPath) => {
  // Regular expression to detect drive letter paths on Windows
  const driveLetterPathRegExp = /^[a-zA-Z]:$/;

  // Check if the path is an absolute path, including drive letter paths on Windows
  if (path.isAbsolute(targetPath) || driveLetterPathRegExp.test(targetPath)) {
    // If the path is just a drive letter like "D:", use it as the root of the drive
    if (driveLetterPathRegExp.test(targetPath)) {
      console.log(path.sep);
      return path.resolve(targetPath + path.sep); // Append a separator to make it absolute
    } else {
      return path.resolve(targetPath);
    }
  } else {
    // Resolve relative paths based on the current directory
    return path.resolve(getCurrentDirectory(), targetPath);
  }
};

