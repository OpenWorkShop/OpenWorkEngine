import { createEnumNormalizer, createEnumChecker } from '../../utils/enums';
import { MachineControllerType } from '../graphql';

export function getMachineControllerTypeIconName(controllerType: MachineControllerType): string {
  if (controllerType === MachineControllerType.Maslow) {
    return 'maslow';
  } else if (controllerType === MachineControllerType.Grbl) {
    return 'cnc';
  } else if (controllerType === MachineControllerType.Marlin) {
    return '3dp';
  }
  return 'xyz';
}

export const isMachineControllerType = createEnumChecker(MachineControllerType);
export const normalizeMachineControllerType = createEnumNormalizer(MachineControllerType);
