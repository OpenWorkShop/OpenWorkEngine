import {AxisPlane, CircleDirection, FeedRateMode, MachineMotionType, MovementDistanceType, UnitType} from '../graphql';
import {createEnumKeyer, createEnumNormalizer} from '../../utils/enums';
import _ from 'lodash';
import {SelectItemIcon} from '../../components/Forms/IconSelect';

export function createEnumTitle<T extends string, TEnumValue extends string>(
  enumVariable: { [key in T]: TEnumValue }
): (v: TEnumValue) => string {
  const keyer = createEnumKeyer(enumVariable);
  const norm = createEnumNormalizer(enumVariable);
  return (ev: TEnumValue) => {
    const n = norm(ev.toString())?.toString() ?? ev.toString();
    if (['XY', 'XZ', 'YZ', 'CCW', 'CW'].includes(n)) return n;
    return n.includes('_') ?
      n.split('_').map(s => s.substr(0, 1) + s.substr(1).toLowerCase()).join(' ') :
      (keyer(ev.toString())?.toString() ?? ev.toString());
  };
}

export const getUnitTypeTitleKey = createEnumTitle(UnitType);
export const getDistanceTitleKey = createEnumTitle(MovementDistanceType);
export const getMotionTypeTitleKey = createEnumTitle(MachineMotionType);
export const getFeedRateTitleKey = createEnumTitle(FeedRateMode);
export const getAxisPlaneTitleKey = createEnumTitle(AxisPlane);
export const getSpinDirectionTitleKey = createEnumTitle(CircleDirection);

export function getModalEnum<T extends string, TEnumValue extends string>(
  title: string, value: string, enumVariable: { [key in T]: TEnumValue }, titlizer: (k: TEnumValue) => string
): [string, string, SelectItemIcon[]] {
  const enumValues: TEnumValue[] = Object.values(enumVariable);
  const val = _.find(enumValues, (ev) => ev.toString() === value);
  return [title, val ?? value, enumValues.map(ev => {
    return { itemId: ev.toString(), title: titlizer(ev) };
  })];
}

// [title, value, options[]]
export function getModalOptions(typename: string, value:  string): [string, string, SelectItemIcon[]] {
  if (!typename.startsWith('MachineModalStateOf')) {
    return [typename, value, []];
  }
  const tn = typename.substr('MachineModalStateOf'.length);

  if (tn === 'UnitType') return getModalEnum('Units', value, UnitType, getUnitTypeTitleKey);
  if (tn === 'MovementDistanceType') return getModalEnum('Distance', value, MovementDistanceType, getDistanceTitleKey);
  if (tn === 'FeedRateMode') return getModalEnum('Feed Rate', value, FeedRateMode, getFeedRateTitleKey);
  if (tn === 'MachineMotionType') return getModalEnum('Motion', value, MachineMotionType, getMotionTypeTitleKey);
  if (tn === 'AxisPlane') return getModalEnum('Axis Plane', value, AxisPlane, getAxisPlaneTitleKey);
  if (tn === 'SpinDirection') return getModalEnum('Spindle Direction', value, CircleDirection, getSpinDirectionTitleKey);
  // if (tn === 'AxisPlane') return t('Axis Plane');
  return [tn, value, []];
}