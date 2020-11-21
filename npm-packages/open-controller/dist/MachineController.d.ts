import { MachineControllerType } from '@openworkshop/lib/api/graphql';
export interface IConnectionOpts {
    host: string;
}
export interface IPortOpts {
    port: string;
    controllerType: MachineControllerType;
    baudRate: number;
    rtscts: boolean;
}
export declare type ConnectFn = (host: IConnectionOpts) => Promise<boolean>;
export declare type MachineEventType = 'state' | 'settings';
export declare type MachineCommandType = 'homing';
export declare type MachineEventListenerFn = (opts: unknown) => void;
export declare type WorkflowState = 'idle' | 'paused' | 'running';
export interface IWorkflow {
    state: WorkflowState;
}
export interface IMachineController {
    connect: ConnectFn;
    disconnect: () => Promise<void>;
    addListener: (type: MachineEventType, listener: MachineEventListenerFn) => void;
    removeListener: (type: MachineEventType, listener: MachineEventListenerFn) => void;
    openPort: (opts: IPortOpts) => Promise<void>;
    closePort: (port: string) => Promise<void>;
    listPorts: () => Promise<string[]>;
    workflow: IWorkflow;
    command: (cmd: MachineCommandType) => Promise<void>;
    write: (str: string) => Promise<void>;
    writeln: (str: string) => Promise<void>;
}
declare class MachineController implements IMachineController {
    workflow: IWorkflow;
    addListener(type: MachineEventType, listener: MachineEventListenerFn): void;
    closePort(port: string): Promise<void>;
    command(cmd: MachineCommandType): Promise<void>;
    connect(host: IConnectionOpts): Promise<boolean>;
    _connected: boolean;
    get connected(): boolean;
    disconnect(): Promise<void>;
    listPorts(): Promise<string[]>;
    openPort(opts: IPortOpts): Promise<void>;
    removeListener(type: MachineEventType, listener: MachineEventListenerFn): void;
    write(str: string): Promise<void>;
    writeln(str: string): Promise<void>;
}
export default MachineController;
