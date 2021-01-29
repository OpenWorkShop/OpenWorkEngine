import {
  AlertError,
  ControlledMachineFragment, FirmwareSettingsFragment,
  MachineConfigFragment,
  MachineExecutionResultFragment,
  MachineLogEntryConnectionFragment,
  MachineLogEntryFragment,
  MachineStatusFragment,
  PageInfoFragment
} from '../graphql';

export interface IMachineLogs {
  // The machine contains a cursor; this aggregates all logs into a single sorted list:
  sortedLogs: MachineLogEntryFragment[];
  pageInfo?: PageInfoFragment;
}

export interface IController {
  machine: ControlledMachineFragment;
  logs: IMachineLogs;
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
};


export interface IControlledMachineUpdate {
  topicId: string;
}

export interface IMachineSettingsUpdate extends IControlledMachineUpdate {
  settings: FirmwareSettingsFragment;
}

export interface IMachineStatusUpdate extends IControlledMachineUpdate {
  status: MachineStatusFragment;
}

export interface IMachineConfigUpdate extends IControlledMachineUpdate {
  configuration: MachineConfigFragment;
}

export interface IMachineLogPageUpdate extends IControlledMachineUpdate {
  logs: MachineLogEntryConnectionFragment | null;
}

export interface IMachineLogsUpdate extends IControlledMachineUpdate {
  logs: MachineLogEntryFragment[];
}

export interface IMutationResult<TData> {
  error?: AlertError;
  data?: TData;
}

export type MutationResultAsync<TData, TVars> = (vars: TVars) => Promise<IMutationResult<TData>>;

export interface IControllerCommandArgsBase {
  workspaceId: string;
}

export interface IControllerCommandResult {
  id: string;
  result: MachineExecutionResultFragment;
}

export interface IControllerCommandResponse {
  controller: IControllerCommandResult;
}