import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ActiveState,
  ControlledMachineFragment,
  MachineLogEntryConnectionFragment,
  MachineLogEntryFragment,
  PageInfoFragment
} from '../graphql';
import _ from 'lodash';
import {
  ControllersState,
  IController,
  IMachineConfigUpdate,
  IMachineLogPageUpdate,
  IMachineLogs,
  IMachineLogsUpdate,
  IMachineProgramUpdate,
  IMachineSettingsUpdate,
  IMachineStatusUpdate
} from './types';

const initialState: ControllersState = {
  controllerMap: {},
  controllerIds: [],
};

// Non-destructive update either inserts or updates all records provided.
function getMachineLogs(state: ControllersState, id: string, newLogs: MachineLogEntryFragment[], pageInfo?: PageInfoFragment): IMachineLogs {
  const logs = [...state.controllerMap[id].logs.sortedLogs];

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
  onControllerUpdated(state.controllerMap[id]);
  return state;
}

function onControllerUpdated(controller: IController): void {
  const invalidStates = [ActiveState.Initializing, ActiveState.Alarm, undefined, null];
  controller.canReceiveCommands = !invalidStates.includes(controller.machine.status.activityState);
}

function updateControlledMachine(state: ControllersState, machine: ControlledMachineFragment): ControllersState {
  const id = machine.topicId;
  if (!state.controllerMap[id]) {
    state.controllerMap[id] = { machine, logs: { sortedLogs: [] }, canReceiveCommands: false };
    state.controllerIds = Object.keys(state.controllerMap);
  }
  else state.controllerMap[id].machine = machine;
  onControllerUpdated(state.controllerMap[id]);
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
      onControllerUpdated(state.controllerMap[action.payload.topicId]);
      return state;
    },

    onControlledMachineStatus(state, action:  PayloadAction<IMachineStatusUpdate>) {
      state.controllerMap[action.payload.topicId].machine.status = action.payload.status;
      onControllerUpdated(state.controllerMap[action.payload.topicId]);
      return state;
    },

    onControlledMachineConfiguration(state, action: PayloadAction<IMachineConfigUpdate>) {
      state.controllerMap[action.payload.topicId].machine.configuration = action.payload.configuration;
      onControllerUpdated(state.controllerMap[action.payload.topicId]);
      return state;
    },

    onControlledMachineProgram(state, action: PayloadAction<IMachineProgramUpdate>) {
      state.controllerMap[action.payload.topicId].machine.program = action.payload.program;
      onControllerUpdated(state.controllerMap[action.payload.topicId]);
      return state;
    },

    onControlledMachineLogPage(state, action: PayloadAction<IMachineLogPageUpdate>) {
      if (!action.payload.logs) return;
      return updateMachineLogPage(state, action.payload.topicId, action.payload.logs);
    },

    onControlledMachineLogs(state, action: PayloadAction<IMachineLogsUpdate>) {
      const id = action.payload.topicId;
      state.controllerMap[id].logs = getMachineLogs(state, id, action.payload.logs);
      onControllerUpdated(state.controllerMap[id]);
      return state;
    },
  }
});

export default controllersSlice;
