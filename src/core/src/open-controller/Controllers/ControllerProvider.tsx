import * as React from 'react';
import {
  useMachineConfigurationSubscription,
  useMachineStatusSubscription,
  useMachineSettingsSubscription,
  useMachineLogsSubscription,
  useMachineProgramSubscription,
} from '../graphql';
import {useLogger} from '../../hooks';
import {useDispatch} from 'react-redux';
import controllersSlice from './slice';

type Props = {
  portName: string,
  children: React.ReactNode;
};

const ControllerProvider: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(ControllerProvider);
  const { children, portName } = props;
  const variables = { portName };

  const dispatch = useDispatch();

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

  const onMachineLogsChanged = useMachineLogsSubscription({ variables });
  const newMachineLogs = onMachineLogsChanged?.data?.machine;
  React.useEffect(() => {
    if (newMachineLogs) {
      log.debug('[MACHINE]', '[LOGS]', newMachineLogs);
      dispatch(controllersSlice.actions.onControlledMachineLogPage(newMachineLogs));
    }
  }, [newMachineLogs]);

  const onMachineProgramChanged = useMachineProgramSubscription({ variables });
  const newMachineProgram = onMachineProgramChanged?.data?.machine;
  React.useEffect(() => {
    if (newMachineProgram) {
      log.debug('[MACHINE]', '[PROGRAM]', newMachineProgram);
      dispatch(controllersSlice.actions.onControlledMachineProgram(newMachineProgram));
    }
  }, [newMachineProgram]);

  log.verbose('machine', variables);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ControllerProvider;
