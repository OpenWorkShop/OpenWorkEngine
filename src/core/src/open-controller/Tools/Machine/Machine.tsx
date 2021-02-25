import * as React from 'react';
import {
  Button,
} from '@material-ui/core';
import {ToolBase} from '../types';
import useStyles from './styles';
import {useWorkspaceControllerSelector} from '../../Workspaces';
import {useLogger} from '../../../hooks';
import MachineModalList from '../../Controllers/MachineModalList';
import FirmwareSettingsDialog from './FirmwareSettingsDialog';
import {useTrans} from '../../Context';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Machine: ToolBase = (props) => {
  const t = useTrans();
  const log = useLogger(Machine);
  const { workspaceId } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const modals = useWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals);
  const settings = useWorkspaceControllerSelector(workspaceId, c => c.machine.settings);
  //useWorkspaceController
  //<ActiveState>(workspaceId, (c: IController) => c.machine.status.activityState);

  log.debug('[CONFIG MODALS]', modals, '[SETTINGS]', settings);

  // Modes, Movement, Reporting, Homing, Calibration

  return (
    <React.Fragment>
      <div className={classes.root}>
        <MachineModalList modals={modals} workspaceId={workspaceId} />
      </div>
      <div >
        <Button
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          <FontAwesomeIcon icon={faMicrochip} className={classes.buttonIcon} />
          {t('Open Firmware Settings (EEPROM)')}
        </Button>
      </div>
      <FirmwareSettingsDialog
        workspaceId={workspaceId}
        settings={settings}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </React.Fragment>
  );
};

export default Machine;
