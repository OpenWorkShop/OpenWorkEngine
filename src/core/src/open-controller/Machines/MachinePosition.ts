import _ from 'lodash';
import {IMachineAxis, IMachinePosition} from './types';
import {AxisName, UnitType} from '../graphql';
import {mm2} from '../../components/Units';
import {axisRound} from './MachineAxis';

export function isMachinePositionValid(p?: IMachinePosition): boolean {
  if (!p) return false;
  const ps = [p.x, p.y, p.z, p.a, p.b, p.c];
  return _.findIndex(ps, p => p != null && p != undefined) >= 0;
}

function getAxisValue(p: IMachinePosition, axisName: AxisName): number | null | undefined {
  if (axisName === AxisName.X) return p.x;
  if (axisName === AxisName.Y) return p.y;
  if (axisName === AxisName.Z) return p.z;
  if (axisName === AxisName.A) return p.a;
  if (axisName === AxisName.B) return p.b;
  if (axisName === AxisName.C) return p.c;
  return null;
}

export function getMachineAxisPosition(
  p: IMachinePosition, axis: IMachineAxis, units?: UnitType
): number | null | undefined {
  const ret = mm2(getAxisValue(p, axis.name), units);
  if (!ret) return ret;
  return axisRound(axis, ret, units);
}
