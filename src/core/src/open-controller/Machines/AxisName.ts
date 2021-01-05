import { createEnumNormalizer, createEnumChecker } from '../../utils/enums';
import { AxisName } from '../graphql';

export const isAxisName = createEnumChecker(AxisName);
export const normalizeAxisName = createEnumNormalizer(AxisName);
