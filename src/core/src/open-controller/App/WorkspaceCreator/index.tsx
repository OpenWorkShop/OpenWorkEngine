import {Typography, Container } from '@material-ui/core';
import {ICustomizedMachine} from '../../Machines/CustomizedMachine';
import useLogger from '../../../utils/logging/UseLogger';
import CustomizeMachine from '../../../components/MachineProfiles/CustomizeMachine';
import React, { FunctionComponent } from 'react';
import OpenMachinePort from '../../Ports/OpenMachinePort';
import CreateWorkspaceModal from './CreateWorkspaceModal';
import useStyles from './Styles';
import {useTrans} from '../../Context';

const WorkspaceCreator: FunctionComponent = () => {
  const log = useLogger(WorkspaceCreator);
  const t = useTrans();
  const classes = useStyles();
  const [machine, setMachine] = React.useState<ICustomizedMachine | undefined>(undefined);
  const [selectedPortName, setSelectedPortName] = React.useState<string>('');
  const [modalOpen, setModalOpen] = React.useState(false);

  function onCustomized(cust?: ICustomizedMachine) {
    log.verbose(cust);
    setMachine(cust);
  }

  function onClosedModal() {
    setModalOpen(false);
  }

  return (
    <Container className={classes.root}>
      <Typography variant='h5'>
        {t('Create Workspace')}
      </Typography>
      <Typography variant="subtitle2">
        {t('By connecting to a CNC or 3D Printer machine attached to the Makeverse computer.')}
      </Typography>
      <CustomizeMachine
        tip={t('Select a machine, above, so that you may connect to it.')}
        onCustomized={onCustomized}
      />
      {machine && <OpenMachinePort
        machine={machine}
        onConnected={() => setModalOpen(true)}
        selectedPortName={selectedPortName}
        setSelectedPortName={setSelectedPortName}
      />}
      <CreateWorkspaceModal
        open={modalOpen}
        onClose={onClosedModal}
        machine={machine}
        portName={selectedPortName}
      />
    </Container>
  );
};

export default WorkspaceCreator;