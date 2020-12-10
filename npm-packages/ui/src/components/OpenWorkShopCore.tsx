import OpenWorkShop, { singleton as ows } from '@openworkshop/lib/OpenWorkShop';
import * as React from 'react';
import { OidcProvider } from 'redux-oidc';
import usePromise from 'react-promise-suspense';
import { ApolloProvider } from '@apollo/client';
import { IOwsOptions } from '@openworkshop/lib/OpenWorkShopSettings';
import { initReactI18next } from 'react-i18next';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';

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

  await ows.load(o);
  return ows;
}

const OpenWorkShopCore: React.FunctionComponent<IOwsProps> = (props: IOwsProps) => {
  const log = useLogger(OpenWorkShopCore);
  usePromise(fetchOws, [props]);

  return (
    <OpenWorkShop.Provider value={ows}>
      <ApolloProvider client={ows.apolloClient}>
        <OidcProvider store={ows.store} userManager={ows.authManager}>
          {props.children}
        </OidcProvider>
      </ApolloProvider>
    </OpenWorkShop.Provider>
  );
};

export default OpenWorkShopCore;

