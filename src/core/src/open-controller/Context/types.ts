import React from 'react';
import {HostnameMap, IOpenWorkShop, TTranslateFunc} from '../../types';
import {EssentialSettingsFragment, OpenControllerSessionFragment} from '../graphql';
import {BackendConnection} from '../../api';
import {ISemver} from '../../utils/semvers';
import {UserManagerSettings} from 'oidc-client';

// Can be loaded from package.json; represents the deployment context.
export interface IOpenControllerPackage {
  name: string,

  productName: string,

  pluginName?: string, // If an add-on to a main product.

  description: string,

  homepage: string,

  version: ISemver,

  trackingId: string,

  pathPrefix: string,

  client: UserManagerSettings;

  hostnameMap?: HostnameMap;

  connection?: BackendConnection;
}

export interface ILazyRender {
  childRenderer?: (ows: IOpenWorkShop, oc: IOpenController) => React.ReactNode;
}

export interface IHaveOpenControllerDeployment extends ILazyRender {
  deployment: IOpenControllerPackage;
}

export interface IOpenController extends IHaveOpenControllerDeployment {
  ows: IOpenWorkShop;

  connection: BackendConnection;

  session: OpenControllerSessionFragment | undefined;

  settings: EssentialSettingsFragment | undefined;

  t: TTranslateFunc;
}

export interface IOpenControllerState {
  token?: string;
  currentWorkspaceId?: string;
}

