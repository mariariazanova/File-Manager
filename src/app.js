import { createInterface } from 'readline';
import { commandsMatcher, showCurrentDirectory } from './utils/index.js';
import {
  baseWelcomeMessage,
  defaultInputErrorMessage,
  defaultOperationFailedMessage,
} from './constants/messages.js';
import { getMessage } from './utils/get-message.js';
import { commands } from './constants/commands.js';

export let displayedUsername = 'new user';

export function runApp(inputArguments) {
  if (!inputArguments) {
    console.log('Add -- --username=/-- -- --username= as argument while running npm run start');
    return;
  }

  const [parameter, username] = inputArguments.slice(2).split('=');

  if (username) {
    displayedUsername = username;
  }

  const welcomeMessage = getMessage(displayedUsername, baseWelcomeMessage, '!');

  console.log(parameter === 'username' ? welcomeMessage : defaultInputErrorMessage);

  showCurrentDirectory();

  const fileManagerInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  fileManagerInterface.on('line', async (input) => {
    try {
      await commandsMatcher(input);
    } catch {
      console.log(defaultOperationFailedMessage);
    }
  });

  fileManagerInterface.on(commands.SIGINT, async () => {
    try {
      await commandsMatcher(commands.SIGINT);
    } catch {
      console.log(defaultOperationFailedMessage);
    }
  });
}
