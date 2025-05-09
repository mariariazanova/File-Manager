import { osCommandsMatcher } from './get-os-info-utils.js';
import { argumentPrefix } from '../utils/index.js';
import {defaultInputErrorMessage} from "../constants/messages.js";


export const getOSInfo = (info) => {
  return new Promise(async(resolve, reject) => {
    try {
      if (info.startsWith(argumentPrefix)) {
        const requiredInfo = info.trim().replace(argumentPrefix, '');

        const result = await osCommandsMatcher(requiredInfo);

        if (result === false) {
          return;
        }

        resolve();
      } else {
        console.log(defaultInputErrorMessage);
      }
    } catch {
      reject();
    }
  });
};
