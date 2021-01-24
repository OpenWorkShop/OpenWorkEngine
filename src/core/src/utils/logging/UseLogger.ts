import React from 'react';
import OpenWorkShop from '../../OpenWorkShop';
import { Logger } from './';

// type Components = React.ComponentType<unknown> | React.FunctionComponent<unknown>;
//
// export const useLogger = (component: Components): Logger => {
//   const owsCore = React.useContext(OpenWorkShopContext);
//   return owsCore.logManager.getLogger(component.displayName || component.name);
// };

type Component<TProps> = React.ComponentType<unknown> | React.FunctionComponent<TProps>;

export function useComponentName<TProps>(component: Component<TProps>): string {
  return component.displayName || component.name;
}

export function useLogger<TProps>(component: Component<TProps>): Logger {
  return React.useContext(OpenWorkShop).logManager.getLogger(useComponentName(component));
}

export function useLoggerName(name: string): Logger {
  return React.useContext(OpenWorkShop).logManager.getLogger(name);
}

export default useLogger;
