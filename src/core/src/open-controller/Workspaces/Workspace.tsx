import * as React from 'react';
import ToolBar from './ToolBar';
import { Grid  } from '@material-ui/core';
import useStyles from './Styles';
import {IHavePortStatus} from '../Ports';
import GWiz  from '../GWiz';
import {useParams} from 'react-router-dom';
import useLogger from '../../utils/logging/UseLogger';
import {IHaveWorkspace} from './types';
import {useWorkspaceSelector} from './Hooks';
import WorkBar from '../WorkBar';
import ControllerCard from '../Controllers/ControllerCard';

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
      <Grid item xs={12}>
        <GWiz id={workspaceId} className={classes.visualizer} axes={axes} />
      </Grid>
      <ControllerCard workspaceId={workspaceId} />
      <ToolBar workspaceId={workspaceId} selectedToolGroupId={selectedToolGroupId}/>
    </Grid>
  );
};

export default Workspace;
