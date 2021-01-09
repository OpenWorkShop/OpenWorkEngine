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

// Groups of things rendered on-screen, each may have styles.
export enum RenderGroupType {
  None = -3,
  H = -2, // History
  P = -1, // Plan
  E,// Extruder / End-Mill
  X,
  Y,
  Z,
  NumRenderGroups,
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

export interface ChangeMaterialPayload {
  key: RenderGroupType;
  material: IMaterial;
}

export interface IVisualizerStyles {
  backgroundColor: string,
  renderGroups: { [key: string]: IMaterial };
}

export interface IVisualizerPreferences {
  viewPlane: ViewPlane;
  controls: IVisualizerControlsPreferences;
  styles: IVisualizerStyles;
}


export interface IHaveVisualizerPreferences {
  visualizerPreferences: IVisualizerPreferences;
}

export type GWizState = IHaveVisualizerPreferences;

