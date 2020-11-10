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
  description?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  title?: Maybe<Scalars['String']>;
};

export type MachineFirmware = {
  __typename?: 'MachineFirmware';
  baudRate: Scalars['Decimal'];
  controllerType: ControllerType;
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  optional: Scalars['Boolean'];
  partType: MachinePartType;
  settings?: Maybe<Array<Maybe<MachineSetting>>>;
  sortOrder: Scalars['Int'];
  specs?: Maybe<Array<Maybe<MachineSpec>>>;
  title?: Maybe<Scalars['String']>;
};

export type MachineProfile = {
  __typename?: 'MachineProfile';
  axes?: Maybe<Array<Maybe<MachineAxis>>>;
  brand?: Maybe<Scalars['String']>;
  commands?: Maybe<Array<Maybe<MachineCommand>>>;
  description?: Maybe<Scalars['String']>;
  discontinued: Scalars['Boolean'];
  features?: Maybe<Array<Maybe<MachineFeature>>>;
  firmware?: Maybe<Array<Maybe<MachineFirmware>>>;
  icon: Scalars['String'];
  id: Scalars['String'];
  machineCategory: MachineCategory;
  model: Scalars['String'];
  name: Scalars['String'];
  parts?: Maybe<Array<Maybe<MachinePart>>>;
};

export type MachineSetting = {
  __typename?: 'MachineSetting';
  id: Scalars['String'];
  key: Scalars['String'];
  machineParts: Array<MachinePart>;
  settingType: MachineSettingType;
  title?: Maybe<Scalars['String']>;
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
  machineProfiles: Array<MachineProfile>;
  me?: Maybe<UserProfile>;
  userProfile: UserProfile;
};

export type QueryMachineProfilesArgs = {
  query?: Maybe<Scalars['String']>;
};

export type QueryUserProfileArgs = {
  id: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  authenticationType?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
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

export enum ControllerType {
  Grbl = 'GRBL',
  Marlin = 'MARLIN',
  Maslow = 'MASLOW',
  Smoothie = 'SMOOTHIE',
  TinyG = 'TINY_G',
}

export enum MachineCategory {
  Cnc = 'CNC',
  Tdp = 'TDP',
}

export enum MachinePartType {
  AxisMotor = 'AXIS_MOTOR',
  Board = 'BOARD',
  EmergencyStop = 'EMERGENCY_STOP',
  Heatbed = 'HEATBED',
  Hotend = 'HOTEND',
  LimitSwitches = 'LIMIT_SWITCHES',
  Mmu = 'MMU',
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
  LimitSwitches = 'LIMIT_SWITCHES',
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

export type MachineProfilePropsFragment = { __typename?: 'MachineProfile' } & Pick<
  MachineProfile,
  'id' | 'name' | 'brand' | 'model' | 'icon' | 'description' | 'machineCategory' | 'discontinued'
>;

export type SearchMachinesQueryVariables = Exact<{ [key: string]: never }>;

export type SearchMachinesQuery = { __typename?: 'Query' } & {
  machineProfiles: Array<
    { __typename?: 'MachineProfile' } & Pick<
      MachineProfile,
      'id' | 'name' | 'brand' | 'model' | 'icon' | 'description' | 'machineCategory' | 'discontinued'
    >
  >;
};

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
export function useSearchMachinesQuery(
  baseOptions?: Apollo.QueryHookOptions<SearchMachinesQuery, SearchMachinesQueryVariables>,
) {
  return Apollo.useQuery<SearchMachinesQuery, SearchMachinesQueryVariables>(SearchMachinesDocument, baseOptions);
}
export function useSearchMachinesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchMachinesQuery, SearchMachinesQueryVariables>,
) {
  return Apollo.useLazyQuery<SearchMachinesQuery, SearchMachinesQueryVariables>(SearchMachinesDocument, baseOptions);
}
export type SearchMachinesQueryHookResult = ReturnType<typeof useSearchMachinesQuery>;
export type SearchMachinesLazyQueryHookResult = ReturnType<typeof useSearchMachinesLazyQuery>;
export type SearchMachinesQueryResult = Apollo.QueryResult<SearchMachinesQuery, SearchMachinesQueryVariables>;
