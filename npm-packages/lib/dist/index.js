export { default as logManager } from "./utils/logging";
import logManager from './utils/logging';
import * as api_1 from "./api";
export { api_1 as api };
import * as utils_1 from "./utils";
export { utils_1 as utils };
export const useLogger = (component) => {
    return logManager.getLogger(component.displayName || component.name);
};
//# sourceMappingURL=index.js.map