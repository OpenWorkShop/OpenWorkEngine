import * as React from 'react';
import {IHaveWorkspace} from './types';
import useLogger from '../../utils/logging/UseLogger';
import PortStatus from '../Ports/PortStatus';
import {IMaybeHavePortStatus} from '../Ports';
import {WorkspaceState} from '../graphql';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTheme} from '@material-ui/core';
import {useTrans, useWorkspaceEvent} from '../Context';
import {WorkspaceEventType} from './types';
import {getWorkspaceStateColor, getWorkspaceStateIcon, getWorkspaceStateTextKey} from './WorkspaceState';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
  hideText?: boolean,
}

const WorkspaceStatus: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceStatus);
  const { workspace, port, hideText } = props;
  const st = workspace.state;
  const theme = useTheme();

  useWorkspaceEvent(workspace, WorkspaceEventType.State);

  if (st === WorkspaceState.Opening) return <PortStatus port={port} />;
  log.verbose('status');

  return (
    <React.Fragment >
      <FontAwesomeIcon
        color={getWorkspaceStateColor(theme, st)}
        icon={getWorkspaceStateIcon(st)}
        style={{ marginRight: theme.spacing(0.5) }}
      />
      {!hideText && <span>
        {t(getWorkspaceStateTextKey())}
      </span>}
    </React.Fragment>
  );
};

export default WorkspaceStatus;
