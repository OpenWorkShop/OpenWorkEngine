import {
  ControlledMachineFragment,
  MachineConfigFragment,
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
