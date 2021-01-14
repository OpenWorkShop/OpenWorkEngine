import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ControlledMachineFragment} from '../graphql';
import {IMachineConfigUpdate, IMachineStatusUpdate, ControllersState, ControllerStateMap } from './types';

const initialState: ControllersState = {
  controllerMap: {},
  controllerIds: [],
};
//
// function deleteControlledMachineTopicId(state: ControllersState, topicId: string): ControllersState {
//   delete state.controlledMachineMap[topicId].controlledMachine;
//   state.controlledMachineIds = Object.keys(state.controlledMachineMap);
//   return state;
// }

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

    onControlledMachineStatus(state, action: PayloadAction<IMachineStatusUpdate>) {
      state.controllerMap[action.payload.topicId].machine.status = action.payload.status;
      return state;
    },

    onControlledMachineConfiguration(state, action: PayloadAction<IMachineConfigUpdate>) {
      state.controllerMap[action.payload.topicId].machine.configuration = action.payload.configuration;
      return state;
    },
    //
    // deleteControlledMachineId: (state, action: PayloadAction<string>) =>
    //   deleteControlledMachineTopicId(state, action.payload),
    //
    // // Replacement. Will delete missing workspaces.
    // updateControlledMachines: (state, action: PayloadAction<ControlledMachineFragment[]>) => {
    //   const machines = action.payload;
    //   const existingIds = Object.keys(state);
    //   const updatedIds = machines.map(machine => machine.topicId);
    //   const deletedIds = _.difference(existingIds, updatedIds);
    //   deletedIds.forEach(id => deleteControlledMachineTopicId(state, id));
    //   machines.forEach(ws => updateControlledMachine(state, ws));
    //   return state;
    // },
  }
});

export default controllersSlice;
