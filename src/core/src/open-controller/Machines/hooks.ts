import {ActiveState, MachineStatusFragment} from '../graphql';
import {useTheme} from '@material-ui/core';

export function useMachineStatusColor(machineStatus?: MachineStatusFragment, defColor?: string): string {
  const theme = useTheme();
  let col: string = defColor ?? theme.palette.background.paper;
  if (!machineStatus) return col;
  const st = machineStatus.activityState;
  if (machineStatus.alarm || st == ActiveState.Alarm) {
    col = theme.palette.error.dark;
  } else if (machineStatus.error) {
    col = theme.palette.warning.dark;
  } else if (st == ActiveState.Run || st == ActiveState.Initializing) {
    col = theme.palette.primary.light;
  } else if (st == ActiveState.IdleReady) {
    col = theme.palette.secondary.light;
  } else if (st == ActiveState.Hold || st == ActiveState.Sleep || st == ActiveState.Door || st == ActiveState.Check) {
    // User interaction required
    col = theme.palette.info.light;
  } else if (st == ActiveState.Home) {
    col = theme.palette.success.light;
  }
  return col;
}
