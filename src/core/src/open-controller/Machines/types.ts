import {AxisName} from '../graphql';

export interface IMachineAxis {
  name: AxisName;
  max: number;
  min: number;
  accuracy: number;
  precision: number;
}

export type MachineAxisMap = { [key: string]: IMachineAxis };

export interface IMachinePosition {
  x?: number | null;
  y?: number | null;
  z?: number | null;
  a?: number | null;
  b?: number | null;
  c?: number | null;
  u?: number | null;
  v?: number | null;
  w?: number | null;
}

const a3d = [AxisName.X, AxisName.Y, AxisName.Z] as const;
export type Axis3D = typeof a3d[number];
export const threeDimensionalAxes: Axis3D[] = [ ...a3d ];

// export type FirmwareSettingsGroupName = 'applicator' | 'pins' | 'movement' | 'reporting' | 'homing' | 'calibration';

export type Axis3DKey = 'x' | 'y' | 'z';
export const threeDAxisKeys: Axis3DKey[] = ['x', 'y', 'z'];

export type AxisKey = Axis3DKey | 'a' | 'b' | 'c' | 'u' | 'v' | 'w';
export const axisKeys: AxisKey[] = threeDAxisKeys.map(k => k as AxisKey).concat('a', 'b', 'c', 'u', 'v', 'w');

const fwsgn = ['applicator', 'pins', 'movement', 'reporting', 'homing', 'calibration'] as const;
export type FirmwareSettingsGroupName = typeof fwsgn[number];
export const firmwareSettingsGroupNames: FirmwareSettingsGroupName[] = [...fwsgn];

const mgs = [
  'units', 'motion', 'arcDistance', 'distance', 'feedRate', 'cannedCycleReturnMode',
  'pathControlMode', 'spindleSpeed', 'cylindricalInterpolation', 'plane', 'programState'
] as const;
export type ModalGroup = typeof mgs[number];
export const modalGroups: ModalGroup[] = [ ...mgs ];
