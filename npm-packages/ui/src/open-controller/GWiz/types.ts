import * as React from 'react';

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

export interface IVisualizeGCode {
  // targetId: string;
  canvas?: HTMLCanvasElement;
  preferences: IVisualizerPreferences;
}

export interface GWizProps {
  domId: string; // Every instance needs its own unique ID
  className?: string; // Class to style the root with
  header?: React.ReactNode; // Above the viz
  children: React.ReactNode; // Components inside/atop the visualizer
  footer?: React.ReactNode; // Below the viz
}

export interface IHaveGWiz {
  wiz: IVisualizeGCode;
}

export interface IMaybeHaveGWiz {
  wiz?: IVisualizeGCode;
}
