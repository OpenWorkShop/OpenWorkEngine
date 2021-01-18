import React, { FunctionComponent } from 'react';
import {Fab, Grid, Tooltip, Typography, useTheme} from '@material-ui/core';
import {tryUseWorkspaceController, IHaveWorkspace} from '../Workspaces';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../Context';

type Props = IHaveWorkspace;

const ControlBar: FunctionComponent<Props> = (props) => {
  const theme = useTheme();
  const t = useTrans();
  const { workspaceId } = props;
  const controller = tryUseWorkspaceController(workspaceId);
  const activeState = controller?.machine.status.activityState;

  return (
    <Grid container>
      <Grid item xs={2}>
        <Tooltip title={t('Halt the machine immediately (emergency stop) and re-set the connection.')}>
          <Fab size="medium"  >
            <FontAwesomeIcon icon={faExclamationCircle} color={theme.palette.error.dark}/>
          </Fab>
        </Tooltip>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h5">
          {activeState}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        aoeu
      </Grid>
    </Grid>
  );
};

export default ControlBar;
