import {
  ChangeMaterialPayload,
  GWizState, RenderGroupType,
  ViewPlane,
} from './types';
import * as THREE from 'three';
import theme from '../../themes/GWiz';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const axisColor = theme.palette.grey.A200;

export const defaultVisualizerStyles = {
  backgroundColor: theme.palette.background.default,
  renderGroups: {
    [RenderGroupType.P]: { color: theme.palette.primary.light },
    [RenderGroupType.H]: { color: theme.palette.secondary.main },
    [RenderGroupType.E]: { color: theme.palette.info.main },
    [RenderGroupType.X]: { color: axisColor },
    [RenderGroupType.Y]: { color: axisColor },
    [RenderGroupType.Z]: { color: axisColor },
  },
};

const initialState: GWizState = {
  visualizerPreferences: {
    viewPlane: ViewPlane.None,
    controls: {},
    styles: defaultVisualizerStyles,
  }
};

const gWizSlice = createSlice({
  name: 'gWiz',
  initialState: initialState,
  reducers: {
    setViewPlane: (state, action: PayloadAction<ViewPlane>) => {
      state.visualizerPreferences.viewPlane = action.payload;
      return state;
    },
    setRenderGroupMaterial: (state, action: PayloadAction<ChangeMaterialPayload>) => {
      state.visualizerPreferences.styles.renderGroups[action.payload.key] = action.payload.material;
      return state;
    },
  }
});

export default gWizSlice;
