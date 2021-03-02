import authApi from './Auth';
import usersApi from './Users';
import ApiCall from './ApiCall';

export { ApiCall };
export { ApiCallStatus } from './types';
export type {
  IApiError, IApiState, IApiMeta, IApiArgs, IApiCallState, IApiResponse, IApiResponseRecord,  IApiResponseRecords
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiCalls: { [key: string]: ApiCall<any, any> } = {
  ...authApi,
  ...usersApi,
};
export * from './BackendConnection';

export default apiCalls;
