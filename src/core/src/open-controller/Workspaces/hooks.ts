import {IWorkspace, IWorkspaceFeature} from './types';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import {ControlledMachineFragment, UnitType} from '../graphql';
import {IController} from '../Controllers';
import {faLink} from '@fortawesome/free-solid-svg-icons';
import {mm2in} from '../../components/Units';

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
  const units = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals.units);
  const preferImperial = useWorkspaceSelector(workspaceId, ws => ws.settings.preferImperial);
  if (units) return units.data;
  return preferImperial ? UnitType.Imperial : UnitType.Metric;
}

export function convertUnits(displayUnitType: UnitType, ...units: number[]): number[] {
  if (displayUnitType === UnitType.Metric) return units;
  return units.map(mm2in);
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


export function tryUseWorkspaceControllerSelector<T>(workspaceId: string, sel: (controller: IController) => T): T | undefined {
  return useSelector<AppState, T | undefined>( (state) => {
    const workspace = state.workspaces.map[workspaceId];

    const machine: ControlledMachineFragment | undefined = workspace?.port?.connection?.machine;
    if (!machine) return undefined;

    const controller = state.controllers.controllerMap[machine.topicId];
    if (!controller) return undefined;

    return sel(controller);
  });
}

export function tryUseWorkspaceController(workspaceId: string): IController | undefined {
  return tryUseWorkspaceControllerSelector(workspaceId, (c) => c);
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
export function useWorkspaceFeature(workspaceId: string, key: string, def: IWorkspaceFeature): IWorkspaceFeature {
  const f = useWorkspaceSelector(workspaceId, ws => ws.settings.features.find(f => f.key === key));
  if (!f) return def;
  const icon = f.icon === 'fa-link' ? faLink : undefined;
  return { icon, title: f.title ?? def.title, disabled: f.disabled ?? false };
}
