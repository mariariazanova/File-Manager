import { showCurrentDirectory } from './show-current-directory.js';
import { exitFileManager } from './exit-file-manager.js';
import { defaultInputErrorMessage } from '../constants/messages.js';
import { commands } from '../constants/commands.js';
import { goUp } from '../navigation-actions/go-up.js';
import { changeDirectory } from '../navigation-actions/change-directory.js';
import { getFolderContent } from '../directory-actions/get-folder-content.js';

export const commandsMatcher = async (input) => {
  const [command, ...args] = input.trim().split(' ');

  const commandsSet = {
    [commands.UP]: () => goUp(),
    [commands.CD]: () => changeDirectory(args[0]),
    [commands.LS]: () => getFolderContent(),
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
