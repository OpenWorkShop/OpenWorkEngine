import _ from 'lodash';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProgramFileDirectory, ProgramsState} from './types';
import {ProgramFileDirectoryFragment, ProgramFileMetaFragment, WorkspaceFullFragment, WorkspaceState} from '../graphql';

const defaultDirectory: IProgramFileDirectory = {
  path: '',
  fileExtensions: ['gcode', 'nc'],
  programFileMetas: [],
  programFileMetaMap: {},
};

const initialState: ProgramsState = {
  directory: defaultDirectory,
};

const programsSlice = createSlice({
  name: 'programs',
  initialState: initialState,
  reducers: {
    setProgramDirectory: (state, action: PayloadAction<ProgramFileDirectoryFragment>) => {
      state.directory = {
        ...action.payload,
        programFileMetaMap: _.keyBy(action.payload.programFileMetas, m => m.name)
      };
      return state;
    },
    updateProgramMeta: (state, action: PayloadAction<ProgramFileMetaFragment>) => {
      state.directory.programFileMetaMap[action.payload.name] = action.payload;
      const allMeta = Object.values(state.directory.programFileMetaMap);
      state.directory.programFileMetas = _.sortBy(allMeta, m => m.name);
      return state;
    },
  }
});

export default programsSlice;
