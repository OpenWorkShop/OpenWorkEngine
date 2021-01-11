/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { IApiState } from './api';
import * as Oidc from 'redux-oidc';
import thunk from 'redux-thunk';
import { GWizState, WorkspacesState } from './open-controller';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  PreloadedState,
  Reducer,
  ReducersMapObject,
  Store,
} from '@reduxjs/toolkit';

export interface IOwsState extends IApiState {
  oidc: Oidc.UserState;
  gWiz: GWizState;
  workspaces: WorkspacesState;
}

export type ReducersTypes = AnyAction;

export function configureMiddleware(...args: unknown[]): any[] {
  // const logger = createLogger({ logger: logManager.getLogger("redux") });
  const middleware: unknown[] = [thunk];

  return middleware.concat(args);
}

export function configureReducers<TState extends IOwsState>(
  reducers?: ReducersMapObject<any, AnyAction>,
): Reducer<TState, AnyAction> {
  const ret = reducers ?? {};
  ret.oidc = Oidc.reducer;

  // Load API reducers
  Object.keys(api).forEach((k) => {
    ret[api[k].name] = api[k].reducer;
  });

  return combineReducers<TState, AnyAction>(ret);
}

export function configureStore<TState extends IOwsState>(
  reducers?: ReducersMapObject<unknown, AnyAction>,
  additionalMiddleware?: any[],
  enhancers?: any[],
  initialState?: PreloadedState<TState>,
): Store<IOwsState> {
  const middleware = configureMiddleware(...(additionalMiddleware ?? []));
  const rootReducer = configureReducers<TState>(reducers);
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...(enhancers ?? [])));
}
