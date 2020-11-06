import { __awaiter } from "tslib";
import OidcClient from "oidc-client";
import JsLogger from 'js-logger';
import { HttpLink, InMemoryCache, ApolloClient, } from "@apollo/client";
import logManager from "./utils/logging";
import { developmentLogOptions, defaultLogOptions, } from "./utils/logging/LogOptions";
import { loadSettings, } from "./OpenWorkShopSettings";
import { createUserManager, loadUser } from "redux-oidc";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
export class OpenWorkShopCore {
    constructor() {
        this._settings = undefined;
        this._authManager = undefined;
        this._apolloClient = undefined;
        this._store = undefined;
        this._user = undefined;
        this._log = undefined;
    }
    load(opts) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const isDev = this._settings.environment === "Development";
            const logOpts = isDev ? developmentLogOptions : defaultLogOptions;
            logManager.configure(logOpts).registerConsoleLogger();
            this._log = undefined;
            const oidcLogger = JsLogger.get('oidc');
            oidcLogger.setLevel(isDev ? JsLogger.INFO : JsLogger.WARN);
            OidcClient.Log.logger = oidcLogger;
            OidcClient.Log.level = OidcClient.Log.DEBUG;
            this.i18n = yield i18n
                // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
                // learn more: https://github.com/i18next/i18next-http-backend
                .use(Backend)
                // detect user language
                // learn more: https://github.com/i18next/i18next-browser-languageDetector
                .use(LanguageDetector)
                // pass the i18n instance to react-i18next.
                .use(opts.i18nMiddleware)
                // init i18next
                // for all options read: https://www.i18next.com/overview/configuration-options
                .init({
                fallbackLng: "en",
                // debug: true,
                backend: {
                    loadPath: `${root}{{lng}}/{{ns}}.json`,
                    requestOptions: {
                        mode: "no-cors",
                    },
                },
                react: {
                    wait: true,
                },
                interpolation: {
                    escapeValue: false,
                },
            });
            this._user = yield loadUser(this._store, this._authManager);
            this.log.debug("OWS Startup", this.isLoaded, this.settings, this._user);
            return this.isLoaded;
        });
    }
    get isLoaded() {
        return !!this._settings;
    }
    get log() {
        if (!this._log)
            this._log = this.logManager.getLogger("ows-core");
        return this._log;
    }
    get logManager() {
        return logManager;
    }
    get user() {
        return this._user;
    }
    get store() {
        this.check();
        return this._store;
    }
    get settings() {
        this.check();
        return this._settings;
    }
    get authManager() {
        this.check();
        return this._authManager;
    }
    get apolloClient() {
        this.check();
        return this._apolloClient;
    }
    check() {
        if (!this.isLoaded) {
            throw new Error("OWS Core not loaded.");
        }
        return true;
    }
}
const owsCore = new OpenWorkShopCore();
export default owsCore;
//# sourceMappingURL=OpenWorkShopCore.js.map