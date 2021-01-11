import {IToolGroup} from '../Tools';
import {Workspace} from './types';
import ToolGroup from '../Tools/ToolGroup';

export function getWorkspaceTools(workspace: Workspace): IToolGroup[] {
  return [
    new ToolGroup('Plans', 'blueprint', 'Plans'),
    new ToolGroup('Controls', 'control-pad', 'AxisJoggerPad'),
    new ToolGroup('Machine', 'machine', 'Machine'),
    new ToolGroup('Console', 'console', 'Console'),
  ];
}
