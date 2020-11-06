export { default as logManager } from "./utils/logging";
import { Logger } from "./utils/logging/Logger";
import React from 'react';
export * as api from "./api";
export * as utils from "./utils";
export declare const useLogger: (component: React.ComponentType<unknown>) => Logger;
