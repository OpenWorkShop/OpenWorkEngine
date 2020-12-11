// Interface that combines ALL the API states into one state
import {IState as IAuthState} from './Identity/Auth';
import {IState as IUsersState} from './Identity/Users';
import {IOpenWorkShop} from '../types';

export interface IApiState extends IAuthState, IUsersState {}

export enum ApiCallStatus {
  LOADING = -1,
  IDLE, // <= IDLE means "not done"
  ERROR, // <= ERROR means "not (yet?) successful"
  SUCCESS,
}

// Generic record type
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRecord {}

export interface IApiMeta {
  redirectUrl?: string;
}

// The "error" object can be returned in any API response.
export interface IApiError {
  message: string;
  type?: string;
  class?: string;
  code?: string;
}


// All API responses derive from this
export interface IApiResponse {
  errors?: Array<IApiError>;
  meta?: IApiMeta;
}

// API response for a single record
export interface IApiResponseRecord<TRecord extends IRecord>
  extends IApiResponse {
  data: TRecord;
}

// API response for a list of records
export interface IApiResponseRecords<TRecord extends IRecord>
  extends IApiResponse {
  data: Array<TRecord>;
}

// Used by reducers to track call status
export interface IApiCallState<TResponse extends IApiResponse> {
  status: ApiCallStatus;
  errors: Array<IApiError>;
  response?: TResponse;
}

export interface IApiArgs {
  ows: IOpenWorkShop;
}
