import { ApolloLink } from '@apollo/client';
import { Store, AnyAction } from '@reduxjs/toolkit';
import { UserManagerSettings } from 'oidc-client';
import { IOpenWorkShop } from './OpenWorkShop';
import { IOwsState } from './store';
import { LogOptions } from './utils/logging/LogOptions';

export type OwsEnvironment = 'Development' | 'Staging' | 'Production';

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

function getServerUrl(env: OwsEnvironment): URL {
  if (env === 'Development') {
    return new URL('http://dev.openwork.shop:5000');
  } else if (env === 'Staging') {
    return new URL('https://staging.openwork.shop');
  }
  return new URL('https://openwork.shop');
}

const defaultEnv: OwsEnvironment = 'Production';

const settings: IOwsSettings = {
  environment: defaultEnv,
  url: getServerUrl(defaultEnv),
};

function getEnvironment(map?: HostnameMap): OwsEnvironment {
  const env = map ? map[window.location.hostname] : undefined;
  return env ?? defaultEnv;
}

export function loadSettings(opts: IOwsOptions): IOwsSettings {
  settings.environment = opts.environment ?? getEnvironment(opts.hostnameMap);
  settings.url = getServerUrl(settings.environment);
  return settings;
}

export default settings;
