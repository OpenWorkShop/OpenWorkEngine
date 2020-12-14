import Workspace from './Workspace';

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

import WorkspaceAxis from './workspace-axis';

export type ControllerEventMap = { [key: string]: () => void };

export type WorkspaceAxisMap = { [key: string]: WorkspaceAxis };

export enum WorkspaceEventType {
  State,
}

export interface IWorkspaceEvent {
  type: WorkspaceEventType;
}
