import React from 'react';
import OpenWorkShopContext from '../../OpenWorkShopContext';
// type Components = React.ComponentType<unknown> | React.FunctionComponent<unknown>;
//
// export const useLogger = (component: Components): Logger => {
//   const owsCore = React.useContext(OpenWorkShopContext);
//   return owsCore.logManager.getLogger(component.displayName || component.name);
// };
export function useLogger(component) {
    const owsCore = React.useContext(OpenWorkShopContext);
    return owsCore.logManager.getLogger(component.displayName || component.name);
}
export default useLogger;
//# sourceMappingURL=UseLogger.js.map