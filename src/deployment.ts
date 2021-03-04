import {IOpenWorkShop, OpenController} from './core/src';
import { parseSemver } from './core/src/utils/semvers';
import configureStore from './OpenWorkShop/App/src/store';
import {initReactI18next} from 'react-i18next';

// Used in development and for base settings.
const defaultDeployment: OpenController.IOpenControllerPackage = {
  name: 'opencontroller-dev',

  productName: '[DEV] Makerverse',

  description: '',

  homepage: 'http://makerverse.com',

  version: parseSemver('0.0.0-dev'),

  trackingId: '3920215-30',

  pathPrefix: '/',

  client: {
    client_id: 'OpenWorkShopAPI',
    redirect_uri: `${window.location.origin}/callback`, // '/account/logged-in',
    post_logout_redirect_uri: `${window.location.origin}/login`, // '/account/logged-out',
    response_type: 'code',
    scope: 'OpenWorkShopAPI openid profile',
    silent_redirect_uri: `${window.location.origin}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    monitorSession: false,
  },

  hostnameMap: {
    'dev.openwork.shop': 'Development',
    'staging.openwork.shop': 'Staging',
  },

  builder: (ows: IOpenWorkShop) => {
    return {
      i18n: ows.i18n.use(initReactI18next),
      store: configureStore(),
    };
  },

  connection: undefined,
};

export default defaultDeployment;
