import _ from 'lodash';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProgramsState} from './types';
import {ProgramFileDirectoryFragment, WorkspaceFullFragment, WorkspaceState} from '../graphql';

const defaultDirectory: ProgramFileDirectoryFragment = {
  path: '',
  fileExtensions: ['gcode', 'nc'],
  programFileMetas: [],
};

const initialState: ProgramsState = {
  directory: defaultDirectory,
};

const programsSlice = createSlice({
  name: 'programs',
  initialState: initialState,
  reducers: {
    setProgramDirectory: (state, action: PayloadAction<ProgramFileDirectoryFragment>) => {
      state.directory = action.payload;
      return state;
    },
  }
});

export default programsSlice;
