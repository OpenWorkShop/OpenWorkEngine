import { MachineAxisPropsFragment, MachineFeaturePropsFragment, MachineFirmwareMinimalFragment, MachineFirmwarePropsFragment, MachinePartCompleteFragment } from '../graphql';
export declare type MachineAxes = {
    [key: string]: MachineAxisPropsFragment;
};
export interface ICustomizedMachineProfile {
    machineProfileId?: string;
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
