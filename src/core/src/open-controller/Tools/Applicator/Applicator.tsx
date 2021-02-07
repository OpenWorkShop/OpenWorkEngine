import * as React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {ToolBase} from '../types';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../hooks';
import useStyles from './styles';
import OverrideControl from '../Controls/OverrideControl';
import {faArrowCircleLeft, faArrowCircleRight, faArrowsAlt, faStopCircle} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../../Context';
const Applicator: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Applicator);
  const classes = useStyles();
  const { workspaceId } = props;
  const applicator = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.applicator);
  const overrides = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.overrides);

  log.debug('[APPLICATOR]', 'status', applicator, 'overrides', overrides);

  return (
    <Grid container className={classes.root} >
    </Grid>
  );
};

export default Applicator;
