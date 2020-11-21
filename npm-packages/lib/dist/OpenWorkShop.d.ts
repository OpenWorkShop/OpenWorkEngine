import React from 'react';
import OidcClient from 'oidc-client';
import { Store } from 'redux';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Logger } from './utils/logging/Logger';
import { LogManager } from './utils/logging';
import { IOwsOptions, IOwsSettings } from './OpenWorkShopSettings';
import { IOwsState } from './store';
import { TFunction } from 'i18next';
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
}
declare class OpenWorkShop implements IOpenWorkShop {
    private _settings?;
    private _authManager?;
    private _apolloClient?;
    private _store?;
    private _user?;
    private _log?;
    private _i;
    private _i18n?;
    constructor();
    load(opts: IOwsOptions): Promise<boolean>;
    get isLoaded(): boolean;
    get i18n(): TFunction;
    get log(): Logger;
    get logManager(): LogManager;
    get isAuthenticated(): boolean;
    get user(): OidcClient.User | undefined;
    get store(): Store<IOwsState>;
    get settings(): IOwsSettings;
    get authManager(): OidcClient.UserManager;
    get apolloClient(): ApolloClient<NormalizedCacheObject>;
    private check;
}
export declare const singleton: OpenWorkShop;
declare const OpenWorkShopContext: React.Context<OpenWorkShop>;
export default OpenWorkShopContext;
