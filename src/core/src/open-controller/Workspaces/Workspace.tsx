import * as React from 'react';
import {useTrans} from '../Context';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import {Tooltip, Fab, useTheme, Grid, Paper} from '@material-ui/core';
import useStyles from './Styles';
import {IHavePortStatus} from '../Ports';
import GWiz  from '../GWiz';
import {useParams} from 'react-router-dom';
import useLogger from '../../utils/logging/UseLogger';
import {IHaveWorkspace} from './types';
import {useWorkspaceSelector} from './Hooks';
import ControlBar from './ControlBar';
import WorkBar from '../WorkBar';

type Props = IHaveWorkspace & IHavePortStatus;

interface IParams {
  selectedToolGroupId?: string;
}

const Workspace: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(Workspace);
  const {workspaceId, port} = props;

  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes);
  const classes = useStyles();
  const params = useParams<IParams>();
  const {selectedToolGroupId} = params;

  log.debug('render workspace', workspaceId, port, axes, params);

  return (
    <Grid container className={classes.visualizer} >
      <Grid item xs={12} className={classes.topBar}>
        <WorkBar workspaceId={workspaceId} port={port} />
      </Grid>
      <Grid container className={classes.bottomBar} >
        <Grid item xs={1} md={2} lg={5} />
        <Grid item xs={12} md={8} lg={2} >
          <ControlBar workspaceId={workspaceId} />
        </Grid>
        <Grid item xs={1} md={2} lg={5} />
      </Grid>
      <Grid item xs={12} className={ classes.visualizerWrapper} >
        <GWiz id={workspaceId} className={classes.visualizer} axes={axes} />
      </Grid>
      <ToolBar workspaceId={workspaceId} selectedToolGroupId={selectedToolGroupId}/>
    </Grid>
  );
};

export default Workspace;
