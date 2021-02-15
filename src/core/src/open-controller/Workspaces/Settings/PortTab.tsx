import React, { FunctionComponent } from 'react';
import {IHaveWorkspace} from '../types';
import {DetectedFirmwareFragment, useChangeWorkspacePortMutation} from '../../graphql';
import {AlertList, IAlertMessage} from '../../../components';
import {useLogger} from '../../../hooks';
import useStyles from '../styles';
import {IMaybeHavePortStatus, useSystemPorts} from '../../Ports';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper, Typography
} from '@material-ui/core';
import HelpfulHeader from '../../../components/Text/HelpfulHeader';
import PortSelect from '../../Ports/PortSelect';
import FirmwareComparisonTable from '../../Machines/FirmwareComparisonTable';
import PopoverWorkBarChip from '../../WorkBar/PopoverWorkBarChip';
import {useTrans} from '../../Context';
import {useWorkspaceSelector} from '../hooks';

type Props = IHaveWorkspace & IMaybeHavePortStatus & {
  firmware?: DetectedFirmwareFragment;
}

const PortTab: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(PortTab);
  const { workspaceId, port, firmware } = props;
  const [changeToPortName, setChangeToPortName] = React.useState('');
  const portName = useWorkspaceSelector(workspaceId, ws => ws.portName);
  const [changeWorkspacePort, changedWorkspace] = useChangeWorkspacePortMutation();
  const [error, setError] = React.useState<IAlertMessage | undefined>(undefined);
  const classes = useStyles();
  const ports = useSystemPorts();
  const changeToPort = changeToPortName.length > 0 ? ports.portMap[changeToPortName] : undefined;
  const errors = [error, changedWorkspace.error];

  async function changePort() {
    log.debug('[PORT] change', changeToPortName);
    setError(undefined);
    try {
      const vars = { workspaceId, portName: changeToPortName };
      closeDialog();
      await changeWorkspacePort({ variables: vars });
      log.debug('[PORT] changed.');
    } catch (e) {
      setError(e);
    }
  }

  function closeDialog() {
    setChangeToPortName('');
  }

  return (<Grid container spacing={2}>
    <Grid item xs={12} >
      <Paper className={classes.paper}>
        <HelpfulHeader
          variant="h6"
          tip={t('The physical connection to your machine (i.e., USB).')}
          title={t('Serial Port')}
        />
        <br />
        <PortSelect
          selectedPortName={port?.portName ?? ''}
          setSelectedPortName={setChangeToPortName}
        />
      </Paper>
    </Grid>
    <Grid item xs={12} >
      <Paper className={classes.paper}>
        {firmware && <FirmwareComparisonTable firmware={firmware} />}
        {!firmware && <AlertList error={{
          name: t('Port') ,
          message: t('The port "{{ portName }}" is not available for use.', { portName })
        }} /> }
      </Paper>
    </Grid>
    <Dialog
      open={!!changeToPort}
      onClose={closeDialog}
    >
      <DialogTitle >
        {t('Are you Sure?')}
      </DialogTitle>
      <DialogContent>
        <AlertList errors={errors} />
        <DialogContentText>
          {t('The same machine must be available on the new port.')}
        </DialogContentText>
      </DialogContent>
      {!changedWorkspace.loading && <DialogActions>
        <Button onClick={closeDialog}>{t('No')}</Button>
        <Button onClick={changePort} autoFocus>{t('Yes')}</Button>
      </DialogActions>}
    </Dialog>
  </Grid>);
};

export default PortTab;
