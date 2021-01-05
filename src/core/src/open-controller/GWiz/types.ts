import * as React from 'react';
import * as THREE from 'three';

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

export interface IVisualizerPreferences {
  viewPlane: ViewPlane;
  setViewPlane: (vm: ViewPlane) => void;

  lineWidth?: number;
}

export interface IHaveVisualizerPreferences {
  visualizerPreferences: IVisualizerPreferences;
}

export interface IMaybeHaveVisualizerPreferences {
  visualizerPreferences?: IVisualizerPreferences;
}

export interface IVisualizeGCode extends IHaveVisualizerPreferences {
  // targetId: string;
  renderer?: THREE.WebGLRenderer;
}

export interface GWizProps {
  domId: string; // Every instance needs its own unique ID
  className?: string; // Class to style the root with
  header?: React.ReactNode; // Above the viz
  children: React.ReactNode; // Components inside/atop the visualizer
  footer?: React.ReactNode; // Below the viz
}
