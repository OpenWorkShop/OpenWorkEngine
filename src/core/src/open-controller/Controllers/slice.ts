import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ControlledMachineFragment} from '../graphql';
import {
  IMachineConfigUpdate,
  IMachineStatusUpdate,
  ControllersState,
  IMachineSettingsUpdate,
  IMachineLogsUpdate
} from './types';

const initialState: ControllersState = {
  controllerMap: {},
  controllerIds: [],
  logMap: {},
};

function updateControlledMachine(state: ControllersState, machine: ControlledMachineFragment): ControllersState {
  const id = machine.topicId;
  if (!state.controllerMap[id]) {
    state.controllerMap[id] = {machine};
    state.controllerIds = Object.keys(state.controllerMap);
  }
  else state.controllerMap[id].machine = machine;
  return state;
}

const controllersSlice = createSlice({
  name: 'controllers',
  initialState: initialState,
  reducers: {
    updateControlledMachine: (state, action: PayloadAction<ControlledMachineFragment>) =>
      updateControlledMachine(state, action.payload),

    onControlledMachineSettings(state, action: PayloadAction<IMachineSettingsUpdate>) {
      state.controllerMap[action.payload.topicId].machine.settings = action.payload.settings;
      return state;
    },

    onControlledMachineStatus(state, action:  PayloadAction<IMachineStatusUpdate>) {
      state.controllerMap[action.payload.topicId].machine.status = action.payload.status;
      return state;
    },

    onControlledMachineConfiguration(state, action: PayloadAction<IMachineConfigUpdate>) {
      state.controllerMap[action.payload.topicId].machine.configuration = action.payload.configuration;
      return state;
    },

    onControlledMachineLogs(state, action: PayloadAction<IMachineLogsUpdate>) {
      if (!action.payload.logs) return;
      const m = state.controllerMap[action.payload.topicId].machine;
      if (!m.logs) {
        console.log('set', action.payload.logs);
      }
      else {
        console.log('merge', m.logs, action.payload.logs);
      }
      return state;
    },
  }
});

export default controllersSlice;
