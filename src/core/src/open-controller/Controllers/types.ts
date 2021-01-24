import {
  AlertError,
  ControlledMachineFragment,
  MachineConfigFragment, MachineLogEntryConnectionFragment,
  MachineSettingFragment,
  MachineStatusFragment
} from '../graphql';

export interface IController {
  machine: ControlledMachineFragment;
}

export interface IHaveController {
  controller: IController;
}

export interface IMaybeHaveController {
  controller?: IController;
}

export type ControllerStateMap = { [key: string]: IController };

export type ControllersState = {
  controllerMap: ControllerStateMap;
  controllerIds: string[];
  logMap: { [key: string]: MachineLogEntryConnectionFragment };
};


export interface IControlledMachineUpdate {
  topicId: string;
}

export interface IMachineSettingsUpdate extends IControlledMachineUpdate {
  settings: MachineSettingFragment[];
}

export interface IMachineStatusUpdate extends IControlledMachineUpdate {
  status: MachineStatusFragment;
}

export interface IMachineConfigUpdate extends IControlledMachineUpdate {
  configuration: MachineConfigFragment;
}

export interface IMachineLogsUpdate extends IControlledMachineUpdate {
  logs: MachineLogEntryConnectionFragment | null;
}

export interface IMachineLogUpdate extends IControlledMachineUpdate {
  logs: MachineConfigFragment;
}

export interface IControllerVars {
  workspaceId: string;
}

export interface IMutationResult<TData> {
  error?: AlertError;
  data?: TData;
}

export type MutationResultAsync<TData, TVars> = (vars: TVars) => Promise<IMutationResult<TData>>;