import {IWorkspace} from './types';
import { useSelector } from 'react-redux';
import {AppState} from '../redux';
import {ControlledMachineFragment, UnitType} from '../graphql';
import {IController} from '../Controllers';

export function useWorkspaceIds(): string[] {
  return useSelector<AppState, string[]>(s => s.workspaces.workspaceIds);
}

export function useWorkspaceSelector<T>(workspaceId: string, sel: (workspace: IWorkspace) => T): T {
  return useSelector<AppState, T>((state) => {
    const workspace = state.workspaces.map[workspaceId];
    if (!workspace) throw new Error(`No workspace for: ${workspaceId}`);
    return sel(workspace);
  });
}

// Helper hook while inside a workspace to check if using imperial.
export function useWorkspaceUnits(workspaceId: string): UnitType {
  return useWorkspaceSelector(workspaceId, ws =>  ws.units);
}

export function useWorkspace(workspaceId: string): IWorkspace {
  const workspace = tryUseWorkspace(workspaceId);
  if (!workspace) throw new Error(`No workspace for: ${workspaceId}`);
  return workspace;
}

export function tryUseWorkspace(workspaceId?: string): IWorkspace | undefined {
  return useSelector<AppState, IWorkspace | undefined>(
    s => workspaceId ? s.workspaces.map[workspaceId] : undefined);
}


export function tryUseWorkspaceController(workspaceId: string): IController | undefined {
  return useSelector<AppState, IController | undefined>( (state) => {
    const workspace = state.workspaces.map[workspaceId];
    const machine: ControlledMachineFragment | undefined = workspace?.port?.connection?.machine;
    if (!machine) return undefined;
    return state.controllers.controllerMap[machine.topicId];
  });
}

export function useWorkspaceControllerSelector<T>(workspaceId: string, sel: (controller: IController) => T): T {
  return useSelector<AppState, T>( (state) => {
    const workspace = state.workspaces.map[workspaceId];
    const machine: ControlledMachineFragment | undefined = workspace?.port?.connection?.machine;
    if (!machine) throw new Error(`No machine on workspace ${workspaceId}`);

    const controller = state.controllers.controllerMap[machine.topicId];
    if (!controller) throw new Error(`No controller for ${machine.topicId}`);

    return sel(controller);
  });
}
