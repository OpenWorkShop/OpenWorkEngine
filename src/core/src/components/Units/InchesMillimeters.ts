import {UnitType} from '../../open-controller/graphql';

export const inchesMillimetersConversion = 25.4;

export function in2mm(inches: number): number {
  return inches * inchesMillimetersConversion;
}

export function mm2in(mm: number): number {
  return mm / inchesMillimetersConversion;
}

export function mm2(value: number | null | undefined, units?: UnitType): number | null | undefined {
  if (value === undefined || value === null || units === undefined || units === UnitType.Metric) return value;
  return mm2in(value);
}

export function getDistanceUnitAbbreviationKey(units: UnitType, dot = true): string {
  return (units === UnitType.Imperial ? 'in' : 'mm') + (dot ? '.' : '');
}

export function getDistanceUnitIconKey(units: UnitType): string {
  return units === UnitType.Imperial ? 'ruler-imperial' : 'ruler-metric';
}

