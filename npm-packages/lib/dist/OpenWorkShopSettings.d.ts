import { Store } from "@reduxjs/toolkit";
import { UserManagerSettings } from "oidc-client";
import { IOwsState } from "./store";
import { LogOptions } from "./utils/logging/LogOptions";
export declare type OwsEnvironment = "Development" | "Staging" | "Production";
export interface IOwsSettings {
    environment: OwsEnvironment;
    url: URL;
}
export declare type HostnameMap = {
    [key: string]: OwsEnvironment;
};
export interface IOwsOptions {
    store: Store<IOwsState>;
    client: UserManagerSettings;
    environment?: OwsEnvironment;
    hostnameMap?: HostnameMap;
    i18nMiddleware?: any;
    logOptions?: LogOptions;
}
declare const settings: IOwsSettings;
export declare function loadSettings(opts: IOwsOptions): IOwsSettings;
export default settings;
