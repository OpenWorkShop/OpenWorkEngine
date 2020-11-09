function getServerUrl(env) {
    if (env === 'Development') {
        return new URL('http://dev.openwork.shop:5000');
    }
    else if (env === 'Staging') {
        return new URL('https://staging.openwork.shop');
    }
    return new URL('https://openwork.shop');
}
const defaultEnv = 'Production';
const settings = {
    environment: defaultEnv,
    url: getServerUrl(defaultEnv),
};
function getEnvironment(map) {
    const env = map ? map[window.location.hostname] : undefined;
    return env !== null && env !== void 0 ? env : defaultEnv;
}
export function loadSettings(opts) {
    var _a;
    settings.environment = (_a = opts.environment) !== null && _a !== void 0 ? _a : getEnvironment(opts.hostnameMap);
    settings.url = getServerUrl(settings.environment);
    return settings;
}
export default settings;
//# sourceMappingURL=OpenWorkShopSettings.js.map