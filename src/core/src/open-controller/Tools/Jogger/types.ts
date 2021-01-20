import {IMachinePosition} from '../../Machines';
import {MachineMotionType, MovementDistanceType} from '../../graphql';

export interface IMoveRequest extends IMachinePosition {
  distanceType: MovementDistanceType;
  motionType?: MachineMotionType; // default: rapid
}
