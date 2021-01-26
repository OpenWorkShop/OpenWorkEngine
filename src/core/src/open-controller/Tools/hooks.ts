import {ITool, IToolGroup, ToolBase} from './types';
import * as React from 'react';
import ToolGroup from './ToolGroup';
import { useWorkspaceSelector} from '../Workspaces';
import {MachineCategory} from '../graphql';

// Lives as its own function so that it might be statically generated or perhaps load remote tools (?)
export function useLazyToolLoader(tool: ITool): React.LazyExoticComponent<ToolBase> | undefined {
  const p = tool.componentPath;
  if (p === 'Jogger') return React.lazy(() => import('./Jogger/Jogger'));
  if (p === 'Machine') return React.lazy(() => import('./Machine/Machine'));
  if (p === 'Plans') return React.lazy(() => import('./Plans/Plans'));
  if (p === 'Applicator') return React.lazy(() => import('./Applicator/Applicator'));
  if (p === 'Terminal') return React.lazy(() => import('./Terminal/Terminal'));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return React.lazy(() => require(`./${p}/${p}`));
}

export function getWorkspaceTools(workspaceId: string): IToolGroup[] {
  const machineCategory = useWorkspaceSelector(workspaceId, ws => ws.settings.machineCategory);
  const isCnc = machineCategory === MachineCategory.Cnc;
  return [
    new ToolGroup('Jogger', 'control-pad', 'Jogger'),
    new ToolGroup('Plans', 'blueprint', 'Plans'),
    new ToolGroup('Applicator', isCnc ? 'end-mill' : 'hot-end', 'Applicator'),
    new ToolGroup('Machine', 'machine', 'Machine'),
    new ToolGroup('Terminal', 'console', 'Terminal'),
  ];
}
