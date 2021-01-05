import { IOwsSettings, OwsEnvironment, HostnameMap, IOwsOptions } from './types';

const defaultEnv: OwsEnvironment = 'Production';

function getServerUrl(env: OwsEnvironment): URL {
  if (env === 'Development') {
    return new URL('http://dev.openwork.shop:5000');
  } else if (env === 'Staging') {
    return new URL('https://staging.openwork.shop');
  }
  return new URL('https://openwork.shop');
}

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
