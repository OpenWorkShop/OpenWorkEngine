import {IOpenWorkShop, TTranslateFunc, HostnameMap} from '../../types';
import {OpenControllerSessionFragment} from '../graphql';
import {Workspace} from '../Workspaces';
import {BackendConnection} from '../../api';
import {ISemver} from '../../utils/semvers';
import { UserManagerSettings } from 'oidc-client';

// Can be loaded from package.json; represents the deployment context.
export interface IOpenControllerPackage {
  name: string,

  productName: string,

  pluginName?: string, // If an add-on to a main product.

  description: string,

  homepage: string,

  version: ISemver,

  trackingId: string,

  client: UserManagerSettings;

  hostnameMap?: HostnameMap;

  connection?: BackendConnection;
}

export interface IHaveOpenControllerDeployment {
  deployment: IOpenControllerPackage;
}

export interface IOpenController extends IHaveOpenControllerDeployment {
  ows: IOpenWorkShop;

  connection: BackendConnection;

  session: OpenControllerSessionFragment | undefined;

  workspaces: Workspace[];

  t: TTranslateFunc;
}

export interface IOpenControllerState {
  token?: string;
  currentWorkspaceId?: string;
}
