import {WorkspaceState} from '../graphql';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {faUsb} from '@fortawesome/free-brands-svg-icons';
import {faDraftingCompass, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {Theme} from '@material-ui/core/styles';

export function getWorkspaceStateTextKey(st?: WorkspaceState): string {
  if (!st || st === WorkspaceState.Disconnected) return 'Disconnected';
  if (st === WorkspaceState.Closed) return 'Closed';
  if (st === WorkspaceState.Deleted) return 'Deleted';
  if (st === WorkspaceState.Error) return 'Error';
  if (st === WorkspaceState.Active) return 'Active';
  return st.toString() + '?';
}

export function getWorkspaceStateIcon(st?: WorkspaceState): IconDefinition {
  if (!st || st === WorkspaceState.Disconnected) return faUsb;
  if (st === WorkspaceState.Error || st === WorkspaceState.Deleted) return faExclamationCircle;
  if (st === WorkspaceState.Active) return faDraftingCompass;
  return faUsb;
}

export function getWorkspaceStateColor(theme: Theme, st?: WorkspaceState): string {
  if (!st || st === WorkspaceState.Disconnected) return theme.palette.grey.A400;
  if (st === WorkspaceState.Closed) return theme.palette.grey.A700;
  if (st === WorkspaceState.Error || st === WorkspaceState.Deleted) return theme.palette.error.main;
  if (st === WorkspaceState.Active) return theme.palette.secondary.dark;
  return theme.palette.secondary.dark;
}
