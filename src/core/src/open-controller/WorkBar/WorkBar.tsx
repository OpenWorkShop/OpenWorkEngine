import * as React from 'react';
import {
  IHaveWorkspace,
  tryUseWorkspaceController,
  tryUseWorkspaceControllerSelector,
  useWorkspaceSelector
} from '../Workspaces';
import {IMaybeHavePortStatus} from '../Ports';
import useStyles from './styles';
import {Button, ButtonGroup, Grid, Tooltip, Typography} from '@material-ui/core';
import {useTrans} from '../Context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCogs, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {IController} from '../Controllers';
import MachinePositionChip from './MachinePositionChip';
import useLogger from '../../utils/logging/UseLogger';
import ApplicatorChip from './ApplicatorChip';
import {PortState, WorkspaceState} from '../graphql';
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
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const machineStatus = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status);
  const firmware = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.firmware);
  const programMeta = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.program?.programFile?.meta);

  const isActive = workspaceState === WorkspaceState.Active;
  const isMachineReady = isActive && machineStatus;
  const portState = port?.state ?? PortState.Unplugged;
  const isUnplugged = portState === PortState.Unplugged;
  const programTitle = programMeta ? programMeta.name : t('No file loaded');
  // const bkCol = useMachineStatusColor(machineStatus);

  log.debug('draw', portState);

  return (
    <div className={classes.root} >
      <ButtonGroup
        className={classes.titleBarLeftGroup}
        color="primary"
        variant="outlined"
        orientation={orientation ?? 'horizontal'}
      >
        {isUnplugged && (
          <Tooltip title={t('Port is not plugged in')} >
            <Button
              color="primary"
              onClick={() => setSettingsOpen(true)}
            >
              <FontAwesomeIcon icon={faExclamationCircle} className={classes.error} />
            </Button>
          </Tooltip>
        )}
        {!isUnplugged && <Button onClick={() => setSettingsOpen(true)} className={classes.titleBarButton}>
          <FontAwesomeIcon icon={faCogs} size={'lg'} />
        </Button>}
      </ButtonGroup>
      <Grid container className={classes.workBarTitle} spacing={0}>
        <Grid item xs={12}>
          {isUnplugged && <Typography className={classes.workBarTitleText} color="error" variant="subtitle2">
            {t('The port "{{ portName }}" is not available for use.', { portName })}
          </Typography>}
          {isMachineReady && <Typography className={classes.workBarTitleText} variant="subtitle2">
            {programTitle}
          </Typography>}
        </Grid>
      </Grid>
      <ButtonGroup
        className={classes.titleBarRightGroup}
        color="primary"
        variant="text"
        orientation={orientation ?? 'horizontal'}
        aria-label={t('Workspace Shortcuts')}
      >
        {isMachineReady && <MachinePositionChip workspaceId={workspaceId} />}
        {isMachineReady && <ApplicatorChip workspaceId={workspaceId} />}
        {isActive && <GWizChip />}
      </ButtonGroup>
      <WorkspaceSettingsDialog
        workspaceId={workspaceId}
        port={port}
        firmware={firmware}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default WorkBar;
