import {
  MachineCommandPropsFragment, MachineControllerType,
  MachineFeaturePropsFragment,
  MachineFirmwarePropsFragment, MachineSettingType, MachineSpecType,
} from '../graphql';
import {MachinePartType} from '../graphql';

export interface IAxisProps {
  accuracy: number;
  id?: string;
  max: number;
  min: number;
  name: string;
  precision: number;
}

export type MachineAxes = { [key: string]: IAxisProps };

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

export interface IMachinePartSpec {
  id: string,
  specType: MachineSpecType,
  value: number,
}

export interface IMachinePartSetting {
  id: string,
  key: string,
  settingType: MachineSettingType,
  title: string | null,
  value: string,
}

export interface IMachinePartChoice {
  id: string,
  partType: MachinePartType,
  title: string | null,
  optional: boolean,
  description: string | null,
  isDefault: boolean,
  sortOrder: number,
  dataBlob: string,
  specs: IMachinePartSpec[],
  settings: IMachinePartSetting[],
}

export type FirmwareRequirement = IFirmwareRequirement & MachineFirmwarePropsFragment;

export interface ICustomizedMachine {
  profile: ICustomizedMachineProfile;
  name: string;
  icon: string;
  firmware: FirmwareRequirement;
  parts: IMachinePartChoice[];
  axes: IAxisProps[];
  features: MachineFeaturePropsFragment[];
  commands: MachineCommandPropsFragment[];
}
