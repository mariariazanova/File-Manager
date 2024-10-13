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

export const commandsMatcher = async (input) => {
  const [command, ...args] = input.trim().split(' ');

  const commandsSet = {
    [commands.UP]: () => goUp(),
    [commands.CD]: () => changeDirectory(args[0]),
    [commands.LS]: () => getFolderContent(),
    [commands.CAT]: () => readFileContent(args[0]),
    [commands.ADD]: () => addNewFile(args[0]),
    [commands.RN]: () => renameFile(args[0], args[1]),
    [commands.CP]: () => copyFile(args[0], args[1]),
    [commands.MV]: () => moveFile(args[0], args[1]),
    [commands.RM]: () => deleteFile(args[0]),
    [commands.OS]: () => getOSInfo(args[0]),
    [commands.HASH]: () => calculateFileHash(args[0]),
    [commands.EXIT]: () => exitFileManager(),
    [commands.SIGINT]: () => exitFileManager(),
  }

  if (commandsSet[command]) {
    await commandsSet[command]();

    showCurrentDirectory();
  } else {
    console.log(defaultInputErrorMessage);
  }
};
