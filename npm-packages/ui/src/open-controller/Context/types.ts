import {IOpenWorkShop, TTranslateFunc} from '@openworkshop/lib';
import {OpenControllerSessionFragment} from '@openworkshop/lib/api/graphql';
import {Workspace} from '../Workspaces';
import {BackendConnection} from './apollo';

export interface IOpenController {
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

