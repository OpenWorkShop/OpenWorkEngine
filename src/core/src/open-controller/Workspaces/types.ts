import {
  AlertError,
  WorkspacePortConnectionFragment,
  WorkspaceFullSettingsFragment,
  WorkspaceState, UnitType
} from '../graphql';

export interface IWorkspace {
  id: string;
  portName: string;
  state: WorkspaceState;
  units: UnitType;
  error?: AlertError | null;
  settings: WorkspaceFullSettingsFragment;
  port?: WorkspacePortConnectionFragment | null;
}

export interface IHaveWorkspaceId {
  workspaceId: string;
}

export interface IMaybeHaveWorkspace {
  workspaceId?: string;
}

export interface IHaveWorkspace {
  workspaceId: string;
}

export interface IWorkspaceSettingsTab {
  key: string;

  title: string;

  component: React.ReactNode,
}

export type WorkspacesMap = { [key: string]: IWorkspace };

export type WorkspacesState = {
  map: WorkspacesMap;
  workspaceIds: string[];
};

export type ControllerEventMap = { [key: string]: () => void };
//
// export enum WorkspaceEventType {
//   State,
// }
//
// export interface IWorkspaceEvent {
//   type: WorkspaceEventType;
// }
