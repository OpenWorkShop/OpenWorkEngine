import { IOpenWorkShop } from '@openworkshop/lib';
import React from 'react';
import {OpenControllerSessionFragment} from '@openworkshop/lib/api/graphql';
import {Workspace} from '../workspaces';
import {BackendConnection} from './apollo';
import { StringMap } from 'i18next';
import {IOpenController} from './types';

// Contexts require a default value...
const msg = 'Invalid access of empty context (use MakerverseProvider).';
export class EmptyOpenController implements IOpenController {
  get ows(): IOpenWorkShop { throw new Error(msg); }

  get connection(): BackendConnection { throw new Error(msg); }

  get session(): OpenControllerSessionFragment | undefined { throw new Error(msg); }

  get workspaces(): Workspace[] { throw new Error(msg); }

  public t(key: string, opts?: StringMap) { return ''; }
}

const OpenControllerContext: React.Context<IOpenController> = React.createContext<IOpenController>(new EmptyOpenController());

export default OpenControllerContext;
