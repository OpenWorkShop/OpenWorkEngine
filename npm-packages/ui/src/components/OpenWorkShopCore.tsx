import owsCore from '@openworkshop/lib/OpenWorkShopCore';
import * as React from 'react';
import { OidcProvider } from 'redux-oidc';
import usePromise from 'react-promise-suspense';
import { ApolloProvider } from '@apollo/client';
import { IOwsOptions } from '@openworkshop/lib/OpenWorkShopSettings';
import { initReactI18next } from 'react-i18next';

export interface IOwsProps extends IOwsOptions {
  preloader?: unknown[];
  children: React.ReactNode;
}

async function fetchOws(opts: IOwsProps) {
  const o = { ...opts };
  if (!o.i18nMiddleware) {
    o.i18nMiddleware = [];
  }
  o.i18nMiddleware.push(initReactI18next);

  await owsCore.load(o);
  return owsCore;
}

const OpenWorkShopContext = React.createContext(owsCore);

const OpenWorkShopCore: React.FunctionComponent<IOwsProps> = (props: IOwsProps) => {
  usePromise(fetchOws, [props]);

  return (
    <OpenWorkShopContext.Provider value={owsCore}>
      <ApolloProvider client={owsCore.apolloClient}>
        <OidcProvider store={owsCore.store} userManager={owsCore.authManager}>
          {props.children}
        </OidcProvider>
      </ApolloProvider>
    </OpenWorkShopContext.Provider>
  );
};

export default OpenWorkShopCore;
