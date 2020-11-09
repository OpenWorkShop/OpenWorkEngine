import React from 'react';
import OpenWorkShopContext from '../../OpenWorkShopContext';
import {Logger} from './Logger';

export const useLogger = (component: React.ComponentType<unknown>): Logger => {
  const owsCore = React.useContext(OpenWorkShopContext);
  return owsCore.logManager.getLogger(component.displayName || component.name);
};

export default useLogger;
