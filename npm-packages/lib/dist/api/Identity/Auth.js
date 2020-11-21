import { __awaiter } from "tslib";
import ApiCall from '../ApiCall';
// This data could be loaded via /api/auth/config/OpenWorkShop
// However, it is more efficient to simply hardcode it.
export const DefaultClientId = 'OpenWorkShopAPI';
// Api Call Subclasses
class LoginApiCall extends ApiCall {
    processArgs(args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (args.returnUrl) {
                return args;
            }
            const manager = (_a = args.ClientManager) !== null && _a !== void 0 ? _a : args.ows.authManager;
            delete args.ClientManager;
            const requestedUrl = new URLSearchParams(window.location.search).get('ReturnUrl');
            args.returnUrl = requestedUrl || (yield manager.createSigninRequest()).url;
            return args;
        });
    }
    prepare(args) {
        const _super = Object.create(null, {
            prepare: { get: () => super.prepare }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const ret = yield _super.prepare.call(this, args);
            ret.credentials = 'include';
            return ret;
        });
    }
}
class ConfigApiCall extends ApiCall {
    getEndpoint(args) {
        const _super = Object.create(null, {
            getEndpoint: { get: () => super.getEndpoint }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return `${yield _super.getEndpoint.call(this, args)}/${(_a = args.ClientId) !== null && _a !== void 0 ? _a : DefaultClientId}`;
        });
    }
}
export default {
    postAuthLogin: new LoginApiCall('POST', 'auth/login'),
    postAuthRegister: new LoginApiCall('POST', 'auth/register'),
    postAuthSendEmail: new LoginApiCall('POST', 'auth/send/email'),
    postAuthForgot: new LoginApiCall('POST', 'auth/forgot'),
    postAuthReset: new LoginApiCall('POST', 'auth/reset'),
    postAuthCallback: new LoginApiCall('POST', 'auth/callback'),
    postAuthVerifyEmail: new ApiCall('POST', 'auth/verify/email'),
    getAuthConfig: new ConfigApiCall('GET', 'auth/config'),
};
//# sourceMappingURL=Auth.js.map