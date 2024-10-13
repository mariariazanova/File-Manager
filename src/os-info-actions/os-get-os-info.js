import { osCommandsMatcher } from './get-os-info-utils.js';
import { argumentPrefix } from '../utils/index.js';


export const getOSInfo = (info) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (info.startsWith(argumentPrefix)) {
        const requiredInfo = info.trim().replace(argumentPrefix, '');

        await osCommandsMatcher(requiredInfo);
        resolve();
      } else {
        reject()
      }
    } catch {
      reject();
    }
  });
};
