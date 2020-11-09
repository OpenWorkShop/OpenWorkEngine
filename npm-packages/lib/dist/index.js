export { default as logManager } from './utils/logging';
import OpenWorkShopContext from './OpenWorkShopContext';
import React from 'react';
import * as api_1 from './api';
export { api_1 as api };
import * as utils_1 from './utils';
export { utils_1 as utils };
export const useOpenWorkShop = () => {
    return React.useContext(OpenWorkShopContext);
};
//# sourceMappingURL=index.js.map