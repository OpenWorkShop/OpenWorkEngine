/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import * as Oidc from 'redux-oidc';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore, } from '@reduxjs/toolkit';
export function configureMiddleware(...args) {
    // const logger = createLogger({ logger: logManager.getLogger("redux") });
    const middleware = [thunk];
    return middleware.concat(args);
}
export function configureReducers(reducers) {
    const ret = reducers !== null && reducers !== void 0 ? reducers : {};
    ret.oidc = Oidc.reducer;
    // Load API reducers
    Object.keys(api).forEach((k) => {
        ret[api[k].name] = api[k].reducer;
    });
    return combineReducers(ret);
}
export function configureStore(reducers, additionalMiddleware, enhancers, initialState) {
    const middleware = configureMiddleware(...(additionalMiddleware !== null && additionalMiddleware !== void 0 ? additionalMiddleware : []));
    const rootReducer = configureReducers(reducers);
    return createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...(enhancers !== null && enhancers !== void 0 ? enhancers : [])));
}
//# sourceMappingURL=store.js.map