import {createEnumChecker, createEnumNormalizer} from '../../utils/enums';
import {AxisName, AxisPlane} from '../graphql';

export function getAxisPlaneAxes(ap: AxisPlane): AxisName[] {
  if (ap === AxisPlane.Xz) return [AxisName.X, AxisName.Z];
  if (ap === AxisPlane.Yz) return [AxisName.Y, AxisName.Z];
  return [AxisName.X, AxisName.Y];
}

export const isAxisName = createEnumChecker(AxisName);
export const normalizeAxisName = createEnumNormalizer(AxisName);
