import OpenWorkShop, { singleton as ows } from '@openworkshop/lib/OpenWorkShop';
import * as React from 'react';
import { OidcProvider } from 'redux-oidc';
import usePromise from 'react-promise-suspense';
import { ApolloProvider } from '@apollo/client';
import {ICustomizedOpenWorkShop, IOwsOptions} from '@openworkshop/lib/';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { Theme } from '@material-ui/core';
import {Provider} from 'react-redux';

export interface IOwsProps extends IOwsOptions {
  preloader?: unknown[];

  theme: Theme;

  children: React.ReactNode;
}

async function fetchApp(opts: IOwsProps) {
  return (await ows.load(opts));
}

const OpenWorkShopCore: React.FunctionComponent<IOwsProps> = (props: IOwsProps) => {
  const log = useLogger(OpenWorkShopCore);
  usePromise(() => fetchApp(props), [props]);

  return (
    <Provider store={ows.store}>
      <OpenWorkShop.Provider value={ows}>
        <ApolloProvider client={ows.apolloClient}>
          <OidcProvider store={ows.store} userManager={ows.authManager}>
            {props.children}
          </OidcProvider>
        </ApolloProvider>
      </OpenWorkShop.Provider>
    </Provider>
  );
};

export default OpenWorkShopCore;

