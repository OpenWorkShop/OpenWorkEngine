import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlug, faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {Fab, FormControl, Grid, Modal, Paper, Typography} from '@material-ui/core';
import {ICustomizedMachine} from '../Machines';
import useLogger from '../../utils/logging/UseLogger';
import React, {FunctionComponent} from 'react';
import {AlertList, HoverHelpStep} from '../../components/Alerts';
import {
  FirmwareRequirementInput,
  MutationOpenPortArgs,
  PortState,
  SerialPortOptionsInput,
  useClosePortMutation,
  useOpenPortMutation
} from '../graphql';
import PortSelect from './PortSelect';
import {useSystemPorts} from '../Ports';
import useStyles from './styles';
import PortConnectionSteps from './PortConnectionSteps';
import {useTrans} from '../Context';

interface OwnProps {
  machine: ICustomizedMachine;
  onConnected: () => void;
  selectedPortName: string;
  // Omitting a port name setter implies that the component may not change ports, and thus no selector.
  // (button-only).
  setSelectedPortName: ((portName: string) => void) | null;
}

type Props = OwnProps;

const OpenMachinePort: FunctionComponent<Props> = (props) => {
  const log = useLogger(OpenMachinePort);
  const t = useTrans();
  const classes = useStyles();
  const portCollection = useSystemPorts();
  const [openPort, openedPort] = useOpenPortMutation();
  const [closePort, closedPort] = useClosePortMutation();
  const { machine, onConnected, selectedPortName, setSelectedPortName } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  const port = portCollection.portMap[selectedPortName];
  const isConnected = port && port.connection;
  const isConnecting = port && port.state === PortState.Opening;
  const isActive = port && port.state === PortState.Active;
  const canConnect = machine && port && !isConnected && !isConnecting;
  const errors = [openedPort.error, closedPort.error, port?.error];

  async function onPressConnect() {
    // TODO: These may need to be configurable...
    const opts: SerialPortOptionsInput = {
      baudRate: machine.firmware.baudRate as number,
      dataBits: null,
      handshake: null,
      parity: null,
      readBufferSize: null,
      readTimeout: null,
      rtsEnable: machine.firmware.rtscts,
      stopBits: null,
      writeBufferSize: null,
      writeTimeout: null,
    };

    const fw: FirmwareRequirementInput = {
      name: machine.firmware.name ?? null,
      edition: machine.firmware.edition ?? null,
      requiredVersion: machine.firmware.requiredVersion ? machine.firmware.requiredVersion as number : 0,
      suggestedVersion: machine.firmware.suggestedVersion ? machine.firmware.suggestedVersion as number : 0,
      helpUrl: machine.firmware.helpUrl ?? null,
      downloadUrl: machine.firmware.downloadUrl ?? null,
      controllerType: machine.firmware.controllerType,
    };

    const args: MutationOpenPortArgs = {
      portName: selectedPortName,
      firmware: fw,
      options: opts,
    };
    log.debug('opening port...', args);
    try {
      await openPort({variables: args});
    } catch (e) {
      log.error(e, 'failed to open port');
    }
  }

  async function onPressDisconnect() {
    log.debug('closing port', port.portName);
    try {
      await closePort({ variables: { portName: port.portName }});
    } catch (e) {
      log.error(e, 'disconnection error');
    }
  }

  async function onPressCancel() {
    await onPressDisconnect();
  }

  React.useEffect(() => {
    if (isActive) {
      log.debug('Connection now active; finalize workspace.');
      onConnected();
    }
  }, [isActive, setModalOpen]);

  async function closeModal() {
    await onPressDisconnect();
    setModalOpen(false);
  }

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography variant='h5'>
            {t('Connect to your Machine\'s Port')}

            <HoverHelpStep
              tip={t('Makerverse will attempt to communicate with the device via the port, testing to see if it' +
                ' understands the output.')}
              isComplete={false}
            />
          </Typography>
          <Typography variant='body2'>
            {t('The port is the physical connection on the Makerverse host (e.g., USB).')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ minHeight: 60, paddingTop: 0, marginTop: 0 }} >
          <PortConnectionSteps port={port} />
        </Grid>
        <Grid item xs={12} md={6} className={classes.portSelectItem} style={{ textAlign: 'center' }} >
          {setSelectedPortName && <React.Fragment>
            <PortSelect
              selectedPortName={selectedPortName}
              setSelectedPortName={setSelectedPortName}
            />
          </React.Fragment>}
          {!isConnected && <FormControl
            className={classes.formControl}
          >
            <Fab
              color='primary'
              type='submit'
              variant='extended'
              size='large'
              onClick={canConnect ? onPressConnect : onPressCancel}
              className={classes.connectionButton}
              disabled={selectedPortName === ''}
            >
              <FontAwesomeIcon className={classes.connectIcon} icon={faPlug} />
              <Typography variant="h6">{isConnecting ? t('Cancel') : t('Connect')}</Typography>
            </Fab>
          </FormControl>}
          {isConnected && <FormControl
            className={classes.formControl}
          >
            <Fab
              color='secondary'
              type='submit'
              variant='extended'
              size='large'
              onClick={onPressDisconnect}
              className={classes.connectionButton}
            >
              <FontAwesomeIcon className={classes.connectIcon} icon={faPowerOff} />
              <Typography variant="h6">{t('Disconnect')}</Typography>
            </Fab>
          </FormControl>}
        </Grid>
        <Grid item xs={12}>
          <AlertList errors={errors} />
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-create-workspace"
        aria-describedby="modal-create-workspace"
      >
        <div>Are you sure?</div>
      </Modal>
    </Paper>
  );
};

export default OpenMachinePort;
