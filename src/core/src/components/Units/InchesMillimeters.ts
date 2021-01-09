export const inchesMillimetersConversion = 25.4;

export function in2mm(inches: number) {
  return inches * inchesMillimetersConversion;
}

export function mm2in(mm: number) {
  return mm / inchesMillimetersConversion;
}

export function getDistanceUnitAbbreviationKey(imperial: boolean) {
  return imperial ? 'in.' : 'mm.';
}

export function getDistanceUnitIconKey(imperial: boolean) {
  return imperial ? 'ruler-imperial' : 'ruler-metric';
}

