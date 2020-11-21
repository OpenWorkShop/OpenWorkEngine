import { Action, ActionReducerMapBuilder, AsyncThunk, Dispatch, Reducer, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { IOpenWorkShop } from '../OpenWorkShop';
export declare enum ApiCallStatus {
    LOADING = -1,
    IDLE = 0,
    ERROR = 1,
    SUCCESS = 2
}
export interface IRecord {
}
export interface IApiMeta {
    redirectUrl?: string;
}
export interface IApiError {
    message: string;
    type?: string;
    class?: string;
    code?: string;
}
declare type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
};
export interface IApiResponse {
    errors?: Array<IApiError>;
    meta?: IApiMeta;
}
export interface IApiResponseRecord<TRecord extends IRecord> extends IApiResponse {
    data: TRecord;
}
export interface IApiResponseRecords<TRecord extends IRecord> extends IApiResponse {
    data: Array<TRecord>;
}
export interface IApiCallState<TResponse extends IApiResponse> {
    status: ApiCallStatus;
    errors: Array<IApiError>;
    response?: TResponse;
}
declare type SuccessCallback<TResponse> = (state: IApiCallState<TResponse>) => void;
export interface IApiArgs {
    ows: IOpenWorkShop;
}
export default class ApiCall<TArgs extends IApiArgs, TResponse extends IApiResponse> {
    static reducers: {
        [key: string]: Reducer;
    };
    static Auth?: string;
    name: string;
    endpoint: string;
    method: string;
    action: AsyncThunk<TResponse, TArgs, AsyncThunkConfig>;
    slice: Slice<IApiCallState<TResponse>, SliceCaseReducers<IApiCallState<TResponse>>>;
    reducer: Reducer<IApiCallState<TResponse>, Action>;
    constructor(method: string, endpoint: string);
    processArgs(args: TArgs): Promise<TArgs>;
    getEndpoint(args: TArgs): Promise<string>;
    prepare(args: TArgs): Promise<RequestInit>;
    fetch(args: TArgs): Promise<TResponse>;
    getInitialState(): IApiCallState<TResponse>;
    buildExtraReducers(builder: ActionReducerMapBuilder<IApiCallState<TResponse>>, callback?: SuccessCallback<TResponse>): void;
}
export {};
