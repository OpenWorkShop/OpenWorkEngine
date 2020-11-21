import authApi from './Identity/Auth';
import usersApi from './Identity/Users';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiCalls = Object.assign(Object.assign({}, authApi), usersApi);
export default apiCalls;
//# sourceMappingURL=index.js.map