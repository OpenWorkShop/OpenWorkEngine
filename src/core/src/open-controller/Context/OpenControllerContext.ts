import { IOpenWorkShop } from '../../types';
import React from 'react';
import {EssentialSettingsFragment, OpenControllerSessionFragment} from '../graphql';
import { IWorkspace } from '../Workspaces';
import {IOpenController, IOpenControllerPackage} from './types';
import {BackendConnection} from '../../api';

// Contexts require a default value...
const msg = 'Invalid access of empty context (use OpenControllerProvider).';
export class EmptyOpenController implements IOpenController {
  get deployment(): IOpenControllerPackage { throw new Error(msg); }

  get ows(): IOpenWorkShop { throw new Error(msg); }

  get connection(): BackendConnection { throw new Error(msg); }

  get settings(): EssentialSettingsFragment { throw new Error(msg); }

  get session(): OpenControllerSessionFragment | undefined { throw new Error(msg); }

  get workspaces(): IWorkspace[] { throw new Error(msg); }

  public t(): string { return ''; }
}

const OpenControllerContext: React.Context<IOpenController> = React.createContext<IOpenController>(new EmptyOpenController());

export default OpenControllerContext;
