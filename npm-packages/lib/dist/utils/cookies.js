export const authRedirectUrl = 'authRedirectUrl';
export function setCookie(name, val) {
    const date = new Date();
    const value = val;
    // Set it expire in 30 days
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    // Set it
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
}
export function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        const ppop = parts.pop();
        if (ppop) {
            return ppop.split(';').shift();
        }
    }
}
export function deleteCookie(name) {
    const date = new Date();
    // Set it expire in -1 days
    date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}
//# sourceMappingURL=cookies.js.map