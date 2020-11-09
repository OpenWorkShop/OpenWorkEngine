import { IState as IAuthState } from './Identity/Auth';
import { IState as IUsersState } from './Identity/Users';
import ApiCall from './ApiCall';
export interface IApiState extends IAuthState, IUsersState {
}
declare const apiCalls: {
    [key: string]: ApiCall<any, any>;
};
export default apiCalls;
