import {MachineLogLevel} from '../graphql';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faBug, faCog, faExclamationCircle, faExclamationTriangle, faInbox} from '@fortawesome/free-solid-svg-icons';
import {Theme} from '@material-ui/core/styles';

export const machineLogLevels = [
  MachineLogLevel.Dbg, MachineLogLevel.Cfg, MachineLogLevel.Inf, MachineLogLevel.Wrn, MachineLogLevel.Err];

export function getLogLevelTitleKey(ll: MachineLogLevel): string {
  if (ll === MachineLogLevel.Dbg) return 'Debug';
  if (ll === MachineLogLevel.Cfg) return 'Config';
  if (ll === MachineLogLevel.Inf) return 'Information';
  if (ll === MachineLogLevel.Wrn) return 'Warning';
  if (ll === MachineLogLevel.Err) return 'Error';
  return '?';
}

export function getLogLevelColor(ll: MachineLogLevel, theme: Theme): string {
  if (ll === MachineLogLevel.Dbg) return theme.palette.grey.A200;
  if (ll === MachineLogLevel.Cfg) return theme.palette.secondary.light;
  if (ll === MachineLogLevel.Inf) return theme.palette.info.light;
  if (ll === MachineLogLevel.Wrn) return theme.palette.warning.light;
  if (ll === MachineLogLevel.Err) return theme.palette.error.light;
  return theme.palette.grey.A700;
}

export function getLogLevelIcon(ll: MachineLogLevel): IconDefinition {
  if (ll === MachineLogLevel.Dbg) return faBug;
  if (ll === MachineLogLevel.Cfg) return faCog;
  if (ll === MachineLogLevel.Inf) return faInbox;
  if (ll === MachineLogLevel.Wrn) return faExclamationCircle;
  if (ll === MachineLogLevel.Err) return faExclamationTriangle;
  return faInbox;
}

export function getLogLevelNumber(ll: MachineLogLevel): number {
  return machineLogLevels.indexOf(ll);
}

