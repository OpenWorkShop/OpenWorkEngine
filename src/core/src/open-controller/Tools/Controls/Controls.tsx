import React, { FunctionComponent } from 'react';
import {ToolBase} from '../types';
import {Grid} from '@material-ui/core';
import Jogger from './Jogger';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../hooks';
import useStyles from './styles';
import {useTrans} from '../../Context';

const Controls: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Controls);
  const classes = useStyles();
  const { tool, workspaceId } = props;
  const applicator = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);
  const overrides = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.overrides);

  log.debug('render', tool, workspaceId);

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <Jogger tool={tool} workspaceId={workspaceId} />
    </Grid>
    <Grid item xs={12} className={classes.dialogFooter}>
      Movement Options...
    </Grid>
  </Grid>;
};

export default Controls;
