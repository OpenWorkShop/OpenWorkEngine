import {UnitType} from './types';

export const inchesMillimetersConversion = 25.4;

export function in2mm(inches: number) {
  return inches * inchesMillimetersConversion;
}

export function mm2in(mm: number) {
  return mm / inchesMillimetersConversion;
}

export function getDistanceUnitAbbreviationKey(units: UnitType) {
  return units === UnitType.Imperial ? 'in.' : 'mm.';
}

export function getDistanceUnitIconKey(units: UnitType) {
  return units === UnitType.Imperial ? 'ruler-imperial' : 'ruler-metric';
}

