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
}

export type Axis3D = AxisName.X | AxisName.Y | AxisName.Z;

export type FirmwareSettingsGroupName = 'applicator' | 'pins' | 'movement' | 'reporting' | 'homing' | 'calibration';

export type AxisFlagKey = 'x' | 'y' | 'z';
