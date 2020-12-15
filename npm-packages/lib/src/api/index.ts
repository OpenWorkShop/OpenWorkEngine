import authApi from './Identity/Auth';
import usersApi from './Identity/Users';
import ApiCall from './ApiCall';
export {
  IApiError, IApiState, IApiMeta, IApiArgs, IApiCallState, IApiResponse, IApiResponseRecord,
  IApiResponseRecords, ApiCallStatus,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiCalls: { [key: string]: ApiCall<any, any> } = {
  ...authApi,
  ...usersApi,
};
export * from './BackendConnection';

export default apiCalls;
