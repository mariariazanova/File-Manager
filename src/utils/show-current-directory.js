import { getCurrentDirectory } from './directory-state.js';

export const showCurrentDirectory = () => {
  const currentDirectory = getCurrentDirectory();

  console.log(`\nYou are currently in ${ currentDirectory }`);
};
