import _ from 'lodash';

export function createEnumChecker<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }): (v: string) => boolean {
  const enumValues = Object.values(enumVariable);
  return (value: string): value is TEnumValue => enumValues.includes(value);
}

export function createEnumNormalizer<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }): (v: string) => TEnumValue | undefined {
  const enumKeys: string[] = Object.keys(enumVariable);
  const enumValues: TEnumValue[] = Object.values(enumVariable);
  return (value: string): TEnumValue | undefined => {
    const val = _.find(enumValues, (ev) => ev.toString() === value);
    if (val) return val;
    const idx = enumKeys.indexOf(value);
    return idx >= 0 ? enumValues[idx] : undefined;
  };
}

export function createEnumKeyer<T extends string, TEnumValue extends string>(enumVariable: { [key in T]: TEnumValue }): (v: string) => string | undefined {
  const enumKeys: string[] = Object.keys(enumVariable);
  const enumValues: TEnumValue[] = Object.values(enumVariable);
  return (value: string): string | undefined => {
    const idx = _.findIndex(enumValues, (ev) => ev.toString() === value);
    return idx >= 0 ? enumKeys[idx] : undefined;
  };
}

export default {};
