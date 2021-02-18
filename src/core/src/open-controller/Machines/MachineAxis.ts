import {IMachineAxis, MachineAxisMap} from './types';
import * as THREE from 'three';
import _ from 'lodash';
import {AxisName, UnitType} from '../graphql';
import {inchesMillimetersConversion, mm2} from '../../components/Units';

interface IJogStepsOpts {
  units?: UnitType;
  min?: number;
  max?: number;
}

export function getMachineAxisMap(axes: IMachineAxis[]): MachineAxisMap {
  return _.keyBy(axes, (a) => a.name);
}

// Convert a value on the axis to a string, rounding it to the appropriate precision.
function getAxisValueString(val: string | number, precision: number, units?: UnitType): string {
  // Since inches are ~= 1 order of magnitude less precise than millimeters...
  precision = precision + (units === UnitType.Imperial ? 1 : 0);
  const str = Number(val || 0).toFixed(precision);
  return precision > 0 ? str : str.split('.')[0];
}

export function axisRound(axis: IMachineAxis, val: string | number, units?: UnitType): number {
  return Number(getAxisValueString(val, axis.precision, units));
}

export function getMachineAxisRange(axis: IMachineAxis): number {
  return Math.max(0, axis.max - axis.min);
}

// Iterate all cells in the axis, invoking the callback with the position, as well as boolean majorStep?
// Guaranteed to use even steps, as well as contain a zero position.
export function iterateMachineAxisGridLines(
  axis: IMachineAxis,
  callback: (dist: number, isMajor: boolean, isEdge: boolean) => void,
  units: UnitType
): void {
  const isImperialUnits = units === UnitType.Imperial;
  const step = isImperialUnits ? inchesMillimetersConversion : 10;
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
  const range = getMachineAxisRange(axis);
  const max = mm2(opts.max || range / 2, opts.units) || 0;
  const min = mm2(opts.min || axis.accuracy, opts.units) || 0;

  const frt = [0.0001, 0.001, 0.01, 0.10, 0.25, 0.50];
  const mms = frt.concat([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000]);
  const ins = frt.concat([1, 2, 4, 6, 12, 24, 48]);
  const def = opts.units === UnitType.Imperial ? ins : mms;
  return _.uniq(def.filter(v => v >= min && v <= max).concat(axisRound(axis, max, opts.units)));
/*
  const steps: number[] = [];

  const addVal = (val: number): void => {
    steps.push(axisRound(axis, mm2(val, opts.units) || 0, opts.units));
  };

  for (let v = min; v < max; v *= 10) {
    addVal(v);
    const v2 = v * 10;
    if (v2 < max) {
      addVal(v2 / 2);
    }
  }
  // Remove the last element and add it in-order with the second-biggest element.
  const last = steps.pop() || 0;
  const next = max / 2;
  //addVal(Math.min(last, next));
  addVal(Math.max(last, next));
  addVal(max);

  console.log(axis, opts, steps);
  return steps;*/
}

// Get a box containing all axes.
export function getMachineAxisBoundingBox(axes: IMachineAxis[]): THREE.Box3  {
  const min = new THREE.Vector3();
  const max = new THREE.Vector3();
  axes.forEach((a) => {
    if (a.name === AxisName.X) {
      min.x = a.min;
      max.x = a.max;
    }
    if (a.name === AxisName.Y) {
      min.y = a.min;
      max.y = a.max;
    }
    if (a.name === AxisName.Z) {
      min.z = a.min;
      max.z = a.max;
    }
  });
  return new THREE.Box3(min, max);
}
