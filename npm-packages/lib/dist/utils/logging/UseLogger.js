import React from 'react';
import OpenWorkShopContext from '../../OpenWorkShopContext';
export const useLogger = (component) => {
    const owsCore = React.useContext(OpenWorkShopContext);
    return owsCore.logManager.getLogger(component.displayName || component.name);
};
export default useLogger;
//# sourceMappingURL=UseLogger.js.map