import React, {FunctionComponent} from 'react';
import {ActiveState, useResetMachineMutation, useUnlockMachineMutation} from '../graphql';
import useStyles from './styles';
import {useTrans} from '../Context';
import {useLogger} from '../../hooks';
import {Fab, Tooltip, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../Workspaces';
import {useControllerCommand} from './hooks';

type Props = IHaveWorkspace;


const StopButton: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const t = useTrans();
  const log = useLogger(StopButton);
  const { workspaceId } = props;
  const variables = { workspaceId };
  const activeState = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.activityState);
  const alarm = useWorkspaceControllerSelector(workspaceId, c => c.machine.status.alarm);

  const [unlockMutation, unlockResult] = useControllerCommand(workspaceId, useUnlockMachineMutation());
  const [resetMutation, resetResult] = useControllerCommand(workspaceId, useResetMachineMutation());

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
    await (hasAlarm ? unlockMutation({ variables }) : resetMutation({ variables }));
  }

  if (unlockResult.error) log.warn('unlockResult command error', unlockResult.error);
  if (resetResult.error) log.warn('unlockResult command error', unlockResult.error);

  return (
    <Fab
      onClick={onClick}
      className={clsx(classes.controllerCardQuickActionButton, {
        [classes.emergencyButton]: !hasAlarm,
        [classes.emergencyButtonInverted]: hasAlarm,
      })}
      disabled={isDisabled}
    >
      <Tooltip title={getQuickActionTip()}>
        <Typography variant="h5">
          {getAbbreviation()}
        </Typography>
      </Tooltip>
    </Fab>
  );
};

export default StopButton;
