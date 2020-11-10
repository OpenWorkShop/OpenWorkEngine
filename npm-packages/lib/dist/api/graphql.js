import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export var ApplyPolicy;
(function (ApplyPolicy) {
  ApplyPolicy['AfterResolver'] = 'AFTER_RESOLVER';
  ApplyPolicy['BeforeResolver'] = 'BEFORE_RESOLVER';
})(ApplyPolicy || (ApplyPolicy = {}));
export var AxisName;
(function (AxisName) {
  AxisName['X'] = 'X';
  AxisName['Y'] = 'Y';
  AxisName['Z'] = 'Z';
})(AxisName || (AxisName = {}));
export var ControllerType;
(function (ControllerType) {
  ControllerType['Grbl'] = 'GRBL';
  ControllerType['Marlin'] = 'MARLIN';
  ControllerType['Maslow'] = 'MASLOW';
  ControllerType['Smoothie'] = 'SMOOTHIE';
  ControllerType['TinyG'] = 'TINY_G';
})(ControllerType || (ControllerType = {}));
export var MachineCategory;
(function (MachineCategory) {
  MachineCategory['Cnc'] = 'CNC';
  MachineCategory['Tdp'] = 'TDP';
})(MachineCategory || (MachineCategory = {}));
export var MachinePartType;
(function (MachinePartType) {
  MachinePartType['AxisMotor'] = 'AXIS_MOTOR';
  MachinePartType['Board'] = 'BOARD';
  MachinePartType['EmergencyStop'] = 'EMERGENCY_STOP';
  MachinePartType['Heatbed'] = 'HEATBED';
  MachinePartType['Hotend'] = 'HOTEND';
  MachinePartType['LimitSwitches'] = 'LIMIT_SWITCHES';
  MachinePartType['Mmu'] = 'MMU';
  MachinePartType['Psu'] = 'PSU';
  MachinePartType['Shield'] = 'SHIELD';
  MachinePartType['Sled'] = 'SLED';
  MachinePartType['Spindle'] = 'SPINDLE';
  MachinePartType['Unknown'] = 'UNKNOWN';
})(MachinePartType || (MachinePartType = {}));
export var MachineSettingType;
(function (MachineSettingType) {
  MachineSettingType['Grbl'] = 'GRBL';
  MachineSettingType['Kv'] = 'KV';
})(MachineSettingType || (MachineSettingType = {}));
export var MachineSpecType;
(function (MachineSpecType) {
  MachineSpecType['LimitSwitches'] = 'LIMIT_SWITCHES';
  MachineSpecType['MaxAmps'] = 'MAX_AMPS';
  MachineSpecType['MaxLayerHeight'] = 'MAX_LAYER_HEIGHT';
  MachineSpecType['MaxRpm'] = 'MAX_RPM';
  MachineSpecType['MaxTemp'] = 'MAX_TEMP';
  MachineSpecType['MaxTravelSpeed'] = 'MAX_TRAVEL_SPEED';
  MachineSpecType['MaxVolts'] = 'MAX_VOLTS';
  MachineSpecType['MaxWatts'] = 'MAX_WATTS';
  MachineSpecType['MinLayerHeight'] = 'MIN_LAYER_HEIGHT';
  MachineSpecType['NumberOfMaterials'] = 'NUMBER_OF_MATERIALS';
  MachineSpecType['TipSize'] = 'TIP_SIZE';
  MachineSpecType['Watts'] = 'WATTS';
  MachineSpecType['WaveLength'] = 'WAVE_LENGTH';
})(MachineSpecType || (MachineSpecType = {}));
export const MachineProfilePropsFragmentDoc = gql`
  fragment MachineProfileProps on MachineProfile {
    id
    name
    brand
    model
    icon
    description
    machineCategory
    discontinued
  }
`;
export const SearchMachinesDocument = gql`
  query searchMachines {
    machineProfiles: machineProfiles {
      id
      name
      brand
      model
      icon
      description
      machineCategory
      discontinued
    }
  }
`;
/**
 * __useSearchMachinesQuery__
 *
 * To run a query within a React component, call `useSearchMachinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMachinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMachinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchMachinesQuery(baseOptions) {
  return Apollo.useQuery(SearchMachinesDocument, baseOptions);
}
export function useSearchMachinesLazyQuery(baseOptions) {
  return Apollo.useLazyQuery(SearchMachinesDocument, baseOptions);
}
//# sourceMappingURL=graphql.js.map
