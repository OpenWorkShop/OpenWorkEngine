import * as React from 'react';
import {Grid} from '@material-ui/core';
import {ToolBase} from '../types';
import useStyles from './Styles';
import {ActiveState} from '../../graphql';

const Machine: ToolBase = (props) => {
  const { workspaceId } = props;
  const classes = useStyles();
  const activityState: ActiveState = ActiveState.Alarm;
  //useWorkspaceController
  //<ActiveState>(workspaceId, (c: IController) => c.machine.status.activityState);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {activityState.toString()}
      </Grid>

    </Grid>
  );
};

export default Machine;
