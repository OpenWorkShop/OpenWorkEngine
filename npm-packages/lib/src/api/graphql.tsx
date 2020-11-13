import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
};

export type MachineAxis = {
  __typename?: 'MachineAxis';
  accuracy: Scalars['Decimal'];
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  max: Scalars['Decimal'];
  min: Scalars['Decimal'];
  name: AxisName;
  precision: Scalars['Decimal'];
};

export type MachineCommand = {
  __typename?: 'MachineCommand';
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  name: Scalars['String'];
  value: Scalars['String'];
};

export type MachineFeature = {
  __typename?: 'MachineFeature';
  description: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  icon: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  title: Maybe<Scalars['String']>;
};

export type MachineFirmware = {
  __typename?: 'MachineFirmware';
  baudRate: Scalars['Decimal'];
  controllerType: MachineControllerType;
  downloadUrl: Scalars['String'];
  edition: Scalars['String'];
  helpUrl: Scalars['String'];
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  name: Scalars['String'];
  requiredVersion: Scalars['Decimal'];
  rtscts: Scalars['Boolean'];
  suggestedVersion: Scalars['Decimal'];
};

export type MachinePart = {
  __typename?: 'MachinePart';
  dataBlob: Scalars['String'];
  description: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  machineProfiles: Array<MachineProfile>;
  optional: Scalars['Boolean'];
  partType: MachinePartType;
  settings: Array<MachineSetting>;
  sortOrder: Scalars['Int'];
  specs: Array<MachineSpec>;
  title: Maybe<Scalars['String']>;
};

export type MachineProfile = {
  __typename?: 'MachineProfile';
  axes: Array<MachineAxis>;
  brand: Maybe<Scalars['String']>;
  commands: Array<MachineCommand>;
  description: Maybe<Scalars['String']>;
  discontinued: Scalars['Boolean'];
  featured: Scalars['Boolean'];
  features: Array<MachineFeature>;
  firmware: Array<MachineFirmware>;
  icon: Scalars['String'];
  id: Scalars['String'];
  machineCategory: MachineCategory;
  model: Scalars['String'];
  name: Scalars['String'];
  parts: Array<MachinePart>;
};

export type MachineSetting = {
  __typename?: 'MachineSetting';
  id: Scalars['String'];
  key: Scalars['String'];
  machineParts: Array<MachinePart>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type MachineSpec = {
  __typename?: 'MachineSpec';
  id: Scalars['String'];
  machineParts: Array<MachinePart>;
  specType: MachineSpecType;
  value: Scalars['Decimal'];
};

export type Query = {
  __typename?: 'Query';
  machineProfile: MachineProfile;
  machineProfileCount: Scalars['Int'];
  machineProfiles: Array<MachineProfile>;
  me: Maybe<UserProfile>;
  userProfile: UserProfile;
};

export type QueryMachineProfileArgs = {
  id: Scalars['String'];
};

export type QueryMachineProfilesArgs = {
  query: Maybe<Scalars['String']>;
};

export type QueryUserProfileArgs = {
  id: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  authenticationType: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export enum AxisName {
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export enum MachineCategory {
  Cnc = 'CNC',
  Tdp = 'TDP',
}

export enum MachineControllerType {
  Grbl = 'GRBL',
  Marlin = 'MARLIN',
  Maslow = 'MASLOW',
  Smoothie = 'SMOOTHIE',
  TinyG = 'TINY_G',
}

export enum MachinePartType {
  AxisMotor = 'AXIS_MOTOR',
  Board = 'BOARD',
  EmergencyStop = 'EMERGENCY_STOP',
  Heatbed = 'HEATBED',
  Hotend = 'HOTEND',
  LimitSwitches = 'LIMIT_SWITCHES',
  Mmu = 'MMU',
  Nozzle = 'NOZZLE',
  Psu = 'PSU',
  Shield = 'SHIELD',
  Sled = 'SLED',
  Spindle = 'SPINDLE',
  Unknown = 'UNKNOWN',
}

export enum MachineSettingType {
  Grbl = 'GRBL',
  Kv = 'KV',
}

export enum MachineSpecType {
  MaxAmps = 'MAX_AMPS',
  MaxLayerHeight = 'MAX_LAYER_HEIGHT',
  MaxRpm = 'MAX_RPM',
  MaxTemp = 'MAX_TEMP',
  MaxTravelSpeed = 'MAX_TRAVEL_SPEED',
  MaxVolts = 'MAX_VOLTS',
  MaxWatts = 'MAX_WATTS',
  MinLayerHeight = 'MIN_LAYER_HEIGHT',
  NumberOfMaterials = 'NUMBER_OF_MATERIALS',
  TipSize = 'TIP_SIZE',
  Watts = 'WATTS',
  WaveLength = 'WAVE_LENGTH',
}

export type MachineAxisPropsFragment = { __typename?: 'MachineAxis' } & Pick<
  MachineAxis,
  'id' | 'name' | 'min' | 'max' | 'accuracy' | 'precision'
>;

export type MachineCommandPropsFragment = { __typename?: 'MachineCommand' } & Pick<
  MachineCommand,
  'id' | 'name' | 'value'
>;

export type MachineFeaturePropsFragment = { __typename?: 'MachineFeature' } & Pick<
  MachineFeature,
  'id' | 'key' | 'disabled' | 'title' | 'description' | 'icon'
>;

export type MachineFirmwareMinimalFragment = { __typename?: 'MachineFirmware' } & Pick<
  MachineFirmware,
  'controllerType' | 'baudRate' | 'rtscts'
>;

export type MachineFirmwarePropsFragment = { __typename?: 'MachineFirmware' } & Pick<
  MachineFirmware,
  'id' | 'requiredVersion' | 'suggestedVersion' | 'name' | 'edition' | 'downloadUrl' | 'helpUrl'
> &
  MachineFirmwareMinimalFragment;

export type MachinePartPropsFragment = { __typename?: 'MachinePart' } & Pick<
  MachinePart,
  'id' | 'partType' | 'optional' | 'isDefault' | 'sortOrder' | 'title' | 'description' | 'dataBlob'
>;

export type MachinePartCompleteFragment = { __typename?: 'MachinePart' } & {
  settings: Array<{ __typename?: 'MachineSetting' } & MachineSettingPropsFragment>;
  specs: Array<{ __typename?: 'MachineSpec' } & MachineSpecPropsFragment>;
} & MachinePartPropsFragment;

export type MachineProfilePropsFragment = { __typename?: 'MachineProfile' } & Pick<
  MachineProfile,
  'id' | 'name' | 'brand' | 'model' | 'icon' | 'description' | 'machineCategory' | 'discontinued' | 'featured'
>;

export type MachineProfileCompleteFragment = { __typename?: 'MachineProfile' } & {
  firmware: Array<{ __typename?: 'MachineFirmware' } & MachineFirmwarePropsFragment>;
  axes: Array<{ __typename?: 'MachineAxis' } & MachineAxisPropsFragment>;
  parts: Array<{ __typename?: 'MachinePart' } & MachinePartCompleteFragment>;
  commands: Array<{ __typename?: 'MachineCommand' } & MachineCommandPropsFragment>;
  features: Array<{ __typename?: 'MachineFeature' } & MachineFeaturePropsFragment>;
} & MachineProfilePropsFragment;

export type MachineSearchResultFragment = { __typename?: 'MachineProfile' } & MachineProfilePropsFragment;

export type SearchMachineProfilesQueryVariables = Exact<{
  q: Maybe<Scalars['String']>;
}>;

export type SearchMachineProfilesQuery = { __typename?: 'Query' } & {
  machineProfiles: Array<{ __typename?: 'MachineProfile' } & MachineSearchResultFragment>;
};

export type GetCompleteMachineProfileQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetCompleteMachineProfileQuery = { __typename?: 'Query' } & {
  machineProfile: { __typename?: 'MachineProfile' } & MachineProfileCompleteFragment;
};

export type MachineSettingPropsFragment = { __typename?: 'MachineSetting' } & Pick<
  MachineSetting,
  'id' | 'title' | 'settingType' | 'key' | 'value'
>;

export type MachineSpecPropsFragment = { __typename?: 'MachineSpec' } & Pick<MachineSpec, 'id' | 'specType' | 'value'>;

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
    featured
  }
`;
export const MachineFirmwareMinimalFragmentDoc = gql`
  fragment MachineFirmwareMinimal on MachineFirmware {
    controllerType
    baudRate
    rtscts
  }
`;
export const MachineFirmwarePropsFragmentDoc = gql`
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
  ${MachineFirmwareMinimalFragmentDoc}
`;
export const MachineAxisPropsFragmentDoc = gql`
  fragment MachineAxisProps on MachineAxis {
    id
    name
    min
    max
    accuracy
    precision
  }
`;
export const MachinePartPropsFragmentDoc = gql`
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
export const MachineSettingPropsFragmentDoc = gql`
  fragment MachineSettingProps on MachineSetting {
    id
    title
    settingType
    key
    value
  }
`;
export const MachineSpecPropsFragmentDoc = gql`
  fragment MachineSpecProps on MachineSpec {
    id
    specType
    value
  }
`;
export const MachinePartCompleteFragmentDoc = gql`
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
  ${MachineSpecPropsFragmentDoc}
`;
export const MachineCommandPropsFragmentDoc = gql`
  fragment MachineCommandProps on MachineCommand {
    id
    name
    value
  }
`;
export const MachineFeaturePropsFragmentDoc = gql`
  fragment MachineFeatureProps on MachineFeature {
    id
    key
    disabled
    title
    description
    icon
  }
`;
export const MachineProfileCompleteFragmentDoc = gql`
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
  ${MachineFeaturePropsFragmentDoc}
`;
export const MachineSearchResultFragmentDoc = gql`
  fragment MachineSearchResult on MachineProfile {
    ...MachineProfileProps
  }
  ${MachineProfilePropsFragmentDoc}
`;
export const SearchMachineProfilesDocument = gql`
  query searchMachineProfiles($q: String) {
    machineProfiles: machineProfiles(query: $q) {
      ...MachineSearchResult
    }
  }
  ${MachineSearchResultFragmentDoc}
`;

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
export function useSearchMachineProfilesQuery(
  baseOptions?: Apollo.QueryHookOptions<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>,
) {
  return Apollo.useQuery<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>(
    SearchMachineProfilesDocument,
    baseOptions,
  );
}
export function useSearchMachineProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>,
) {
  return Apollo.useLazyQuery<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>(
    SearchMachineProfilesDocument,
    baseOptions,
  );
}
export type SearchMachineProfilesQueryHookResult = ReturnType<typeof useSearchMachineProfilesQuery>;
export type SearchMachineProfilesLazyQueryHookResult = ReturnType<typeof useSearchMachineProfilesLazyQuery>;
export type SearchMachineProfilesQueryResult = Apollo.QueryResult<
  SearchMachineProfilesQuery,
  SearchMachineProfilesQueryVariables
>;
export const GetCompleteMachineProfileDocument = gql`
  query getCompleteMachineProfile($id: String!) {
    machineProfile(id: $id) {
      ...MachineProfileComplete
    }
  }
  ${MachineProfileCompleteFragmentDoc}
`;

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
export function useGetCompleteMachineProfileQuery(
  baseOptions: Apollo.QueryHookOptions<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>,
) {
  return Apollo.useQuery<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>(
    GetCompleteMachineProfileDocument,
    baseOptions,
  );
}
export function useGetCompleteMachineProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>,
) {
  return Apollo.useLazyQuery<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>(
    GetCompleteMachineProfileDocument,
    baseOptions,
  );
}
export type GetCompleteMachineProfileQueryHookResult = ReturnType<typeof useGetCompleteMachineProfileQuery>;
export type GetCompleteMachineProfileLazyQueryHookResult = ReturnType<typeof useGetCompleteMachineProfileLazyQuery>;
export type GetCompleteMachineProfileQueryResult = Apollo.QueryResult<
  GetCompleteMachineProfileQuery,
  GetCompleteMachineProfileQueryVariables
>;
