export enum ViewMode {
  Perspective,
  Plane,
  Layers,
}

export enum ViewPlane {
  None, // aka, 3d
  ThreeD,
  Top,
  Bottom,
  Left,
  Right,
  Front,
  Back,
}

// Groups of things rendered on-screen, each may have styles.
export enum RenderGroupType {
  None = -3,
  H = -2, // History
  P = -1, // Plan
  E, // Extruder / End-Mill
  X,
  Y,
  Z,
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
  // linewidth doesn't work right due to bugs in canvas
}

export interface INavCubePreferences {
  chamfer?: number; // percentage.
  edgeColor: string;
  cornerColor: string;
}

export interface ChangeMaterialPayload {
  key: RenderGroupType;
  material: IMaterial;
}

export interface IVisualizerStyles {
  backgroundColor: string;
  gridLines: IMaterial;
  renderGroups: { [key: string]: IMaterial };
  navCube: INavCubePreferences;
}

// Things the user changes directly through UI forms.
export interface IVisualizerPreferences {
  viewPlane: ViewPlane;
  controls: IVisualizerControlsPreferences;
  styles: IVisualizerStyles;
}

// Implicit tracking of the camera's position within the scene.
export interface IVisualizerCameraState {
  position: IVector3;
}

export interface IHaveVisualizerPreferences {
  visualizerPreferences: IVisualizerPreferences;
  cameraState: IVisualizerCameraState;
}

export interface IVector3 {
  x: number,
  y: number,
  z: number,
}

export type GWizState = IHaveVisualizerPreferences;

