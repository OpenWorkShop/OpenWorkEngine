import React from 'react';
import OpenWorkShopContext from '../../OpenWorkShopContext';
import { Logger } from './Logger';

// type Components = React.ComponentType<unknown> | React.FunctionComponent<unknown>;
//
// export const useLogger = (component: Components): Logger => {
//   const owsCore = React.useContext(OpenWorkShopContext);
//   return owsCore.logManager.getLogger(component.displayName || component.name);
// };

export function useLogger<TProps>(component: React.ComponentType<unknown> | React.FunctionComponent<TProps>): Logger {
  const owsCore = React.useContext(OpenWorkShopContext);
  return owsCore.logManager.getLogger(component.displayName || component.name);
}

export default useLogger;
