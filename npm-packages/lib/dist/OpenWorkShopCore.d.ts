import OidcClient from "oidc-client";
import { Store } from "redux";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { Logger } from "./utils/logging/Logger";
import { LogManager } from "./utils/logging";
import { IOwsOptions, IOwsSettings } from "./OpenWorkShopSettings";
import { IOwsState } from "./store";
export declare class OpenWorkShopCore {
    private _settings?;
    private _authManager?;
    private _apolloClient?;
    private _store?;
    private _user?;
    private _log?;
    i18n: any;
    load(opts: IOwsOptions): Promise<boolean>;
    get isLoaded(): boolean;
    get log(): Logger;
    get logManager(): LogManager;
    get user(): OidcClient.User | undefined;
    get store(): Store<IOwsState>;
    get settings(): IOwsSettings;
    get authManager(): OidcClient.UserManager;
    get apolloClient(): ApolloClient<NormalizedCacheObject>;
    private check;
}
declare const owsCore: OpenWorkShopCore;
export default owsCore;
