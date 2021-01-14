import _ from 'lodash';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WorkspacesState} from './types';
import {WorkspaceFullFragment, WorkspaceState} from '../graphql';

const initialState: WorkspacesState = {
  map: {},
  workspaceIds: [],
};

function deleteWorkspaceId(state: WorkspacesState, workspaceId: string): WorkspacesState {
  delete state.map[workspaceId];
  state.workspaceIds = Object.keys(state.map);
  return state;
}

function updateWorkspace(state: WorkspacesState, workspace: WorkspaceFullFragment): WorkspacesState {
  if (workspace.state === WorkspaceState.Deleted) {
    return deleteWorkspaceId(state, workspace.id);
  }
  state.map[workspace.id] = workspace;
  state.workspaceIds = Object.keys(state.map);
  return state;
}

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: initialState,
  reducers: {
    updateWorkspace: (state, action: PayloadAction<WorkspaceFullFragment>) => updateWorkspace(state, action.payload),
    deleteWorkspaceId: (state, action: PayloadAction<string>) => deleteWorkspaceId(state, action.payload),

    // Replacement. Will delete missing workspaces.
    updateWorkspaces: (state, action: PayloadAction<WorkspaceFullFragment[]>) => {
      const workspaces = action.payload;
      const existingIds = Object.keys(state);
      const updatedIds = workspaces.map(ws => ws.id);
      const deletedIds = _.difference(existingIds, updatedIds);
      deletedIds.forEach(id => deleteWorkspaceId(state, id));
      workspaces.forEach(ws => updateWorkspace(state, ws));
      return state;
    },
  }
});

export default workspacesSlice;
