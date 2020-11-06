import ApiCall, { IApiCallState, IApiResponseRecord, IRecord } from "./ApiCall";
export interface IUserProfile extends IRecord {
    username: string;
}
export interface IManageUserProfile extends IUserProfile {
    email: string;
    phoneNumber: string;
    twoFactorEnabled: boolean;
}
export declare type ICurrentUserResponse = IApiResponseRecord<IManageUserProfile>;
export interface IState {
    getUsersMe: IApiCallState<ICurrentUserResponse>;
}
declare const _default: {
    getUsersMe: ApiCall<undefined, ICurrentUserResponse>;
};
export default _default;
