import Workspace from './Workspace';
import {IMachineAxis} from '../Machines';

export interface IHaveWorkspaceId {
  workspaceId: string;
}

export interface IMaybeHaveWorkspace {
  workspace?: Workspace;
}

export interface IHaveWorkspace {
  workspace: Workspace;
}

export interface IWorkspaceSettingsTab {
  key: string;

  title: string;

  component: React.ReactNode,
}

export type ControllerEventMap = { [key: string]: () => void };

export type WorkspaceAxisMap = { [key: string]: IMachineAxis };

export enum WorkspaceEventType {
  State,
}

export interface IWorkspaceEvent {
  type: WorkspaceEventType;
}
