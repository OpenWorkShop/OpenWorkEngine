import ApiCall, {IApiResponseRecord, IRecord, IApiCallState, IApiArgs} from '../ApiCall';
import { UserManager, UserManagerSettings } from 'oidc-client';

// This data could be loaded via /api/auth/config/OpenWorkShop
// However, it is more efficient to simply hardcode it.

export const DefaultClientId = 'OpenWorkShopAPI';

export interface IClientConfig extends IRecord, UserManagerSettings {}

// Response Interfaces
export interface IAuth {
  username: string;
  authenticationType: string;
}

export type ILoginResponse = IApiResponseRecord<IAuth>;

export type IClientConfigResponse = IApiResponseRecord<IClientConfig>;

// Args Interfaces
interface ILoginArgs extends IApiArgs {
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

interface IVerifyEmailArgs extends IApiArgs {
  userId: string;
  code: string;
  returnUrl: string;
}

interface IResetPasswordArgs extends IVerifyEmailArgs {
  password: string;
}

interface IClientConfigArgs extends IApiArgs {
  ClientId?: string;
}

// Api Call Subclasses
class LoginApiCall<TArgs extends ILoginArgs> extends ApiCall<
  TArgs,
  ILoginResponse
> {
  async processArgs(args: TArgs) {
    if (args.returnUrl) {
      return args;
    }
    const manager = args.ClientManager ?? args.ows.authManager;
    delete args.ClientManager;
    const requestedUrl = new URLSearchParams(window.location.search).get(
      'ReturnUrl'
    );
    args.returnUrl = requestedUrl || (await manager.createSigninRequest()).url;
    return args;
  }

  async prepare(args: TArgs) {
    const ret = await super.prepare(args);
    ret.credentials = 'include';
    return ret;
  }
}

class ConfigApiCall extends ApiCall<IClientConfigArgs, IClientConfigResponse> {
  async getEndpoint(args: IClientConfigArgs) {
    return `${await super.getEndpoint(args)}/${
      args.ClientId ?? DefaultClientId
    }`;
  }
}

// Core Exports
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

export default {
  postAuthLogin: new LoginApiCall<ILoginInternalArgs>('POST', 'auth/login'),
  postAuthRegister: new LoginApiCall<IRegisterArgs>('POST', 'auth/register'),
  postAuthSendEmail: new LoginApiCall<IUserArgs>('POST', 'auth/send/email'),
  postAuthForgot: new LoginApiCall<IForgotPasswordArgs>('POST', 'auth/forgot'),
  postAuthReset: new LoginApiCall<IResetPasswordArgs>('POST', 'auth/reset'),
  postAuthCallback: new LoginApiCall<ILoginArgs>('POST', 'auth/callback'),
  postAuthVerifyEmail: new ApiCall<IVerifyEmailArgs, ILoginResponse>(
    'POST',
    'auth/verify/email'
  ),
  getAuthConfig: new ConfigApiCall('GET', 'auth/config'),
};
