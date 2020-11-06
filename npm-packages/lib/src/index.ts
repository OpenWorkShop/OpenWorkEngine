export { default as logManager } from "./utils/logging";
import { Logger } from "./utils/logging/Logger";
import React from 'react';
import logManager from './utils/logging';
export * as api from "./api";
// export * from './api';
export * as utils from "./utils";

export const useLogger = (component: React.ComponentType<unknown>): Logger => {
  return logManager.getLogger(component.displayName || component.name);
};
