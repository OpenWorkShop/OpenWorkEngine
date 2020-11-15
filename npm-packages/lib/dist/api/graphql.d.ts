import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The built-in `Decimal` scalar type. */
    Decimal: any;
};
export declare type MachineAxis = {
    __typename?: 'MachineAxis';
    accuracy: Scalars['Decimal'];
    id: Scalars['String'];
    machineProfiles: Array<MachineProfile>;
    max: Scalars['Decimal'];
    min: Scalars['Decimal'];
    name: AxisName;
    precision: Scalars['Decimal'];
};
export declare type MachineCommand = {
    __typename?: 'MachineCommand';
    id: Scalars['String'];
    machineProfiles: Array<MachineProfile>;
    name: Scalars['String'];
    value: Scalars['String'];
};
export declare type MachineFeature = {
    __typename?: 'MachineFeature';
    description: Maybe<Scalars['String']>;
    disabled: Scalars['Boolean'];
    icon: Maybe<Scalars['String']>;
    id: Scalars['String'];
    key: Scalars['String'];
    machineProfiles: Array<MachineProfile>;
    title: Maybe<Scalars['String']>;
};
export declare type MachineFirmware = {
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
export declare type MachinePart = {
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
export declare type MachineProfile = {
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
export declare type MachineSetting = {
    __typename?: 'MachineSetting';
    id: Scalars['String'];
    key: Scalars['String'];
    machineParts: Array<MachinePart>;
    settingType: MachineSettingType;
    title: Maybe<Scalars['String']>;
    value: Scalars['String'];
};
export declare type MachineSpec = {
    __typename?: 'MachineSpec';
    id: Scalars['String'];
    machineParts: Array<MachinePart>;
    specType: MachineSpecType;
    value: Scalars['Decimal'];
};
export declare type Query = {
    __typename?: 'Query';
    machineProfile: MachineProfile;
    machineProfileCount: Scalars['Int'];
    machineProfiles: Array<MachineProfile>;
    me: Maybe<UserProfile>;
    userProfile: UserProfile;
};
export declare type QueryMachineProfileArgs = {
    id: Scalars['String'];
};
export declare type QueryMachineProfilesArgs = {
    query: Maybe<Scalars['String']>;
};
export declare type QueryUserProfileArgs = {
    id: Scalars['String'];
};
export declare type UserProfile = {
    __typename?: 'UserProfile';
    authenticationType: Maybe<Scalars['String']>;
    email: Maybe<Scalars['String']>;
    id: Maybe<Scalars['String']>;
    username: Maybe<Scalars['String']>;
};
export declare enum ApplyPolicy {
    AfterResolver = "AFTER_RESOLVER",
    BeforeResolver = "BEFORE_RESOLVER"
}
export declare enum AxisName {
    X = "X",
    Y = "Y",
    Z = "Z"
}
export declare enum MachineCategory {
    Cnc = "CNC",
    Tdp = "TDP"
}
export declare enum MachineControllerType {
    Grbl = "GRBL",
    Marlin = "MARLIN",
    Maslow = "MASLOW",
    Smoothie = "SMOOTHIE",
    TinyG = "TINY_G"
}
export declare enum MachinePartType {
    AxisMotor = "AXIS_MOTOR",
    Board = "BOARD",
    EmergencyStop = "EMERGENCY_STOP",
    Heatbed = "HEATBED",
    Hotend = "HOTEND",
    LimitSwitches = "LIMIT_SWITCHES",
    Mmu = "MMU",
    Nozzle = "NOZZLE",
    Psu = "PSU",
    Shield = "SHIELD",
    Sled = "SLED",
    Spindle = "SPINDLE",
    Unknown = "UNKNOWN"
}
export declare enum MachineSettingType {
    Grbl = "GRBL",
    Kv = "KV"
}
export declare enum MachineSpecType {
    MaxAmps = "MAX_AMPS",
    MaxLayerHeight = "MAX_LAYER_HEIGHT",
    MaxRpm = "MAX_RPM",
    MaxTemp = "MAX_TEMP",
    MaxTravelSpeed = "MAX_TRAVEL_SPEED",
    MaxVolts = "MAX_VOLTS",
    MaxWatts = "MAX_WATTS",
    MinLayerHeight = "MIN_LAYER_HEIGHT",
    NumberOfMaterials = "NUMBER_OF_MATERIALS",
    TipSize = "TIP_SIZE",
    Watts = "WATTS",
    WaveLength = "WAVE_LENGTH"
}
export declare type MachineAxisPropsFragment = {
    __typename?: 'MachineAxis';
} & Pick<MachineAxis, 'id' | 'name' | 'min' | 'max' | 'accuracy' | 'precision'>;
export declare type MachineCommandPropsFragment = {
    __typename?: 'MachineCommand';
} & Pick<MachineCommand, 'id' | 'name' | 'value'>;
export declare type MachineFeaturePropsFragment = {
    __typename?: 'MachineFeature';
} & Pick<MachineFeature, 'id' | 'key' | 'disabled' | 'title' | 'description' | 'icon'>;
export declare type MachineFirmwareMinimalFragment = {
    __typename?: 'MachineFirmware';
} & Pick<MachineFirmware, 'controllerType' | 'baudRate' | 'rtscts'>;
export declare type MachineFirmwarePropsFragment = {
    __typename?: 'MachineFirmware';
} & Pick<MachineFirmware, 'id' | 'requiredVersion' | 'suggestedVersion' | 'name' | 'edition' | 'downloadUrl' | 'helpUrl'> & MachineFirmwareMinimalFragment;
export declare type MachinePartPropsFragment = {
    __typename?: 'MachinePart';
} & Pick<MachinePart, 'id' | 'partType' | 'optional' | 'isDefault' | 'sortOrder' | 'title' | 'description' | 'dataBlob'>;
export declare type MachinePartCompleteFragment = {
    __typename?: 'MachinePart';
} & {
    settings: Array<{
        __typename?: 'MachineSetting';
    } & MachineSettingPropsFragment>;
    specs: Array<{
        __typename?: 'MachineSpec';
    } & MachineSpecPropsFragment>;
} & MachinePartPropsFragment;
export declare type MachineProfilePropsFragment = {
    __typename?: 'MachineProfile';
} & Pick<MachineProfile, 'id' | 'name' | 'brand' | 'model' | 'icon' | 'description' | 'machineCategory' | 'discontinued' | 'featured'>;
export declare type MachineProfileCompleteFragment = {
    __typename?: 'MachineProfile';
} & {
    firmware: Array<{
        __typename?: 'MachineFirmware';
    } & MachineFirmwarePropsFragment>;
    axes: Array<{
        __typename?: 'MachineAxis';
    } & MachineAxisPropsFragment>;
    parts: Array<{
        __typename?: 'MachinePart';
    } & MachinePartCompleteFragment>;
    commands: Array<{
        __typename?: 'MachineCommand';
    } & MachineCommandPropsFragment>;
    features: Array<{
        __typename?: 'MachineFeature';
    } & MachineFeaturePropsFragment>;
} & MachineProfilePropsFragment;
export declare type MachineSearchResultFragment = {
    __typename?: 'MachineProfile';
} & MachineProfilePropsFragment;
export declare type SearchMachineProfilesQueryVariables = Exact<{
    q: Maybe<Scalars['String']>;
}>;
export declare type SearchMachineProfilesQuery = {
    __typename?: 'Query';
} & {
    machineProfiles: Array<{
        __typename?: 'MachineProfile';
    } & MachineSearchResultFragment>;
};
export declare type GetCompleteMachineProfileQueryVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type GetCompleteMachineProfileQuery = {
    __typename?: 'Query';
} & {
    machineProfile: {
        __typename?: 'MachineProfile';
    } & MachineProfileCompleteFragment;
};
export declare type MachineSettingPropsFragment = {
    __typename?: 'MachineSetting';
} & Pick<MachineSetting, 'id' | 'title' | 'settingType' | 'key' | 'value'>;
export declare type MachineSpecPropsFragment = {
    __typename?: 'MachineSpec';
} & Pick<MachineSpec, 'id' | 'specType' | 'value'>;
export declare const MachineProfilePropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineFirmwareMinimalFragmentDoc: Apollo.DocumentNode;
export declare const MachineFirmwarePropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineAxisPropsFragmentDoc: Apollo.DocumentNode;
export declare const MachinePartPropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineSettingPropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineSpecPropsFragmentDoc: Apollo.DocumentNode;
export declare const MachinePartCompleteFragmentDoc: Apollo.DocumentNode;
export declare const MachineCommandPropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineFeaturePropsFragmentDoc: Apollo.DocumentNode;
export declare const MachineProfileCompleteFragmentDoc: Apollo.DocumentNode;
export declare const MachineSearchResultFragmentDoc: Apollo.DocumentNode;
export declare const SearchMachineProfilesDocument: Apollo.DocumentNode;
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
export declare function useSearchMachineProfilesQuery(baseOptions?: Apollo.QueryHookOptions<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>): Apollo.QueryResult<SearchMachineProfilesQuery, Exact<{
    q: Maybe<string>;
}>>;
export declare function useSearchMachineProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>): Apollo.QueryTuple<SearchMachineProfilesQuery, Exact<{
    q: Maybe<string>;
}>>;
export declare type SearchMachineProfilesQueryHookResult = ReturnType<typeof useSearchMachineProfilesQuery>;
export declare type SearchMachineProfilesLazyQueryHookResult = ReturnType<typeof useSearchMachineProfilesLazyQuery>;
export declare type SearchMachineProfilesQueryResult = Apollo.QueryResult<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>;
export declare const GetCompleteMachineProfileDocument: Apollo.DocumentNode;
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
export declare function useGetCompleteMachineProfileQuery(baseOptions: Apollo.QueryHookOptions<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>): Apollo.QueryResult<GetCompleteMachineProfileQuery, Exact<{
    id: string;
}>>;
export declare function useGetCompleteMachineProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>): Apollo.QueryTuple<GetCompleteMachineProfileQuery, Exact<{
    id: string;
}>>;
export declare type GetCompleteMachineProfileQueryHookResult = ReturnType<typeof useGetCompleteMachineProfileQuery>;
export declare type GetCompleteMachineProfileLazyQueryHookResult = ReturnType<typeof useGetCompleteMachineProfileLazyQuery>;
export declare type GetCompleteMachineProfileQueryResult = Apollo.QueryResult<GetCompleteMachineProfileQuery, GetCompleteMachineProfileQueryVariables>;
