import * as React from 'react';
import {IHaveWorkspace, tryUseWorkspaceController, useWorkspaceSelector} from '../Workspaces';
import {IMaybeHavePortStatus} from '../Ports';
import useStyles from './styles';
import {Button, ButtonGroup, Tooltip} from '@material-ui/core';
import {useTrans} from '../Context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {IController} from '../Controllers';
import MachinePositionChip from './MachinePositionChip';
import useLogger from '../../utils/logging/UseLogger';
import WorkspaceChip from './WorkspaceChip';
import PortStatusChip from './PortStatusChip';
import {
  PortState,
  WorkspaceState
} from '../graphql';
import GWizChip from './GWizChip';
import WorkspaceSettingsDialog from '../Workspaces/WorkspaceSettingsDialog';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
  orientation?: 'horizontal' | 'vertical';
}

const WorkBar: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const log = useLogger(WorkBar);
  const t = useTrans();
  const [ settingsOpen, setSettingsOpen ] = React.useState<boolean>(false);
  const { workspaceId, port, orientation } = props;
  const workspaceState = useWorkspaceSelector(workspaceId, ws => ws.state);
  const controller: IController | undefined = tryUseWorkspaceController(workspaceId);
  const machine = controller?.machine;
  const machineStatus = machine?.status;
  const firmware = machine?.configuration.firmware;
  const isActive = workspaceState === WorkspaceState.Active;
  const portState = port?.state ?? PortState.Unplugged;
  // const bkCol = useMachineStatusColor(machineStatus);

  log.verbose('draw');

  return (
    <div className={classes.root} >
      <ButtonGroup
        className={classes.titleBarRightGroup}
        color="primary"
        variant="outlined"
        orientation={orientation ?? 'horizontal'}
      >
        <Button onClick={() => setSettingsOpen(true)} className={classes.titleBarButton}>
          <FontAwesomeIcon icon={faCogs} size={'lg'} />
        </Button>
      </ButtonGroup>
      <ButtonGroup
        className={classes.titleBarButtonGroup}
        color="primary"
        variant="text"
        orientation={orientation ?? 'horizontal'}
        aria-label={t('Workspace Shortcuts')}
      >
        <PortStatusChip port={port} workspaceId={workspaceId} firmware={firmware} />
        {portState === PortState.Unplugged && (
          <Tooltip title={t('Port is not plugged in')} >
            <Button
              color="primary"
            >
              <FontAwesomeIcon icon={faExclamationCircle} className={classes.error} />
            </Button>
          </Tooltip>
        )}
        {isActive && <GWizChip />}
        {isActive && machineStatus && <MachinePositionChip positionType="machine" workspaceId={workspaceId} />}
      </ButtonGroup>
      <WorkspaceSettingsDialog
        workspaceId={workspaceId}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default WorkBar;
