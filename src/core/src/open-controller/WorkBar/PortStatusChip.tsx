import * as React from 'react';
import {IMaybeHavePortStatus, useSystemPorts} from '../Ports';
import {getPortIcon} from '../Ports/Ports';
import useLogger from '../../utils/logging/UseLogger';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {useTrans} from '../Context';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from '@material-ui/core';
import useStyles from './styles';
import {ActiveState, DetectedFirmwareFragment, MachineBuffer, useChangeWorkspacePortMutation} from '../graphql';
import PortSelect from '../Ports/PortSelect';
import {IHaveWorkspace, tryUseWorkspaceControllerSelector} from '../Workspaces';
import {AlertList, IAlertMessage} from '../../components';
import FirmwareComparisonTable from '../Machines/FirmwareComparisonTable';
import {getActiveStateTitleKey} from '../Controllers/ActiveState';

type Props = IMaybeHavePortStatus & IHaveWorkspace & {
  firmware?: DetectedFirmwareFragment;
}

const PortStatusChip: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(PortStatusChip);
  const t = useTrans();
  const [changeToPortName, setChangeToPortName] = React.useState('');
  const [changeWorkspacePort, changedWorkspace] = useChangeWorkspacePortMutation();
  const [error, setError] = React.useState<IAlertMessage | undefined>(undefined);
  const classes = useStyles();
  const { port, workspaceId, firmware } = props;
  const ports = useSystemPorts();
  const buffer = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status.buffer);
  const state = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status.activityState);
  const changeToPort = changeToPortName.length > 0 ? ports.portMap[changeToPortName] : undefined;
  const errors = [error, changedWorkspace.error];
  const label = getStateLabel(state, buffer);

  log.verbose(port);

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

  function getStateLabel(s?: ActiveState, b?: MachineBuffer): string {
    const ret: string[] = [];
    if (s) ret.push(t(getActiveStateTitleKey(s)));
    if (b) ret.push(getQueueLabel(b.writeQueueLength, b.responseQueueLength));
    return ret.join('');
  }

  function getQueueLabel(write: number, response: number): string {
    const num = write + (response ? 1 : 0);
    return num > 0 ? ` (${num})` : '';
  }

  function closeDialog() {
    setChangeToPortName('');
  }

  return (
    <PopoverWorkBarChip faIcon={getPortIcon(port)} label={label} >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader
          variant="h6"
          tip={t('The physical connection to your machine (i.e., USB).')}
          title={t('Serial Port')}
        />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <PortSelect
          selectedPortName={port?.portName ?? ''}
          setSelectedPortName={setChangeToPortName}
        />
      </Grid>
      {firmware && <FirmwareComparisonTable firmware={firmware} />}
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
    </PopoverWorkBarChip>
  );
};

export default PortStatusChip;
