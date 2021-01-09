import {AxisName} from '../graphql';

export interface IMachineAxis {
  name: AxisName;
  max: number;
  min: number;
  accuracy: number;
  precision: number;
}

