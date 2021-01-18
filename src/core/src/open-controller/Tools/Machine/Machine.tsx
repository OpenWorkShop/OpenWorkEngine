import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import useStyles from './styles';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../Hooks';
import MachineModals from './MachineModals';

const Machine: ToolBase = (props) => {
  const log = useLogger(Machine);
  const { workspaceId } = props;
  const classes = useStyles();
  const modals = useWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals);
  //useWorkspaceController
  //<ActiveState>(workspaceId, (c: IController) => c.machine.status.activityState);

  log.debug('[CONFIG MODALS]', modals);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MachineModals workspaceId={workspaceId} />
      </Grid>
    </Grid>
  );
};

export default Machine;
