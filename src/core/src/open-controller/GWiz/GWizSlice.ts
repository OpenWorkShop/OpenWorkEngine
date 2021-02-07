import {
  ChangeMaterialPayload,
  GWizState, IVector3, RenderGroupType,
  ViewPlane,
} from './types';
import theme from '../../themes/GWiz';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const defaultVisualizerStyles = {
  backgroundColor: theme.palette.background.default,
  gridLines: { color: theme.palette.grey.A200 },
  renderGroups: {
    [RenderGroupType.P]: { color: theme.palette.primary.light },
    [RenderGroupType.H]: { color: theme.palette.secondary.main },
    [RenderGroupType.E]: { color: theme.palette.info.main },
    [RenderGroupType.X]: { color: '#AA0000' }, // Red
    [RenderGroupType.Y]: { color: '#00BB00' }, // Green
    [RenderGroupType.Z]: { color: '#0000AA' }, // Blue
  },
  navCube: {
    chamfer: 0.3,
    edgeColor: '#EEEEEE',
    cornerColor: '#AAAAAA',
  },
};

const initialState: GWizState = {
  visualizerPreferences: {
    viewPlane: ViewPlane.None,
    controls: {},
    styles: defaultVisualizerStyles,
  },
  cameraState: {
    position: { x: 0, y: 0, z: 0 },
  },
};

const gWizState = createSlice({
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
    setCameraPosition: (state, action: PayloadAction<IVector3>) => {
      state.cameraState.position = action.payload;
      return state;
    },
  }
});

export default gWizState;
