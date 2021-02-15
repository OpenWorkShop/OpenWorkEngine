import {
  ChangeMaterialPayload,
  GWizState, IVisualizerCameraState, IVisualizerSceneState, RenderGroupType,
  ViewSide, VisualizerSceneStateAction,
} from './types';
import theme from '../../themes/GWiz';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Quaternion, Vector3} from 'three';
import {AxisPlane, UnitType, WorkspaceFullFragment} from '../graphql';
import {AppState} from '../redux';
import {WorkspacesState} from '../Workspaces';

export const defaultVisualizerStyles = {
  backgroundColor: theme.palette.background.default,
  gridLines: { color: theme.palette.grey.A200 },
  renderGroups: {
    [RenderGroupType.P]: { color: theme.palette.primary.light },
    [RenderGroupType.H]: { color: theme.palette.secondary.main },
    [RenderGroupType.E]: { color: theme.palette.info.main },
    [RenderGroupType.X]: { color: '#FF0000' }, // Red
    [RenderGroupType.Y]: { color: '#00FF00' }, // Green
    [RenderGroupType.Z]: { color: '#0000FF' }, // Blue
  },
  navCube: {
    chamfer: 0.3,
    edgeColor: '#EEEEEE',
    cornerColor: '#AAAAAA',
  },
};

const initialState: GWizState = {
  visualizerPreferences: {
    controls: {},
    styles: defaultVisualizerStyles,
  },
  scenes: {},
};

function ensureScene(sceneId: string, prefs: GWizState): IVisualizerSceneState {
  if (!prefs.scenes[sceneId]) prefs.scenes[sceneId] = {
    camera: { quaternion: new Quaternion(0, 0, 0, 0), position: new Vector3(0, 0, 0) },
  };
  return prefs.scenes[sceneId];
}

const gWizState = createSlice({
  name: 'gWiz',
  initialState: initialState,
  reducers: {
    setRenderGroupMaterial: (state, action: PayloadAction<ChangeMaterialPayload>) => {
      state.visualizerPreferences.styles.renderGroups[action.payload.key] = action.payload.material;
      return state;
    },
    setSceneState: (state, action: VisualizerSceneStateAction<IVisualizerSceneState>) => {
      state.scenes[action.payload.sceneId] = action.payload.state;
      return state;
    },
    setCameraState: (state, action: VisualizerSceneStateAction<IVisualizerCameraState>) => {
      ensureScene(action.payload.sceneId, state).camera = action.payload.state;
      return state;
    },
    setSceneUnits: (state, action: VisualizerSceneStateAction<UnitType>) => {
      ensureScene(action.payload.sceneId, state).units = action.payload.state;
      return state;
    },
    setScenePlane: (state, action: VisualizerSceneStateAction<AxisPlane>) => {
      ensureScene(action.payload.sceneId, state).axisPlane = action.payload.state;
      return state;
    },
  }
});

export default gWizState;
