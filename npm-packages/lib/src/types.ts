import { Store } from 'redux';
import { IOwsState } from './store';
import { Logger, LogManager } from './utils/logging';
import { LogOptions } from './utils/logging/LogOptions';
import OidcClient from 'oidc-client';
import { UserManagerSettings } from 'oidc-client';
import { AnyAction } from '@reduxjs/toolkit';
import { ApolloClient, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { StringMap, TFunction, i18n } from 'i18next';
import { BackendConnection } from './api/BackendConnection';

export type OwsEnvironment = 'Development' | 'Staging' | 'Production';

export interface ICustomizedOpenWorkShop {
  connection?: BackendConnection;

  i18n: i18n;

  store: Store<IOwsState>;
}

export type OpenWorkShopBuilderCallback = (ows: IOpenWorkShop) => ICustomizedOpenWorkShop;

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

  i18n: i18n;

  t: TTranslateFunc;
}

export interface IOwsSettings {
  environment: OwsEnvironment;
  url: URL;
}

export type HostnameMap = { [key: string]: OwsEnvironment };

export interface IOwsOptions {
  client: UserManagerSettings;
  environment?: OwsEnvironment;
  hostnameMap?: HostnameMap;
  logOptions?: LogOptions;
  builder: OpenWorkShopBuilderCallback;
}

export type TTranslateFunc = (key: string, opts?: StringMap) => string;
