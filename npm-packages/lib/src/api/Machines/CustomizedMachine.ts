import {
  MachineAxisPropsFragment,
  MachineFeaturePropsFragment,
  MachineFirmwareMinimalFragment,
  MachineFirmwarePropsFragment,
  MachinePartCompleteFragment,
} from '../graphql';

export type MachineAxes = { [key: string]: MachineAxisPropsFragment };

// A wrapper interface that supports both sever machine
export interface ICustomizedMachineProfile {
  machineProfileId?: string; // null if came from a custom creator
  brand?: string;
  model: string;
  submit: boolean;
}

export interface ICustomizedMachine {
  profile: ICustomizedMachineProfile;
  name: string;
  icon: string;
  firmware: MachineFirmwarePropsFragment | MachineFirmwareMinimalFragment;
  parts: MachinePartCompleteFragment[];
  axes: MachineAxes;
  features: MachineFeaturePropsFragment[];
}
