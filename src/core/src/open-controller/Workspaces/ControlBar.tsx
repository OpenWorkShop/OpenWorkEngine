import React, { FunctionComponent } from 'react';
import {Fab, Paper, Tooltip, useTheme} from '@material-ui/core';
import {IHaveWorkspace} from './types';
import {tryUseWorkspaceController, useWorkspaceControllerSelector} from './Hooks';
import useStyles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../Context';

type Props = IHaveWorkspace;

const ControlBar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const t = useTrans();
  const { workspaceId } = props;
  const controller = tryUseWorkspaceController(workspaceId);
  const activeState = controller?.machine.status.activityState;

  return (
    <Paper className={classes.controlBar}>
      <Tooltip title={t('Halt the machine immediately (emergency stop) and re-set the connection.')}>
        <Fab size="medium" className={classes.controlBarCenterFab} >
          <FontAwesomeIcon icon={faExclamationCircle} size={'lg'} color={theme.palette.error.dark}/>
        </Fab>
      </Tooltip>
      {activeState}
    </Paper>
  );
};

export default ControlBar;
