import {IMachineAxis} from './types';

const INCH = 25.4;

interface IJogStepsOpts {
  imperialUnits?: boolean;
  min: number;
  max: number;
}

// Convert a value on the axis to a string, rounding it to the appropriate precision.
function getAxisValueString(val: string | number, precision: number, isImperial: boolean): string {
  // Since inches are ~= 1 order of magnitude less precise than millimeters...
  precision = precision + (isImperial ? 1 : 0);
  const str = Number(val || 0).toFixed(precision);
  return precision > 0 ? str : str.split('.')[0];
}

function axisRound(axis: IMachineAxis, val: string | number, isImperialUnits: boolean): number {
  return Number(getAxisValueString(val, axis.precision, isImperialUnits));
}

export function getMachineAxisRange(axis: IMachineAxis): number {
  return Math.max(0, axis.max - axis.min);
}

// Iterate all cells in the axis, invoking the callback with the position, as well as boolean majorStep?
// Guaranteed to use even steps, as well as contain a zero position.
export function iterateMachineAxisGridLines(
  axis: IMachineAxis,
  callback: (dist: number, isMajor: boolean, isEdge: boolean) => void,
  isImperialUnits: boolean
): void {
  const step = isImperialUnits ? INCH : 10;
  const majorStep = isImperialUnits ? 12 : 10;
  const numNegativeSteps = Math.ceil(axis.min < 0 ? (-axis.min / step) : 0);
  const numPositiveSteps = Math.ceil(axis.max > 0 ? (axis.max / step) : 0);
  let lastVal = axis.min - 1;
  for (let i = -numNegativeSteps; i <= numPositiveSteps; i += 1) {
    let val = i * step;
    let edge = Math.abs(val) <= 0.0001; // Center line.
    if (val <= axis.min) {
      val = axis.min;
      edge = true;
    }
    if (val >= axis.max) {
      val = axis.max;
      edge = true;
    }
    if (val > 0 && lastVal < 0) {
      // Skipped zero. Add a center-line.
      callback(0, false, true);
    }
    lastVal = val;
    callback(val, Math.abs(i) % majorStep === 0, edge);
  }
}

// Returns an array of jog steps for this axis.
export function getMachineAxisJogSteps(axis: IMachineAxis, opts: IJogStepsOpts): number[] {
  const isImperialUnits = !!opts.imperialUnits;
  const range = getMachineAxisRange(axis);
  const max = opts.max || range / 2;
  const min = opts.min || axis.accuracy;
  const steps = [];
  for (let v = min; v < max; v *= 10) {
    steps.push(axisRound(axis, v, isImperialUnits));
    const v2 = v * 10;
    if (v2 < max) {
      steps.push(axisRound(axis, v2 / 2, isImperialUnits));
    }
  }
  // Remove the last element and add it in-order with the second-biggest element.
  const last = steps.pop() || 0;
  const next = axisRound(axis, max / 2, isImperialUnits);
  steps.push(Math.min(last, next));
  steps.push(Math.max(last, next));

  steps.push(max);
  return steps;
}
