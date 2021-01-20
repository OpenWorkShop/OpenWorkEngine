import _ from 'lodash';
import {IMachinePosition} from './types';
import {AxisName} from '../graphql';

export function isMachinePositionValid(p?: IMachinePosition): boolean {
  if (!p) return false;
  const ps = [p.x, p.y, p.z, p.a, p.b, p.c];
  return _.findIndex(ps, p => p != null && p != undefined) >= 0;
}

export function getMachineAxisPosition(p: IMachinePosition, axisName: AxisName): number | null | undefined {
  if (axisName == AxisName.X) return p.x;
  if (axisName == AxisName.Y) return p.y;
  if (axisName == AxisName.Z) return p.z;
  if (axisName == AxisName.A) return p.a;
  if (axisName == AxisName.B) return p.b;
  if (axisName == AxisName.C) return p.c;
  return null;
}
