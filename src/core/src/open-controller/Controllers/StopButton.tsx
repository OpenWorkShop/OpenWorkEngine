import React, {FunctionComponent} from 'react';
import {ActiveState, useUnlockMachineMutation, useResetMachineMutation} from '../graphql';
import useStyles from './styles';
import {useTrans} from '../Context';
import {useLogger} from '../../Hooks';
import {Fab, Tooltip, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {IHaveWorkspace, useWorkspaceControllerSelector, useWorkspaceSelector} from '../Workspaces';

type Props = IHaveWorkspace;

const StopButton: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const t = useTrans();
  const log = useLogger(StopButton);
  const { workspaceId } = props;
  const activeState = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.activityState);
  const alarm = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.alarm);
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const [unlock] = useUnlockMachineMutation();
  const [reset] = useResetMachineMutation();
  const hasAlarm = activeState === ActiveState.Alarm || alarm;
  const isInit = !hasAlarm && activeState === ActiveState.Initializing;
  const isDisabled = isInit;

  function getAbbreviation(): string {
    if (isInit) return '...';
    return hasAlarm ? 'R' : 'E';
  }

  function getQuickActionTip(): string {
    if (isInit) return t('Talking to the machine...');
    return hasAlarm ? t('Reset (Alarm)') : t('Emergency Stop');
  }

  async function onClick(): Promise<void> {
    if (isInit) return;
    try {
      const variables = { portName: portName };
      if (hasAlarm) {
        await unlock({ variables });
      } else {
        await reset({ variables });
      }
    } catch (e) {
      log.error(e);
    }
  }

  return (
    <Tooltip title={getQuickActionTip()}>
      <Fab
        onClick={onClick}
        className={clsx(classes.controllerCardQuickActionButton, {
          [classes.emergencyButton]: !hasAlarm,
          [classes.emergencyButtonInverted]: hasAlarm,
        })}
        disabled={isDisabled}
      >
        <Typography variant="h5">
          {getAbbreviation()}
        </Typography>
      </Fab>
    </Tooltip>
  );
};

export default StopButton;
