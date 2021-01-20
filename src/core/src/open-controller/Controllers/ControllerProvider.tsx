import * as React from 'react';
import {
  useMachineConfigurationSubscription,
  useMachineStatusSubscription,
  ControlledMachineFragment, useMachineSettingsSubscription
} from '../graphql';
import {useLogger} from '../../Hooks';
import {useDispatch} from 'react-redux';
import controllersSlice from './slice';

type Props = {
  portName: string,
  machine: ControlledMachineFragment;
  children: React.ReactNode;
};

const ControllerProvider: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(ControllerProvider);
  const { children, machine } = props;
  const variables = { portName: props.portName };

  const dispatch = useDispatch();
  
  // Load initial machine.
  React.useEffect(() => {
    dispatch(controllersSlice.actions.updateControlledMachine(machine));
  }, [machine]);

  const onMachineSettingsChanged = useMachineSettingsSubscription({ variables });
  const newMachineSettings = onMachineSettingsChanged?.data?.machine;
  React.useEffect(() => {
    if (newMachineSettings?.settings) {
      log.debug('[MACHINE]', '[SETTINGS]', newMachineSettings);
      dispatch(controllersSlice.actions.onControlledMachineSettings(newMachineSettings));
    }
  }, [newMachineSettings]);

  const onMachineStatusChanged = useMachineStatusSubscription({ variables });
  const newMachineStatus = onMachineStatusChanged?.data?.machine;
  React.useEffect(() => {
    if (newMachineStatus?.status) {
      log.debug('[MACHINE]', '[STATUS]', newMachineStatus);
      dispatch(controllersSlice.actions.onControlledMachineStatus(newMachineStatus));
    }
  }, [newMachineStatus]);

  const onMachineConfigurationChanged = useMachineConfigurationSubscription({ variables });
  const newMachineConfig = onMachineConfigurationChanged?.data?.machine;
  React.useEffect(() => {
    if (newMachineConfig?.configuration) {
      log.debug('[MACHINE]', '[CONFIG]', newMachineConfig);
      dispatch(controllersSlice.actions.onControlledMachineConfiguration(newMachineConfig));
    }
  }, [newMachineConfig]);

  // log.debug('machine', cm);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ControllerProvider;
