import * as React from 'react';
import {IHaveWorkspace} from '../Workspaces';
import {IMaybeHavePortStatus} from '../Ports';
import useStyles from './Styles';
import {Button, ButtonGroup, Tooltip} from '@material-ui/core';
import {useTrans} from '../Context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {IMaybeHaveController} from '../Controllers';
import MachinePositionChip from './MachinePositionChip';
import useLogger from '../../utils/logging/UseLogger';
import WorkspaceChip from './WorkspaceChip';
import PortStatusChip from './PortStatusChip';
import {PortState, WorkspaceState} from '../graphql';
import FirmwareChip from './FirmwareChip';
import GWizChip from './GWizChip';
import WorkspaceSettingsDialog from '../Workspaces/WorkspaceSettingsDialog';

type Props = IHaveWorkspace & IMaybeHavePortStatus & IMaybeHaveController & {
  orientation?: 'horizontal' | 'vertical';
}

const WorkBar: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const log = useLogger(WorkBar);
  const t = useTrans();
  const [ settingsOpen, setSettingsOpen ] = React.useState<boolean>(false);
  const { workspace, controller, port, orientation } = props;
  const machineState = controller?.machine.state;
  const fwRequirement = controller?.machine.firmwareRequirement;
  const fwDetected = controller?.machine.configuration.firmware;
  const machinePosition = machineState ? machineState.machinePosition : undefined;
  const workPosition = machineState ? machineState.workPosition : undefined;
  const portState = port?.state ?? PortState.Unplugged;

  log.debug('draw');

  return (
    <div className={classes.root}>
      <ButtonGroup
        className={classes.titleBarButtonGroup}
        color="primary"
        variant="text"
        orientation={orientation ?? 'horizontal'}
        aria-label={t('Workspace Shortcuts')}
      >
        <Button onClick={() => setSettingsOpen(true)} className={classes.titleBarButton}>
          <FontAwesomeIcon icon={faCogs} size={'lg'} />
        </Button>
        <PortStatusChip port={port} workspace={workspace} />
        {portState === PortState.Unplugged && (
          <Tooltip title={t('Port is not plugged in')} >
            <Button
              color="primary"
            >
              <FontAwesomeIcon icon={faExclamationCircle} className={classes.error} />
            </Button>
          </Tooltip>
        )}
        {fwDetected && <FirmwareChip detectedFirmware={fwDetected} requiredFirmware={fwRequirement} />}
        {machinePosition && <MachinePositionChip positionType="machine" position={machinePosition} />}
        {workPosition && <MachinePositionChip positionType="work" position={workPosition} />}
        {workspace.state === WorkspaceState.Active && <WorkspaceChip workspace={workspace} />}
        {workspace.state === WorkspaceState.Active && <GWizChip />}
      </ButtonGroup>
      <WorkspaceSettingsDialog
        workspace={workspace}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default WorkBar;