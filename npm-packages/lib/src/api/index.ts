import authApi, { IState as IAuthState } from './Identity/Auth';
import usersApi, { IState as IUsersState } from './Identity/Users';
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

export default apiCalls;
