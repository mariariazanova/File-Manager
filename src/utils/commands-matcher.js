import { showCurrentDirectory } from './show-current-directory.js';
import { exitFileManager } from './exit-file-manager.js';
import { defaultInputErrorMessage } from '../constants/messages.js';
import { commands } from '../constants/commands.js';
import { goUp } from '../navigation-actions/go-up.js';
import { changeDirectory } from '../navigation-actions/change-directory.js';
import { getFolderContent } from '../directory-actions/get-folder-content.js';
import { readFileContent } from '../file-actions/read-file-content.js';
import { addNewFile } from '../file-actions/add-new-file.js';
import { renameFile } from '../file-actions/rename-file.js';
import { copyFile } from '../file-actions/cp-copy-file.js';
import { moveFile } from '../file-actions/mv-move-file.js';
import { deleteFile } from '../file-actions/rm-delete-file.js';
import { getOSInfo } from '../os-info-actions/os-get-os-info.js';
import { calculateFileHash } from '../hash-actions/hash-calculate-file-hash.js';
import { compressFile } from '../compress-actions/compress-file.js';
import { decompressFile } from '../compress-actions/decompress-file.js';

export const commandsMatcher = async (input) => {
  const [command, ...args] = input.trim().split(' ');

  const commandsSet = {
    [commands.UP]: () => goUp(),
    [commands.CD]: (dir) => changeDirectory(dir),
    [commands.LS]: () => getFolderContent(),
    [commands.CAT]: (filePath) => readFileContent(filePath),
    [commands.ADD]: (fileName) => addNewFile(fileName),
    [commands.RN]: (oldName, newName) => renameFile(oldName, newName),
    [commands.CP]: (src, dest) => copyFile(src, dest),
    [commands.MV]: (src, dest) => moveFile(src, dest),
    [commands.RM]: (filePath) => deleteFile(filePath),
    [commands.OS]: (infoType) => getOSInfo(infoType),
    [commands.HASH]: (filePath) => calculateFileHash(filePath),
    [commands.COMPRESS]: (src, dest) => compressFile(src, dest),
    [commands.DECOMPRESS]: (src, dest) => decompressFile(src, dest),
    [commands.EXIT]: () => exitFileManager(),
    [commands.SIGINT]: () => exitFileManager(),
  };

  const commandFn = commandsSet[command];

  if (commandFn) {
    const expectedArgs = commandFn.length;

    if (args.length < expectedArgs) {
      console.log(defaultInputErrorMessage);
    } else {
      await commandFn(...args);

      showCurrentDirectory();
    }
  } else {
    console.log(defaultInputErrorMessage);
  }
};
