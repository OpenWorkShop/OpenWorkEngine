import ApiCall from './ApiCall';
import {IApiArgs, IApiCallState, IApiResponseRecord, IRecord} from './types';

// Public user profile
export interface IUserProfile extends IRecord {
  username: string;
}

// Private user data (manage the current user)
export interface IManageUserProfile extends IUserProfile {
  email: string;
  phoneNumber: string;
  twoFactorEnabled: boolean;
}

export type ICurrentUserResponse = IApiResponseRecord<IManageUserProfile>;

export interface IState {
  getUsersMe: IApiCallState<ICurrentUserResponse>;
}

export default {
  getUsersMe: new ApiCall<IApiArgs, ICurrentUserResponse>('GET', 'users/me'),
};
