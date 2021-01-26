import * as React from 'react';
import {IHaveTool} from './types';
import {IHaveWorkspace} from '../Workspaces';
import {useLazyToolLoader} from './hooks';

type Props = IHaveTool & IHaveWorkspace;

const ToolLoader: React.FunctionComponent<Props> = (props) => {
  const { tool, workspaceId } = props;
  const Tool = useLazyToolLoader(tool);

  if (!Tool) return <span>Missing: {tool.componentPath}</span>;


  // return <Tool tool={tool} workspaceId={workspaceId} />;
  return React.useMemo(() => <Tool tool={tool} workspaceId={workspaceId} />, [tool, workspaceId]);
};

export default ToolLoader;
