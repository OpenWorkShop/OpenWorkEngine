import * as React from 'react';
import OpenWorkShopCore from './OpenWorkShopCore';
import Preloader from './Preloader/Preloader';
import theme from '../themes/Wizard';
import { ThemeProvider } from '@material-ui/core';
// Loader for the core application; Suspense will remain until this is done.
const OpenWorkShopProvider = (props) => {
    var _a;
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(React.Suspense, { fallback: (_a = props.preloader) !== null && _a !== void 0 ? _a : React.createElement(Preloader, null) },
            React.createElement(OpenWorkShopCore, Object.assign({}, props)))));
};
export default OpenWorkShopProvider;
//# sourceMappingURL=OpenWorkShopProvider.js.map