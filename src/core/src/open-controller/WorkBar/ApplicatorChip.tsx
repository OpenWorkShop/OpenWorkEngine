import React, {FunctionComponent} from 'react';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../Workspaces';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {Button, Grid} from '@material-ui/core';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './styles';
import {faFan, faMicrochip} from '@fortawesome/free-solid-svg-icons';
import FirmwareSettingsDialog from '../Tools/Machine/FirmwareSettingsDialog';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MachineModalList from '../Controllers/MachineModalList';
import {useTrans} from '../Context';

type Props = IHaveWorkspace;

const ApplicatorChip: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { workspaceId } = props;
  const settings = useWorkspaceControllerSelector(workspaceId, c => c.machine.settings);
  const modals = useWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const tip = t('Adjust common workspace settings.');

  return (
    <PopoverWorkBarChip
      label={t('{{ speed }} RPM', { speed: 0 })}
      faIcon={faFan }
    >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={tip} title={t('Machine Settings')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <MachineModalList modals={modals} workspaceId={workspaceId} />
      </Grid>
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setDialogOpen(true)}
        >
          <FontAwesomeIcon icon={faMicrochip} />
          &nbsp;
          {t('Open Firmware Settings (EEPROM)')}
        </Button>
        <FirmwareSettingsDialog
          workspaceId={workspaceId}
          settings={settings}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </Grid>
    </PopoverWorkBarChip>
  );
};

export default ApplicatorChip;
