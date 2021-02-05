import {ActiveState, MachineAlert} from '../graphql';

export function getActiveStateTitleKey(activeState: ActiveState): string {
  if (activeState === ActiveState.Alarm) return 'Alarm';
  if (activeState === ActiveState.IdleReady) return 'Ready';
  if (activeState === ActiveState.Run) return 'Active';
  if (activeState === ActiveState.Initializing) return 'Initializing...';
  if (activeState === ActiveState.Check) return 'Check';
  if (activeState === ActiveState.Hold) return 'Hold';
  if (activeState === ActiveState.Sleep) return 'Sleep';
  if (activeState === ActiveState.Door) return 'Door';
  if (activeState === ActiveState.Home) return 'Home';
  return 'Unknown';
}

export function getActiveStateTipKey(activeState: ActiveState): string {
  if (activeState === ActiveState.Alarm) return 'The machine has stopped and is awaiting un-lock.';
  if (activeState === ActiveState.IdleReady) return 'The machine is idle and ready for instructions.';
  if (activeState === ActiveState.Run) return 'Operation in progress.';
  if (activeState === ActiveState.Initializing) return 'Initializing...';
  if (activeState === ActiveState.Sleep) return 'Sleeping... ';
  if (activeState === ActiveState.Check) return 'Machine requires user attention.';
  if (activeState === ActiveState.Hold) return 'Hold';
  if (activeState === ActiveState.Door) return 'Door';
  if (activeState === ActiveState.Home) return 'Home';
  return 'Unknown';
}

export function getActiveStateSubTitleKey(activeState: ActiveState, alarm?: MachineAlert | null): string {
  if (alarm) return alarm.message;
  if (activeState === ActiveState.Alarm) return 'Reset to continue.';
  if (activeState === ActiveState.IdleReady) return 'Machine is idle.';
  if (activeState === ActiveState.Run) return 'Executing command(s).';
  if (activeState === ActiveState.Initializing) return 'Awaiting machine...';
  // if (activeState === ActiveState.Check) return 'Check';
  // if (activeState === ActiveState.Hold) return 'Hold';
  // if (activeState === ActiveState.Sleep) return 'Sleep';
  // if (activeState === ActiveState.Door) return 'Door';
  // if (activeState === ActiveState.Home) return 'Home';
  return '';
}