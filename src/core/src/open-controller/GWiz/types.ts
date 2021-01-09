import {WorkspaceAxisMap} from '../Workspaces';

export enum ViewMode {
  Perspective,
  Plane,
  Layers,
}

export enum ViewPlane {
  None, // aka, 3d
  Top,
  Bottom,
  Left,
  Right,
  Front,
  Back,
  NumPlanes,
}

export interface IVisualizerControlsPreferences {
  rotateSpeed?: number;
  panSpeed?: number;
  zoomSpeed?: number;
  dampingFactor?: number;
}

export interface IMaterial {
  color: string;
  opacity?: number;
}

export interface IVisualizerStyles {
  backgroundColor: THREE.Color,
  axes: { [key: string]: IMaterial };
}

export interface IVisualizerPreferences {
  axes: WorkspaceAxisMap;
  viewPlane: ViewPlane;
  controls: IVisualizerControlsPreferences;
  styles: IVisualizerStyles;
}

// Redux actions.
export const GWIZ_SET_VIEW_PLANE = 'GWIZ_SET_VIEW_PLANE';
export const GWIZ_SET_AXES = 'GWIZ_SET_AXES';
export const GWIZ_SET_AXIS_MATERIAL = 'GWIZ_SET_AXIS_MATERIAL';

export interface GWizSetViewPlaneAction {
  type: typeof GWIZ_SET_VIEW_PLANE,
  payload: ViewPlane,
}

export interface GWizSetAxesAction {
  type: typeof GWIZ_SET_AXES,
  payload: WorkspaceAxisMap,
}

export interface ChangeAxisMaterialPayload {
  axisName: string;
  material: IMaterial;
}

export interface GWizSetAxisMaterialAction {
  type: typeof GWIZ_SET_AXIS_MATERIAL,
  payload: ChangeAxisMaterialPayload,
}

export type GWizActionTypes = GWizSetViewPlaneAction | GWizSetAxesAction | GWizSetAxisMaterialAction;

export interface IHaveVisualizerPreferences {
  visualizerPreferences: IVisualizerPreferences;
}

export type GWizState = IHaveVisualizerPreferences;

export interface IVisualizeGCode extends IHaveVisualizerPreferences {
  setViewPlane: (vp: ViewPlane) => void;
  setControls: (controls: IVisualizerControlsPreferences) => void;
  setAxisMaterial: (axisName: string, material: IMaterial) => void;
}

export interface IMaybeHaveVisualizer {
  visualizer?: IVisualizeGCode;
}

export interface IHaveVisualizer {
  visualizer: IVisualizeGCode;
}
