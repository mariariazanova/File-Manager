import os from 'os';
import { getCurrentDirectory } from '../utils/index.js';
import { osCommands } from '../constants/commands.js';
import { defaultInputErrorMessage } from '../constants/messages.js';

const getOsEol = () => {
  const osEol = JSON.stringify(os.EOL);

  console.log(`Default system End-Of-Line is ${ osEol }`);
};

const getCpus = () => {
  const cpus = os.cpus();
  const cpuCount = cpus.length;

  console.log(`Number of CPUs is ${ cpuCount }`);

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${ index + 1 }: ${ cpu.model }, ${(cpu.speed / 1000).toFixed(2)} GHz`);
  });
};

const getHomeDirectory = () => {
  const homeDirectory = getCurrentDirectory();

  console.log(`Home directory is ${ homeDirectory }`);
}

const getSystemUserName = () => {
  const systemUserName = os.userInfo().username;

  console.log(`System user name is ${ systemUserName }`);
}

const getCpuArchitecture = () => {
  const cpuArchitecture = os.arch();

  console.log(`CPU architecture is ${ cpuArchitecture }`);
}

export const osCommandsMatcher = async (command) => {
  const commandsSet = {
    [osCommands.EOL]: () => getOsEol(),
    [osCommands.CPUS]: () => getCpus(),
    [osCommands.HOMEDIR]: () => getHomeDirectory(),
    [osCommands.USERNAME]: () => getSystemUserName(),
    [osCommands.ARCHITECTURE]: () => getCpuArchitecture(),
  };

  if (commandsSet[command]) {
    await commandsSet[command]();
  } else {
    console.log(defaultInputErrorMessage);
    return false;
  }
}
