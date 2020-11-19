import { createEnumNormalizer, createEnumChecker } from '../../utils/enums';
import { MachineControllerType } from '../graphql';

export const isMachineControllerType = createEnumChecker(MachineControllerType);
export const normalizeMachineControllerType = createEnumNormalizer(MachineControllerType);
