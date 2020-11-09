export { default as logManager } from './utils/logging';
import {OpenWorkShopCore} from './OpenWorkShopCore';
import OpenWorkShopContext from './OpenWorkShopContext';
import React from 'react';
export * as api from './api';
// export * from './api';
export * as utils from './utils';

export const useOpenWorkShop = (): OpenWorkShopCore => {
  return React.useContext(OpenWorkShopContext);
};
