import {
  MachineAxisPropsFragment, MachineCommandPropsFragment, MachineControllerType,
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

export interface IFirmwareRequirement {
  controllerType: MachineControllerType;
  id?: string | null;
  downloadUrl?: string | null;
  helpUrl?: string | null;
  requiredVersion?: string | null;
  suggestedVersion?: string | null;
  name?: string | null;
  edition?: string | null;
  value?: number | null;
}


export type FirmwareRequirement = IFirmwareRequirement & MachineFirmwarePropsFragment;

export interface ICustomizedMachine {
  profile: ICustomizedMachineProfile;
  name: string;
  icon: string;
  firmware: FirmwareRequirement;
  parts: MachinePartCompleteFragment[];
  axes: MachineAxisPropsFragment[];
  features: MachineFeaturePropsFragment[];
  commands: MachineCommandPropsFragment[];
}
