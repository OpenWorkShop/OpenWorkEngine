import {Quaternion, Vector3} from 'three';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxisPlane, UnitType} from '../graphql';

export enum ViewMode {
  Perspective,
  Plane,
  Layers,
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

export enum ViewSide {
  Front = 1 << 1,
  Back = 1 << 2,
  Left = 1 << 3,
  Right = 1 << 4,
  Top = 1 << 5,
  Bottom = 1 << 6,
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
  highlighted: IMaterial;
  renderGroups: { [key: string]: IMaterial };
  navCube: INavCubePreferences;
}

// Things the user changes directly through UI forms.
export interface IVisualizerPreferences {
  controls: IVisualizerControlsPreferences;
  styles: IVisualizerStyles;
}

// Implicit tracking of the camera's position within the scene.
export interface IVisualizerCameraState {
  position: Vector3;
  quaternion: Quaternion;
}

export interface ISelectedObject {
  uuid: string;
}

export interface IVisualizerSceneState {
  camera: IVisualizerCameraState;
  units?: UnitType;
  axisPlane?: AxisPlane;
  viewSides?: ViewSide;
  highlightedObject?: ISelectedObject;
  selectedObject?: ISelectedObject;
  // selection?: Object3D;
}

export interface IHaveVisualizerPreferences {
  visualizerPreferences: IVisualizerPreferences;
}

export type GWizState = IHaveVisualizerPreferences & {
  scenes: { [key: string]: IVisualizerSceneState };
}

export type VisualizerSceneStateAction<TState> = PayloadAction<{
  sceneId: string;
  state: TState;
}>;

// Passed into the classes such that they may broadcast state back to the dispatch()
export type GWizActions = {
  saveCameraState: (camera: IVisualizerCameraState) => void;
  setHighlightedObject: (obj?: ISelectedObject) => void;
  setSelectedObject: (obj?: ISelectedObject) => void;
}
