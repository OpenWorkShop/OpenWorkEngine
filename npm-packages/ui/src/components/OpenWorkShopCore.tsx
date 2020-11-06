import owsCore from "@openworkshop/lib/OpenWorkShopCore";
import * as React from "react";
import { OidcProvider } from "redux-oidc";
import usePromise from "react-promise-suspense";
import { ApolloProvider } from "@apollo/client";
import { IOwsOptions } from "@openworkshop/lib/OpenWorkShopSettings";

export interface IOwsProps extends IOwsOptions {
  preloader?: any;
  children: any;
}

async function fetchOws(opts: IOwsProps) {
  await owsCore.load(opts);
  return owsCore;
}

const OpenWorkShopContext = React.createContext(owsCore);

const OpenWorkShopCore: React.FunctionComponent<IOwsProps> = (
  props: IOwsProps
) => {
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
