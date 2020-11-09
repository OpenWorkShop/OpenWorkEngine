import { __awaiter } from "tslib";
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import owsCore from '../OpenWorkShopCore';
export var ApiCallStatus;
(function (ApiCallStatus) {
    ApiCallStatus[ApiCallStatus["LOADING"] = -1] = "LOADING";
    ApiCallStatus[ApiCallStatus["IDLE"] = 0] = "IDLE";
    ApiCallStatus[ApiCallStatus["ERROR"] = 1] = "ERROR";
    ApiCallStatus[ApiCallStatus["SUCCESS"] = 2] = "SUCCESS";
})(ApiCallStatus || (ApiCallStatus = {}));
function getEndpointName(endpoint) {
    return endpoint
        .split('/')
        .filter((p) => p.length > 0)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join('');
}
export default class ApiCall {
    constructor(method, endpoint) {
        this.name = method.toLowerCase() + getEndpointName(endpoint);
        this.endpoint = endpoint;
        this.method = method;
        this.action = createAsyncThunk(`api/${this.name}`, this.fetch.bind(this));
        this.slice = createSlice({
            name: `${this.endpoint}`,
            initialState: this.getInitialState(),
            reducers: {},
            extraReducers: (builder) => this.buildExtraReducers(builder),
        });
        this.reducer = this.slice.reducer;
        ApiCall.reducers[this.name] = this.reducer;
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    processArgs(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return args;
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await,@typescript-eslint/no-unused-vars
    getEndpoint(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return `${owsCore.settings.url.toString()}api/${this.endpoint}`;
        });
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    prepare(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = this.method === 'POST' ? JSON.stringify(args) : null;
            return {
                method: this.method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ApiCall.Auth || '',
                },
                body,
            };
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fetch(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const processedArgs = yield this.processArgs(args);
            const response = yield fetch(yield this.getEndpoint(processedArgs), yield this.prepare(processedArgs));
            return (yield response.json());
        });
    }
    getInitialState() {
        return {
            status: ApiCallStatus.IDLE,
            errors: [],
            response: undefined,
        };
    }
    buildExtraReducers(builder, callback) {
        builder.addCase(this.action.pending, (state) => {
            state.status = ApiCallStatus.LOADING;
            state.errors = [];
        });
        builder.addCase(this.action.fulfilled, (state, action) => {
            var _a;
            const st = state;
            st.response = action.payload;
            const errors = (_a = st.response) === null || _a === void 0 ? void 0 : _a.errors;
            console.log('response', st.response);
            if (errors && errors.length > 0) {
                state.status = ApiCallStatus.ERROR;
                errors.forEach((e) => {
                    state.errors.push(e);
                });
            }
            else {
                state.status = ApiCallStatus.SUCCESS;
            }
            if (callback) {
                callback(st);
            }
        });
        builder.addCase(this.action.rejected, (state, action) => {
            var _a;
            state.status = ApiCallStatus.ERROR;
            state.errors.push({
                message: (_a = action.error.message) !== null && _a !== void 0 ? _a : 'Unknown',
                type: 'Client',
            });
        });
    }
}
ApiCall.reducers = {};
//# sourceMappingURL=ApiCall.js.map