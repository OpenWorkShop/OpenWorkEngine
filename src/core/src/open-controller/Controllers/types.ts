import {ControlledMachineFragment} from '../graphql';

export interface IController {
  machine: ControlledMachineFragment;
}

export interface IHaveController {
  controller: IController;
}

export interface IMaybeHaveController {
  controller?: IController;
}
