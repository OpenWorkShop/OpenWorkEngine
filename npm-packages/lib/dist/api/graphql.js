import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export var ApplyPolicy;
(function (ApplyPolicy) {
    ApplyPolicy["AfterResolver"] = "AFTER_RESOLVER";
    ApplyPolicy["BeforeResolver"] = "BEFORE_RESOLVER";
})(ApplyPolicy || (ApplyPolicy = {}));
export var AxisName;
(function (AxisName) {
    AxisName["X"] = "X";
    AxisName["Y"] = "Y";
    AxisName["Z"] = "Z";
})(AxisName || (AxisName = {}));
export var MachineCategory;
(function (MachineCategory) {
    MachineCategory["Cnc"] = "CNC";
    MachineCategory["Tdp"] = "TDP";
})(MachineCategory || (MachineCategory = {}));
export var MachineControllerType;
(function (MachineControllerType) {
    MachineControllerType["Grbl"] = "GRBL";
    MachineControllerType["Marlin"] = "MARLIN";
    MachineControllerType["Maslow"] = "MASLOW";
    MachineControllerType["Smoothie"] = "SMOOTHIE";
    MachineControllerType["TinyG"] = "TINY_G";
})(MachineControllerType || (MachineControllerType = {}));
export var MachinePartType;
(function (MachinePartType) {
    MachinePartType["AxisMotor"] = "AXIS_MOTOR";
    MachinePartType["Board"] = "BOARD";
    MachinePartType["EmergencyStop"] = "EMERGENCY_STOP";
    MachinePartType["Heatbed"] = "HEATBED";
    MachinePartType["Hotend"] = "HOTEND";
    MachinePartType["LimitSwitches"] = "LIMIT_SWITCHES";
    MachinePartType["Mmu"] = "MMU";
    MachinePartType["Nozzle"] = "NOZZLE";
    MachinePartType["Psu"] = "PSU";
    MachinePartType["Shield"] = "SHIELD";
    MachinePartType["Sled"] = "SLED";
    MachinePartType["Spindle"] = "SPINDLE";
    MachinePartType["Unknown"] = "UNKNOWN";
})(MachinePartType || (MachinePartType = {}));
export var MachineSettingType;
(function (MachineSettingType) {
    MachineSettingType["Grbl"] = "GRBL";
    MachineSettingType["Kv"] = "KV";
})(MachineSettingType || (MachineSettingType = {}));
export var MachineSpecType;
(function (MachineSpecType) {
    MachineSpecType["MaxAmps"] = "MAX_AMPS";
    MachineSpecType["MaxLayerHeight"] = "MAX_LAYER_HEIGHT";
    MachineSpecType["MaxRpm"] = "MAX_RPM";
    MachineSpecType["MaxTemp"] = "MAX_TEMP";
    MachineSpecType["MaxTravelSpeed"] = "MAX_TRAVEL_SPEED";
    MachineSpecType["MaxVolts"] = "MAX_VOLTS";
    MachineSpecType["MaxWatts"] = "MAX_WATTS";
    MachineSpecType["MinLayerHeight"] = "MIN_LAYER_HEIGHT";
    MachineSpecType["NumberOfMaterials"] = "NUMBER_OF_MATERIALS";
    MachineSpecType["TipSize"] = "TIP_SIZE";
    MachineSpecType["Watts"] = "WATTS";
    MachineSpecType["WaveLength"] = "WAVE_LENGTH";
})(MachineSpecType || (MachineSpecType = {}));
export const MachineProfilePropsFragmentDoc = gql `
    fragment MachineProfileProps on MachineProfile {
  id
  name
  brand
  model
  icon
  description
  machineCategory
  discontinued
  featured
}
    `;
export const MachineFirmwareMinimalFragmentDoc = gql `
    fragment MachineFirmwareMinimal on MachineFirmware {
  controllerType
  baudRate
  rtscts
}
    `;
export const MachineFirmwarePropsFragmentDoc = gql `
    fragment MachineFirmwareProps on MachineFirmware {
  id
  ...MachineFirmwareMinimal
  requiredVersion
  suggestedVersion
  name
  edition
  downloadUrl
  helpUrl
}
    ${MachineFirmwareMinimalFragmentDoc}`;
export const MachineAxisPropsFragmentDoc = gql `
    fragment MachineAxisProps on MachineAxis {
  id
  name
  min
  max
  accuracy
  precision
}
    `;
export const MachinePartPropsFragmentDoc = gql `
    fragment MachinePartProps on MachinePart {
  id
  partType
  optional
  isDefault
  sortOrder
  title
  description
  dataBlob
}
    `;
export const MachineSettingPropsFragmentDoc = gql `
    fragment MachineSettingProps on MachineSetting {
  id
  title
  settingType
  key
  value
}
    `;
export const MachineSpecPropsFragmentDoc = gql `
    fragment MachineSpecProps on MachineSpec {
  id
  specType
  value
}
    `;
export const MachinePartCompleteFragmentDoc = gql `
    fragment MachinePartComplete on MachinePart {
  ...MachinePartProps
  settings {
    ...MachineSettingProps
  }
  specs {
    ...MachineSpecProps
  }
}
    ${MachinePartPropsFragmentDoc}
${MachineSettingPropsFragmentDoc}
${MachineSpecPropsFragmentDoc}`;
export const MachineCommandPropsFragmentDoc = gql `
    fragment MachineCommandProps on MachineCommand {
  id
  name
  value
}
    `;
export const MachineFeaturePropsFragmentDoc = gql `
    fragment MachineFeatureProps on MachineFeature {
  id
  key
  disabled
  title
  description
  icon
}
    `;
export const MachineProfileCompleteFragmentDoc = gql `
    fragment MachineProfileComplete on MachineProfile {
  ...MachineProfileProps
  firmware {
    ...MachineFirmwareProps
  }
  axes {
    ...MachineAxisProps
  }
  parts {
    ...MachinePartComplete
  }
  commands {
    ...MachineCommandProps
  }
  features {
    ...MachineFeatureProps
  }
}
    ${MachineProfilePropsFragmentDoc}
${MachineFirmwarePropsFragmentDoc}
${MachineAxisPropsFragmentDoc}
${MachinePartCompleteFragmentDoc}
${MachineCommandPropsFragmentDoc}
${MachineFeaturePropsFragmentDoc}`;
export const MachineSearchResultFragmentDoc = gql `
    fragment MachineSearchResult on MachineProfile {
  ...MachineProfileProps
}
    ${MachineProfilePropsFragmentDoc}`;
export const SearchMachineProfilesDocument = gql `
    query searchMachineProfiles($q: String) {
  machineProfiles: machineProfiles(query: $q) {
    ...MachineSearchResult
  }
}
    ${MachineSearchResultFragmentDoc}`;
/**
 * __useSearchMachineProfilesQuery__
 *
 * To run a query within a React component, call `useSearchMachineProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMachineProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMachineProfilesQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useSearchMachineProfilesQuery(baseOptions) {
    return Apollo.useQuery(SearchMachineProfilesDocument, baseOptions);
}
export function useSearchMachineProfilesLazyQuery(baseOptions) {
    return Apollo.useLazyQuery(SearchMachineProfilesDocument, baseOptions);
}
export const GetCompleteMachineProfileDocument = gql `
    query getCompleteMachineProfile($id: String!) {
  machineProfile(id: $id) {
    ...MachineProfileComplete
  }
}
    ${MachineProfileCompleteFragmentDoc}`;
/**
 * __useGetCompleteMachineProfileQuery__
 *
 * To run a query within a React component, call `useGetCompleteMachineProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompleteMachineProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompleteMachineProfileQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCompleteMachineProfileQuery(baseOptions) {
    return Apollo.useQuery(GetCompleteMachineProfileDocument, baseOptions);
}
export function useGetCompleteMachineProfileLazyQuery(baseOptions) {
    return Apollo.useLazyQuery(GetCompleteMachineProfileDocument, baseOptions);
}
//# sourceMappingURL=graphql.js.map