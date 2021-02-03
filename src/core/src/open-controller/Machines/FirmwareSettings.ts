import {
  AxisFlags,
  FirmwareSettingPolymorphicFragment,
  KinematicsMode,
  MachineSettingUnits,
  StatusReportType
} from '../graphql';
import {FirmwareSettingsGroupName} from './types';
import {titlize} from '../../utils';

export function getFirmwareSettingsGroupTitleKey(group: FirmwareSettingsGroupName): string {
  if (group === 'applicator') return 'Spindle';
  return titlize(group);
}

export function getUnitsShort(units: MachineSettingUnits): string {
  if (units === MachineSettingUnits.Microseconds) return 'µs';
  if (units === MachineSettingUnits.Millimeters) return 'mm';
  if (units === MachineSettingUnits.MillimetersPerMinute) return 'mm/m';
  if (units === MachineSettingUnits.MillimetersPerSecondsSquared) return 'mm/s²';
  if (units === MachineSettingUnits.Milliseconds) return 'ms';
  if (units === MachineSettingUnits.Newtons) return 'N';
  if (units === MachineSettingUnits.Percent) return '%';
  if (units === MachineSettingUnits.Pid) return 'PID';
  if (units === MachineSettingUnits.Rpm) return 'RPM';
  if (units === MachineSettingUnits.StepsPerMillimeter) return 's/mm';
  return ''; // Just render nothing when no units.
}

export function getParsedValueString(s: FirmwareSettingPolymorphicFragment): string {
  const val = s.currentValue;
  if (!val) return s.value;
  if (val.__typename === 'ParsedBool') return (val.valueBool ?? false).toString();
  if (val.__typename === 'ParsedString') return val.valueString;
  if (val.__typename === 'ParsedDecimal') return val.valueDecimal?.toString();
  if (val.__typename === 'ParsedAxisFlags') {
    let ret = '';
    if (val.valueAxisFlags?.x) ret += 'X';
    if (val.valueAxisFlags?.y) ret += 'Y';
    if (val.valueAxisFlags?.z) ret += 'Z';
    if (ret.length === 0) ret = '(None)';
    return ret;
  }
  if (val.__typename === 'ParsedEnumOfKinematicsMode') return val.valueKinematicsMode?.toString();
  if (val.__typename === 'ParsedEnumOfStatusReportType') return val.valueStatusReportType?.toString();
  return s.value;
}

export function getKinematicsModeTitleKey(km: KinematicsMode): string {
  return titlize(km.toString());
}

export function getStatusReportTitleKey(km: StatusReportType): string {
  return titlize(km.toString());
}

export function getAxisFlagMask(axisFlags: AxisFlags): number {
  let ret = 0;
  if (axisFlags.x) ret += (1 << 0);
  if (axisFlags.y) ret += (1 << 1);
  if (axisFlags.z) ret += (1 << 2);
  return ret;
}

export function hasSettingChanged(setting: FirmwareSettingPolymorphicFragment, newValStr: string): boolean {
  const val = setting.currentValue;
  if (!val) return setting.value !== newValStr;

  if (val.__typename === 'ParsedDecimal') {
    return val.valueDecimal !== Number(newValStr);
  }
  if (val.__typename === 'ParsedBool') {
    const num = Number(newValStr);
    const bool = (!Number.isNaN(num) && num != 0) || newValStr.toLowerCase() === 'true';
    console.log(val.valueBool, newValStr, num, bool, val.valueBool !== bool);
    return val.valueBool !== bool;
  }
  return setting.value !== newValStr;
}