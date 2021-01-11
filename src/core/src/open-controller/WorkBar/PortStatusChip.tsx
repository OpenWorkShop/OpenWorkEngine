import * as React from 'react';
import {IMaybeHavePortStatus, useSystemPorts} from '../Ports';
import {getPortIcon} from '../Ports/Ports';
import useLogger from '../../utils/logging/UseLogger';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {useTrans} from '../Context';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core';
import useStyles from './Styles';
import {ConnectedPortFragment, useChangeWorkspacePortMutation} from '../graphql';
import PortSelect from '../Ports/PortSelect';
import {IHaveWorkspace} from '../Workspaces';
import PortConnectionSteps from '../Ports/PortConnectionSteps';
import {AlertList, IAlertMessage} from '../../components';

type Props = IMaybeHavePortStatus & IHaveWorkspace;

const PortStatusChip: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(PortStatusChip);
  const t = useTrans();
  const [changeToPortName, setChangeToPortName] = React.useState('');
  const [changeWorkspacePort, changedWorkspace] = useChangeWorkspacePortMutation();
  const [error, setError] = React.useState<IAlertMessage | undefined>(undefined);
  const classes = useStyles();
  const { port, workspaceId } = props;
  const ports = useSystemPorts();
  const changeToPort = changeToPortName.length > 0 ? ports.portMap[changeToPortName] : undefined;
  const errors = [error, changedWorkspace.error];

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

  function closeDialog() {
    setChangeToPortName('');
  }

  function renderConnection(conn: ConnectedPortFragment) {
    return [
      <Grid item key="h-linesRead" xs={8} className={classes.popoverRowAlt} >
        <Typography variant="body1">{t('Lines Read')}</Typography>
      </Grid>,
      <Grid item key="linesRead" xs={4} className={classes.popoverRowAlt} style={{ textAlign: 'right' }} >
        <Typography variant="subtitle2">{conn.status.linesRead}</Typography>
      </Grid>,
      <Grid item key="h-linesWritten" xs={8} className={classes.popoverRow} >
        <Typography variant="body1">{t('Lines Written')}</Typography>
      </Grid>,
      <Grid item key="linesWritten" xs={4} className={classes.popoverRow} style={{ textAlign: 'right' }} >
        <Typography variant="subtitle2">{conn.status.linesWritten}</Typography>
      </Grid>,
    ];
  }

  return (
    <PopoverWorkBarChip faIcon={getPortIcon(port)} >
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
      {port?.connection && renderConnection(port.connection)}
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
