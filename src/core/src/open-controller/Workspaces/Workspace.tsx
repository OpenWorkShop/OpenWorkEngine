import * as React from 'react';
import {Grid} from '@material-ui/core';
import useStyles from './styles';
import {IHavePortStatus} from '../Ports';
import GWiz from '../GWiz';
import useLogger from '../../utils/logging/UseLogger';
import {IHaveWorkspace} from './types';
import {tryUseWorkspaceControllerSelector, useWorkspaceSelector} from './hooks';
import WorkBar from '../WorkBar';
import ControllerCard from '../Controllers/ControllerCard';

type Props = IHaveWorkspace & IHavePortStatus;

const Workspace: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(Workspace);
  const {workspaceId, port} = props;

  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);
  const controllerTopic = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.topicId);
  const classes = useStyles();

  log.debug('render workspace', workspaceId, port, axes);

  return (
    <Grid container className={classes.workspace} >
      <Grid item xs={12} className={classes.topBar}>
        <WorkBar workspaceId={workspaceId} port={port} />
      </Grid>
      <Grid item xs={12}>
        {controllerTopic && <ControllerCard workspaceId={workspaceId} />}
        <GWiz workspaceId={workspaceId} className={classes.visualizer} axes={axes} />
      </Grid>
    </Grid>
  );
};

export default Workspace;
