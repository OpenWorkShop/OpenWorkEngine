import {
  Action,
  ActionReducerMapBuilder,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  Dispatch,
  Reducer,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import _ from 'lodash';
import {ApiCallStatus, IApiArgs, IApiCallState, IApiResponse} from './types';

// Copied from createAsyncThunk.ts (private)
type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
};

function getEndpointName(endpoint: string) {
  return endpoint
    .split('/')
    .filter((p) => p.length > 0)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

type SuccessCallback<TResponse> = (state: IApiCallState<TResponse>) => void;

export default class ApiCall<TArgs extends IApiArgs, TResponse extends IApiResponse> {
  static reducers: { [key: string]: Reducer } = {};

  static Auth?: string;

  name: string;

  endpoint: string;

  method: string;

  action: AsyncThunk<TResponse, TArgs, AsyncThunkConfig>;

  slice: Slice<
    IApiCallState<TResponse>,
    SliceCaseReducers<IApiCallState<TResponse>>
  >;

  reducer: Reducer<IApiCallState<TResponse>, Action>;

  constructor(method: string, endpoint: string) {
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
  async processArgs(args: TArgs): Promise<TArgs> {
    return args;
  }

  // eslint-disable-next-line @typescript-eslint/require-await,@typescript-eslint/no-unused-vars
  async getEndpoint(args: TArgs): Promise<string> {
    return `${args.ows.settings.url.toString()}api/${this.endpoint}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async prepare(args: TArgs): Promise<RequestInit> {
    const body = this.method === 'POST' ? JSON.stringify(_.omit(args, 'ows')) : null;
    return {
      method: this.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: ApiCall.Auth || '',
      },
      body,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async fetch(args: TArgs) {
    const processedArgs = await this.processArgs(args);
    const response = await fetch(
      await this.getEndpoint(processedArgs),
      await this.prepare(processedArgs)
    );
    return (await response.json()) as TResponse;
  }

  getInitialState(): IApiCallState<TResponse> {
    return {
      status: ApiCallStatus.IDLE,
      errors: [],
      response: undefined,
    };
  }

  buildExtraReducers(
    builder: ActionReducerMapBuilder<IApiCallState<TResponse>>,
    callback?: SuccessCallback<TResponse>
  ): void {
    builder.addCase(this.action.pending, (state) => {
      state.status = ApiCallStatus.LOADING;
      state.errors = [];
    });
    builder.addCase(this.action.fulfilled, (state, action) => {
      const st = state as IApiCallState<TResponse>;
      st.response = action.payload;
      const errors = st.response?.errors;
      console.log('response', st.response);
      if (errors && errors.length > 0) {
        state.status = ApiCallStatus.ERROR;
        errors.forEach((e) => {
          state.errors.push(e);
        });
      } else {
        state.status = ApiCallStatus.SUCCESS;
      }
      if (callback) {
        callback(st);
      }
    });
    builder.addCase(this.action.rejected, (state, action) => {
      state.status = ApiCallStatus.ERROR;
      state.errors.push({
        message: action.error.message ?? 'Unknown',
        type: 'Client',
      });
    });
  }
}
