import {ITool, IToolGroup, ToolBase} from './types';
import * as React from 'react';
import ToolGroup from './ToolGroup';

// Lives as its own function so that it might be statically generated or perhaps load remote tools (?)
export function useLazyToolLoader(tool: ITool): React.LazyExoticComponent<ToolBase> | undefined {
  const p = tool.componentPath;
  if (p === 'AxisJoggerPad') return React.lazy(() => import('./AxisJoggerPad/AxisJoggerPad'));
  if (p === 'Machine') return React.lazy(() => import('./Machine/Machine'));
  if (p === 'Plans') return React.lazy(() => import('./Plans/Plans'));
  if (p === 'Applicator') return React.lazy(() => import('./Applicator/Applicator'));
  if (p === 'Terminal') return React.lazy(() => import('./Terminal/Terminal'));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return React.lazy(() => require(`./${p}/${p}`));
}

export function getWorkspaceTools(workspaceId: string): IToolGroup[] {
  console.log('workspaceId', workspaceId);
  return [
    new ToolGroup('Controls', 'control-pad', 'AxisJoggerPad'),
    new ToolGroup('Plans', 'blueprint', 'Plans'),
    new ToolGroup('Applicator', 'end-mill', 'Applicator'),
    new ToolGroup('Machine', 'machine', 'Machine'),
    new ToolGroup('Terminal', 'console', 'Terminal'),
  ];
}
