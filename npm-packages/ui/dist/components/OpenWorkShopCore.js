var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import owsCore from '@openworkshop/lib/OpenWorkShopCore';
import * as React from 'react';
import { OidcProvider } from 'redux-oidc';
import usePromise from 'react-promise-suspense';
import { ApolloProvider } from '@apollo/client';
import { initReactI18next } from 'react-i18next';
function fetchOws(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!opts.i18nMiddleware) {
            opts.i18nMiddleware = [];
        }
        opts.i18nMiddleware.push(initReactI18next);
        yield owsCore.load(opts);
        return owsCore;
    });
}
const OpenWorkShopContext = React.createContext(owsCore);
const OpenWorkShopCore = (props) => {
    usePromise(fetchOws, [props]);
    return (React.createElement(OpenWorkShopContext.Provider, { value: owsCore },
        React.createElement(ApolloProvider, { client: owsCore.apolloClient },
            React.createElement(OidcProvider, { store: owsCore.store, userManager: owsCore.authManager }, props.children))));
};
export default OpenWorkShopCore;
//# sourceMappingURL=OpenWorkShopCore.js.map