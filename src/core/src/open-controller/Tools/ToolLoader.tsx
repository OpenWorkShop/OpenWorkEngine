import * as React from 'react';
import {IHaveTool} from './types';
import {IHaveWorkspace} from '../Workspaces';
import {useLazyToolLoader} from './hooks';
import Controls from './Controls';
import Applicator from './Applicator';
import Terminal from './Terminal';
import Plans from './Plans';
import Machine from './Machine';
import {AlertList} from '../../components';

type Props = IHaveTool & IHaveWorkspace;

const ToolLoader: React.FunctionComponent<Props> = (props) => {
  const { tool, workspaceId } = props;

  const p = tool.componentPath;
  if (p === 'Controls') return <Controls tool={tool} workspaceId={workspaceId} />;
  if (p === 'Applicator') return <Applicator tool={tool} workspaceId={workspaceId} />;
  if (p === 'Machine') return <Machine tool={tool} workspaceId={workspaceId} />;
  if (p === 'Plans') return <Plans tool={tool} workspaceId={workspaceId} />;
  if (p === 'Terminal') return <Terminal tool={tool} workspaceId={workspaceId} />;

  const LazyTool = useLazyToolLoader(tool);
  if (!LazyTool) return <AlertList error={{ name: tool.id, message: tool.titleKey }} />;

  return <LazyTool tool={tool} workspaceId={workspaceId} />;
  // return React.useMemo(() => <LazyTool tool={tool} workspaceId={workspaceId} />, [tool, workspaceId]);
};

export default ToolLoader;
