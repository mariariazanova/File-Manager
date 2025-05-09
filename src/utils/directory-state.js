import { homedir } from 'os';

let currentDirectory = homedir();

export const getCurrentDirectory = () => currentDirectory;

export const setCurrentDirectory = (newDirectory) => {
    currentDirectory = newDirectory;
};
