import { baseEndMessage } from '../constants/messages.js';
import { getMessage } from './get-message.js';
import { displayedUsername } from '../index.js';

export const exitFileManager = () => {
  const endMessage = getMessage(displayedUsername, baseEndMessage, ', goodbye!');

  console.log(endMessage);
  process.exit();
};
