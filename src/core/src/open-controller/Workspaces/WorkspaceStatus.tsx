import * as React from 'react';
import {IHaveWorkspace} from './types';
import useLogger from '../../utils/logging/UseLogger';
import PortStatus from '../Ports/PortStatus';
import {IMaybeHavePortStatus} from '../Ports';
import {WorkspaceState} from '../graphql';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTheme} from '@material-ui/core';
import {useTrans} from '../Context';
import {getWorkspaceStateColor, getWorkspaceStateIcon, getWorkspaceStateTextKey} from './WorkspaceState';
import {useWorkspaceSelector} from './hooks';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
  hideText?: boolean,
}

const WorkspaceStatus: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(WorkspaceStatus);
  const { workspaceId, port, hideText } = props;
  const workspaceState = useWorkspaceSelector(workspaceId, ws => ws.state);
  const theme = useTheme();

  if (workspaceState === WorkspaceState.Opening) return <PortStatus port={port} />;
  log.verbose('status');

  return (
    <React.Fragment >
      <FontAwesomeIcon
        color={getWorkspaceStateColor(theme, workspaceState)}
        icon={getWorkspaceStateIcon(workspaceState)}
        style={{ marginRight: theme.spacing(0.5) }}
      />
      {!hideText && <span>
        {t(getWorkspaceStateTextKey(workspaceState))}
      </span>}
    </React.Fragment>
  );
};

export default WorkspaceStatus;
