import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import i18nModule, { StringMap, TFunction, i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import JsLogger from 'js-logger';
import OidcClient from 'oidc-client';
import React from 'react';
import { Store } from 'redux';
import { createUserManager, loadUser } from 'redux-oidc';
import { abbreviation } from './consts';
import { loadSettings } from './OpenWorkShopSettings';
import { IOwsState } from './store';
import logManager, { LogManager } from './utils/logging';
import { Logger } from './utils/logging';
import { defaultLogOptions, developmentLogOptions } from './utils/logging/LogOptions';
import { ICustomizedOpenWorkShop, IOpenWorkShop, IOwsOptions, IOwsSettings } from './types';

let _i = 0;

class OpenWorkShop implements IOpenWorkShop {
  private _settings?: IOwsSettings = undefined;

  private _authManager?: OidcClient.UserManager = undefined;

  private _apolloClient?: ApolloClient<NormalizedCacheObject> = undefined;

  private _store?: Store<IOwsState> = undefined;

  private _user?: OidcClient.User = undefined;

  private _log?: Logger = undefined;

  private _i = -1;

  private _i18n?: i18n;

  private _t?: TFunction;

  constructor() {
    if (_i != 0) {
      throw new Error('OpenWorkShop already initialized in different context.');
    }
    this._i = _i;
    _i++;
  }

  public async load(opts: IOwsOptions): Promise<ICustomizedOpenWorkShop> {
    this._settings = loadSettings(opts);

    const root = this._settings.url.href;

    const um = opts.client;
    um.authority = root;
    this._authManager = createUserManager(um);

    const owsLink = setContext(async (_, { headers }) => {
      const user = await this.authManager.getUser();
      // this.log.debug('setting auth token?', !!user);
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          ...headers,
          authorization: user ? `Bearer ${user.access_token}` : '',
        },
      };
    }).concat(new HttpLink({ uri: `${root}api/graphql` }));

    let link = owsLink;
    this._i18n = i18nModule;
    const cust = opts.builder(this);

    this._store = cust.store;

    if (cust.connection) {
      link = ApolloLink.split(
        (operation) => operation.getContext().clientName === abbreviation,
        owsLink,
        cust.connection.webSocketLink,
      );
    }
    if (cust.i18n) {
      this._i18n = cust.i18n;
    }

    this._apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: link,
    });

    // Configure the logger
    const isDev = this._settings.environment === 'Development';
    const verbose = false;
    const logOpts = isDev ? developmentLogOptions : defaultLogOptions;
    logManager.configure(logOpts).registerConsoleLogger();
    this._log = undefined;

    const oidcLogger = JsLogger.get('oidc');
    oidcLogger.setLevel(isDev ? JsLogger.INFO : JsLogger.WARN);
    OidcClient.Log.logger = oidcLogger;
    OidcClient.Log.level = OidcClient.Log.DEBUG;

    this.log.debug('loading localizations...');
    this._t = await this._i18n
      // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
      // learn more: https://github.com/i18next/i18next-http-backend
      .use(Backend)
      // detect user language
      // learn more: https://github.com/i18next/i18next-browser-languageDetector
      .use(LanguageDetector)
      // init i18next
      // for all options read: https://www.i18next.com/overview/configuration-options
      .init({
        fallbackLng: 'en',
        debug: verbose,

        backend: {
          loadPath: `${root}locales/{{lng}}/{{ns}}.json`,
          requestOptions: {
            mode: 'no-cors',
          },
        },

        react: {
          wait: true,
        },

        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
      })
      .then((f) => {
        this.log.debug('Loaded localizations', f);
        return f;
      });

    this._user = await loadUser(this._store, this._authManager);

    this.log.debug('OWS Startup', this.isLoaded, this.settings, this._user, this);

    return cust;
  }

  get isLoaded(): boolean {
    return !!this._settings;
  }

  get i18n(): i18n {
    this.check();
    return this._i18n as i18n;
  }

  public t(key: string, opts?: StringMap): string {
    this.check();
    if (!this._t) {
      throw new Error('Localization not ready.');
    }
    return this._t(key, opts);
  }

  get log(): Logger {
    if (!this._log) this._log = this.logManager.getLogger('ows-core');
    return this._log;
  }

  get logManager(): LogManager {
    return logManager;
  }

  get isAuthenticated(): boolean {
    return !!this._user;
  }

  get user(): OidcClient.User | undefined {
    return this._user;
  }

  get store(): Store<IOwsState> {
    this.check();
    return this._store as Store<IOwsState>;
  }

  get settings(): IOwsSettings {
    this.check();
    return this._settings as IOwsSettings;
  }

  get authManager(): OidcClient.UserManager {
    this.check();
    return this._authManager as OidcClient.UserManager;
  }

  get apolloClient(): ApolloClient<NormalizedCacheObject> {
    this.check();
    return this._apolloClient as ApolloClient<NormalizedCacheObject>;
  }

  private check() {
    if (!this.isLoaded) {
      throw new Error('OWS Core not loaded.');
    }
    return true;
  }
}

export const singleton: OpenWorkShop = new OpenWorkShop();

const OpenWorkShopContext: React.Context<IOpenWorkShop> = React.createContext<IOpenWorkShop>(singleton);

export default OpenWorkShopContext;
