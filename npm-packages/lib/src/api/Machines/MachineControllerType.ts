import _ from 'lodash';
import { MachineControllerType } from '../graphql';

function createEnumChecker<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }) {
  const enumValues = Object.values(enumVariable);
  return (value: string): value is TEnumValue => enumValues.includes(value);
}

function createEnumNormalizer<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }) {
  const enumKeys: string[] = Object.keys(enumVariable);
  const enumValues: TEnumValue[] = Object.values(enumVariable);
  return (value: string): TEnumValue | undefined => {
    const val = _.find(enumValues, (ev) => ev.toString() === value);
    if (val) return val;
    const idx = enumKeys.indexOf(value);
    return idx >= 0 ? enumValues[idx] : undefined;
  };
}

export const isMachineControllerType = createEnumChecker(MachineControllerType);
export const normalizeMachineControllerType = createEnumNormalizer(MachineControllerType);
