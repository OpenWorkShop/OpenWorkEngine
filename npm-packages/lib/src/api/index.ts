import authApi, { IState as IAuthState } from './Identity/Auth';
import usersApi, { IState as IUsersState } from './Identity/Users';
import ApiCall from './ApiCall';

// Interface that combines ALL the API states into one state
export interface IApiState extends IAuthState, IUsersState {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiCalls: { [key: string]: ApiCall<any, any> } = {
  ...authApi,
  ...usersApi,
};

export default apiCalls;
