import {MachineControllerType} from '@openworkshop/lib/api/graphql';

export interface IConnectionOpts {
  host: string;
}

export interface IPortOpts {
  port: string;
  controllerType: MachineControllerType;
  baudRate: number;
  rtscts: boolean;
}

export type ConnectFn = (host: IConnectionOpts) => Promise<boolean>;

export type MachineEventType = 'state' | 'settings';

export type MachineCommandType = 'homing';

export type MachineEventListenerFn = (opts: unknown) => void;

export type WorkflowState = 'idle' | 'paused' | 'running';

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

class MachineController implements IMachineController {
  workflow: IWorkflow = { state: 'idle' };

  public addListener(type: MachineEventType, listener: MachineEventListenerFn): void {
  }

  public closePort(port: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public command(cmd: MachineCommandType): Promise<void> {
    return Promise.resolve(undefined);
  }

  public connect(host: IConnectionOpts): Promise<boolean> {
    return Promise.resolve(false);
  }

  _connected = false;

  public get connected(): boolean {
    return this._connected;
  }

  public disconnect(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public listPorts(): Promise<string[]> {
    return Promise.resolve([]);
  }

  public openPort(opts: IPortOpts): Promise<void> {
    return Promise.resolve(undefined);
  }

  public removeListener(type: MachineEventType, listener: MachineEventListenerFn): void {
  }

  public write(str: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public writeln(str: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

export default MachineController;
