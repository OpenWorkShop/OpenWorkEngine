import { MachineControllerType } from '../graphql';
export declare const isMachineControllerType: (value: string) => value is MachineControllerType;
export declare const normalizeMachineControllerType: (value: string) => MachineControllerType | undefined;
