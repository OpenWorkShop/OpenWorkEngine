import { MachineControllerType } from '@openworkshop/lib/api/graphql';
export interface IConnectionOpts {
    host: string;
}
export interface IPortOpts {
    port: string;
    controllerType: MachineControllerType;
    baudRate: number;
}
export declare type ConnectFn = (host: IConnectionOpts) => Promise<boolean>;
export declare type MachineEventType = 'state' | 'settings';
export declare type MachineCommand = 'homing';
export declare type MachineEventListenerFn = (opts: unknown) => void;
export interface IMachineController {
    connected: boolean;
    connect: ConnectFn;
    disconnect: () => Promise<void>;
    addListener: (type: MachineEventType, listener: MachineEventListenerFn) => void;
    removeListener: (type: MachineEventType, listener: MachineEventListenerFn) => void;
    openPort: (opts: IPortOpts) => Promise<void>;
    closePort: (port: string) => Promise<void>;
    listPorts: () => Promise<string[]>;
    command: (cmd: MachineCommand) => Promise<void>;
    write: (str: string) => Promise<void>;
    writeln: (str: string) => Promise<void>;
}
