import { OpenController } from './core/src';
import { parseSemver } from './core/src/utils/semvers';

// Used in development and for base settings.
const defaultDeployment: OpenController.IOpenControllerPackage = {
  name: 'mv-dev',

  productName: '[DEV] Makerverse',

  description: '',

  homepage: 'http://makervers.com',

  version: parseSemver('0.0.0-dev'),

  trackingId: '3920215-30',

  client: {
    client_id: 'Makerverse',
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/login`,
    response_type: 'code',
    scope: 'OpenWorkShopAPI openid profile',
    silent_redirect_uri: `${window.location.origin}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: false,
  },

  hostnameMap: {
    'dev.makerverse': 'Development',
    'staging.makerverse': 'Staging',
  },

  connection: undefined,
};

export default defaultDeployment;
