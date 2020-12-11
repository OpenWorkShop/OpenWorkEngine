import { Store } from 'redux';
import { IOwsState } from './store';
import { Logger, LogManager } from './utils/logging';
import { LogOptions } from './utils/logging/LogOptions';
import OidcClient from 'oidc-client';
import { UserManagerSettings } from 'oidc-client';
import { AnyAction } from '@reduxjs/toolkit';
import { ApolloClient, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { StringMap, TFunction } from 'i18next';

export type OwsEnvironment = 'Development' | 'Staging' | 'Production';

// Main object exposed to clients via the Context.
export interface IOpenWorkShop {
  settings: IOwsSettings;

  authManager: OidcClient.UserManager;

  apolloClient: ApolloClient<NormalizedCacheObject>;

  store: Store<IOwsState>;

  user: OidcClient.User | undefined;

  isAuthenticated: boolean;

  log: Logger;

  logManager: LogManager;

  i18n: TFunction;

  t: TTranslateFunc;
}

export interface IOwsSettings {
  environment: OwsEnvironment;
  url: URL;
}

export type HostnameMap = { [key: string]: OwsEnvironment };

export interface IOwsOptions {
  store: Store<IOwsState>;
  client: UserManagerSettings;
  environment?: OwsEnvironment;
  hostnameMap?: HostnameMap;
  i18nMiddleware?: AnyAction[];
  logOptions?: LogOptions;
  clientApolloLinkCreator?: (ows: IOpenWorkShop) => ApolloLink;
}

export type TTranslateFunc = (key: string, opts?: StringMap) => string;
