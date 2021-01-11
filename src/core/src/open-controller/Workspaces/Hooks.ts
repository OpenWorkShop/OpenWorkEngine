import {Workspace} from './types';
import { useSelector } from 'react-redux';
import {AppState} from '../redux';
import {UnitType} from '../../components/Units/types';

export function useWorkspaceIds(): string[] {
  return useSelector<AppState, string[]>(s => s.workspaces.workspaceIds);
}

export function useWorkspaceSelector<T>(workspaceId: string, sel: (workspace: Workspace) => T): T {
  return useSelector<AppState, T>((state) => {
    const workspace = state.workspaces.map[workspaceId];
    if (!workspace) throw new Error(`No workspace for: ${workspaceId}`);
    return sel(workspace);
  });
}

// Helper hook while inside a workspace to check if using imperial.
export function useWorkspaceUnits(workspaceId: string): UnitType {
  return UnitType.Metric;
}

export function useWorkspace(workspaceId: string): Workspace {
  const workspace = tryUseWorkspace(workspaceId);
  if (!workspace) throw new Error(`No workspace for: ${workspaceId}`);
  return workspace;
}

export function tryUseWorkspace(workspaceId?: string): Workspace | undefined {
  return useSelector<AppState, Workspace | undefined>(
    s => workspaceId ? s.workspaces.map[workspaceId] : undefined);
}
