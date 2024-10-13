import { showCurrentDirectory } from './show-current-directory.js';
import { exitFileManager } from './exit-file-manager.js';
import { defaultInputErrorMessage } from '../constants/messages.js';
import { commands } from '../constants/commands.js';

export const commandsMatcher = async (input) => {
  const [command, ...args] = input.trim().split(' ');

  const commandsSet = {
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
