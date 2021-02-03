import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ControlledMachineFragment,
  MachineLogEntryConnectionFragment,
  MachineLogEntryFragment,
  PageInfoFragment
} from '../graphql';
import _ from 'lodash';
import {
  IMachineConfigUpdate,
  IMachineStatusUpdate,
  ControllersState,
  IMachineSettingsUpdate,
  IMachineLogPageUpdate, IMachineLogs, IMachineLogsUpdate
} from './types';

const initialState: ControllersState = {
  controllerMap: {},
  controllerIds: [],
};

// Non-destructive update either inserts or updates all records provided.
function getMachineLogs(state: ControllersState, id: string, newLogs: MachineLogEntryFragment[], pageInfo?: PageInfoFragment): IMachineLogs {
  const oldMachine = state.controllerMap[id]?.machine;
  const logs = [...(oldMachine?.logs?.nodes ?? [])];

  newLogs.forEach((newLog) => {
    const oldLogIdx = _.findLastIndex(logs, { id: newLog.id });
    if (oldLogIdx >= 0) {
      logs[oldLogIdx] = newLog;
    } else {
      logs.push(newLog);
    }
  });

  const sortedLogs =  _.sortBy(logs, l => new Date(l.timestamp));
  pageInfo = pageInfo ?? state.controllerMap[id].logs.pageInfo;
  return { sortedLogs, pageInfo };
}

function updateMachineLogPage(state: ControllersState, id: string, newLogs?: MachineLogEntryConnectionFragment): ControllersState {
  if (!newLogs) return state;
  state.controllerMap[id].logs = getMachineLogs(state, id, newLogs.nodes ?? [], newLogs.pageInfo);
  return state;
}

function updateControlledMachine(state: ControllersState, machine: ControlledMachineFragment): ControllersState {
  const id = machine.topicId;
  if (!state.controllerMap[id]) {
    state.controllerMap[id] = { machine, logs: { sortedLogs: [] } };
    state.controllerIds = Object.keys(state.controllerMap);
  }
  else state.controllerMap[id].machine = machine;
  return updateMachineLogPage(state, id, machine.logs ?? undefined);
}

const controllersSlice = createSlice({
  name: 'controllers',
  initialState: initialState,
  reducers: {
    updateControlledMachine: (state, action: PayloadAction<ControlledMachineFragment>) =>
      updateControlledMachine(state, action.payload),

    onControlledMachineSettings(state, action: PayloadAction<IMachineSettingsUpdate>) {
      state.controllerMap[action.payload.topicId].machine.settings = action.payload.settings;
      console.log('[SETTINGS]', action.payload.settings);
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

    onControlledMachineLogPage(state, action: PayloadAction<IMachineLogPageUpdate>) {
      if (!action.payload.logs) return;
      return updateMachineLogPage(state, action.payload.topicId, action.payload.logs);
    },

    onControlledMachineLogs(state, action: PayloadAction<IMachineLogsUpdate>) {
      const id = action.payload.topicId;
      state.controllerMap[id].logs = getMachineLogs(state, id, action.payload.logs);
      return state;
    },
  }
});

export default controllersSlice;
