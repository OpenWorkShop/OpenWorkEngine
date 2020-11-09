import OidcClient from 'oidc-client';
import JsLogger from 'js-logger';
import { Store } from 'redux';
import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { Logger } from './utils/logging/Logger';
import logManager, { LogManager } from './utils/logging';
import {
  developmentLogOptions,
  defaultLogOptions,
} from './utils/logging/LogOptions';
import {
  IOwsOptions,
  IOwsSettings,
  loadSettings,
} from './OpenWorkShopSettings';
import { createUserManager, loadUser } from 'redux-oidc';
import { IOwsState } from './store';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AnyAction } from '@reduxjs/toolkit';

export class OpenWorkShopCore {
  private _settings?: IOwsSettings = undefined;

  private _authManager?: OidcClient.UserManager = undefined;

  private _apolloClient?: ApolloClient<NormalizedCacheObject> = undefined;

  private _store?: Store<IOwsState> = undefined;

  private _user?: OidcClient.User = undefined;

  private _log?: Logger = undefined;

  i18n: any;

  public async load(opts: IOwsOptions): Promise<boolean> {
    this._store = opts.store;
    this._settings = loadSettings(opts);

    const root = this._settings.url.href;

    const um = opts.client;
    um.authority = root;
    this._authManager = createUserManager(um);

    const httpLink = new HttpLink({ uri: `${root}api/graphql` });
    this._apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: httpLink,
    });

    // Configure the logger
    const isDev = this._settings.environment === 'Development';
    const logOpts = isDev ? developmentLogOptions : defaultLogOptions;
    logManager.configure(logOpts).registerConsoleLogger();
    this._log = undefined;

    const oidcLogger = JsLogger.get('oidc');
    oidcLogger.setLevel(isDev ? JsLogger.INFO : JsLogger.WARN);
    OidcClient.Log.logger = oidcLogger;
    OidcClient.Log.level = OidcClient.Log.DEBUG;

    let i = i18n;
    if (opts.i18nMiddleware) {
      opts.i18nMiddleware.forEach((mw) => {
        i = i.use(mw);
      });
    }

    this.i18n = await i
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
        // debug: true,

        backend: {
          loadPath: `${root}{{lng}}/{{ns}}.json`,
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
      });

    this._user = await loadUser(this._store, this._authManager);

    this.log.debug('OWS Startup', this.isLoaded, this.settings, this._user, this);

    return this.isLoaded;
  }

  useAllI18nMiddleware(middleware: AnyAction[]) {
  }

  get isLoaded(): boolean {
    return !!this._settings;
  }

  get log(): Logger {
    if (!this._log) this._log = this.logManager.getLogger('ows-core');
    return this._log;
  }

  get logManager(): LogManager {
    return logManager;
  }

  get user(): OidcClient.User | undefined {
    return this._user;
  }

  get store(): Store<IOwsState> {
    this.check();
    return this._store!;
  }

  get settings(): IOwsSettings {
    this.check();
    return this._settings!;
  }

  get authManager(): OidcClient.UserManager {
    this.check();
    return this._authManager!;
  }

  get apolloClient(): ApolloClient<NormalizedCacheObject> {
    this.check();
    return this._apolloClient!;
  }

  private check() {
    if (!this.isLoaded) {
      throw new Error('OWS Core not loaded.');
    }
    return true;
  }
}

const owsCore = new OpenWorkShopCore();
export default owsCore;
