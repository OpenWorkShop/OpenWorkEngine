import { IApiState } from "./api";
import * as Oidc from "redux-oidc";
import { AnyAction, PreloadedState, Reducer, ReducersMapObject, Store } from "@reduxjs/toolkit";
export interface IOwsState extends IApiState {
    oidc: Oidc.UserState;
}
export declare function configureMiddleware(...args: any[]): any[];
export declare function configureReducers<TState extends IOwsState>(reducers?: ReducersMapObject<any, any>): Reducer<TState, AnyAction>;
export declare function configureStore<TState extends IOwsState>(reducers?: ReducersMapObject<any, any>, additionalMiddleware?: any[], enhancers?: any[], initialState?: PreloadedState<TState>): Store<IOwsState>;
