import ApiCall, { IApiResponseRecord, IRecord, IApiCallState } from '../ApiCall';
import { UserManager, UserManagerSettings } from 'oidc-client';
export declare const DefaultClientId = "OpenWorkShopAPI";
export interface IClientConfig extends IRecord, UserManagerSettings {
}
export interface IAuth {
    username: string;
    authenticationType: string;
}
export declare type ILoginResponse = IApiResponseRecord<IAuth>;
export declare type IClientConfigResponse = IApiResponseRecord<IClientConfig>;
interface ILoginArgs {
    ClientManager?: UserManager;
    returnUrl?: string;
}
interface IUserArgs extends ILoginArgs {
    username: string;
}
interface ILoginInternalArgs extends IUserArgs {
    password: string;
}
interface IForgotPasswordArgs extends ILoginArgs {
    email: string;
}
interface IRegisterArgs extends ILoginInternalArgs {
    email: string;
    acceptPrivacy: boolean;
    allowMarketing: boolean;
}
interface IVerifyEmailArgs {
    userId: string;
    code: string;
    returnUrl: string;
}
interface IResetPasswordArgs extends IVerifyEmailArgs {
    password: string;
}
interface IClientConfigArgs {
    ClientId?: string;
}
declare class LoginApiCall<TArgs extends ILoginArgs> extends ApiCall<TArgs, ILoginResponse> {
    processArgs(args: TArgs): Promise<TArgs>;
    prepare(args: TArgs): Promise<RequestInit>;
}
declare class ConfigApiCall extends ApiCall<IClientConfigArgs, IClientConfigResponse> {
    getEndpoint(args: IClientConfigArgs): Promise<string>;
}
export interface IState {
    postAuthLogin: IApiCallState<ILoginResponse>;
    postAuthRegister: IApiCallState<ILoginResponse>;
    postAuthSendEmail: IApiCallState<ILoginResponse>;
    postAuthForgot: IApiCallState<ILoginResponse>;
    postAuthReset: IApiCallState<ILoginResponse>;
    postAuthCallback: IApiCallState<ILoginResponse>;
    postAuthVerifyEmail: IApiCallState<ILoginResponse>;
    getAuthConfig: IApiCallState<IClientConfigResponse>;
}
declare const _default: {
    postAuthLogin: LoginApiCall<ILoginInternalArgs>;
    postAuthRegister: LoginApiCall<IRegisterArgs>;
    postAuthSendEmail: LoginApiCall<IUserArgs>;
    postAuthForgot: LoginApiCall<IForgotPasswordArgs>;
    postAuthReset: LoginApiCall<IResetPasswordArgs>;
    postAuthCallback: LoginApiCall<ILoginArgs>;
    postAuthVerifyEmail: ApiCall<IVerifyEmailArgs, ILoginResponse>;
    getAuthConfig: ConfigApiCall;
};
export default _default;
