import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
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
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    MachineAxis: ResolverTypeWrapper<MachineAxis>;
    String: ResolverTypeWrapper<Scalars['String']>;
    MachineCommand: ResolverTypeWrapper<MachineCommand>;
    MachineFeature: ResolverTypeWrapper<MachineFeature>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    MachineFirmware: ResolverTypeWrapper<MachineFirmware>;
    MachinePart: ResolverTypeWrapper<MachinePart>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    MachineProfile: ResolverTypeWrapper<MachineProfile>;
    MachineSetting: ResolverTypeWrapper<MachineSetting>;
    MachineSpec: ResolverTypeWrapper<MachineSpec>;
    Query: ResolverTypeWrapper<{}>;
    UserProfile: ResolverTypeWrapper<UserProfile>;
    ApplyPolicy: ApplyPolicy;
    AxisName: AxisName;
    MachineCategory: MachineCategory;
    MachineControllerType: MachineControllerType;
    MachinePartType: MachinePartType;
    MachineSettingType: MachineSettingType;
    MachineSpecType: MachineSpecType;
    Decimal: ResolverTypeWrapper<Scalars['Decimal']>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    MachineAxis: MachineAxis;
    String: Scalars['String'];
    MachineCommand: MachineCommand;
    MachineFeature: MachineFeature;
    Boolean: Scalars['Boolean'];
    MachineFirmware: MachineFirmware;
    MachinePart: MachinePart;
    Int: Scalars['Int'];
    MachineProfile: MachineProfile;
    MachineSetting: MachineSetting;
    MachineSpec: MachineSpec;
    Query: {};
    UserProfile: UserProfile;
    Decimal: Scalars['Decimal'];
};
export declare type MachineAxisResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineAxis'] = ResolversParentTypes['MachineAxis']> = {
    accuracy: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
    max: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    min: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    name: Resolver<ResolversTypes['AxisName'], ParentType, ContextType>;
    precision: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineCommandResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineCommand'] = ResolversParentTypes['MachineCommand']> = {
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
    name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineFeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineFeature'] = ResolversParentTypes['MachineFeature']> = {
    description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    disabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    icon: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
    title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineFirmwareResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineFirmware'] = ResolversParentTypes['MachineFirmware']> = {
    baudRate: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
    downloadUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    edition: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    helpUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
    name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    requiredVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    rtscts: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    suggestedVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachinePartResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachinePart'] = ResolversParentTypes['MachinePart']> = {
    dataBlob: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    isDefault: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
    optional: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    partType: Resolver<ResolversTypes['MachinePartType'], ParentType, ContextType>;
    settings: Resolver<Array<ResolversTypes['MachineSetting']>, ParentType, ContextType>;
    sortOrder: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    specs: Resolver<Array<ResolversTypes['MachineSpec']>, ParentType, ContextType>;
    title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineProfile'] = ResolversParentTypes['MachineProfile']> = {
    axes: Resolver<Array<ResolversTypes['MachineAxis']>, ParentType, ContextType>;
    brand: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    commands: Resolver<Array<ResolversTypes['MachineCommand']>, ParentType, ContextType>;
    description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    discontinued: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    featured: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    features: Resolver<Array<ResolversTypes['MachineFeature']>, ParentType, ContextType>;
    firmware: Resolver<Array<ResolversTypes['MachineFirmware']>, ParentType, ContextType>;
    icon: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineCategory: Resolver<ResolversTypes['MachineCategory'], ParentType, ContextType>;
    model: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    parts: Resolver<Array<ResolversTypes['MachinePart']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineSettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineSetting'] = ResolversParentTypes['MachineSetting']> = {
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineParts: Resolver<Array<ResolversTypes['MachinePart']>, ParentType, ContextType>;
    settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
    title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type MachineSpecResolvers<ContextType = any, ParentType extends ResolversParentTypes['MachineSpec'] = ResolversParentTypes['MachineSpec']> = {
    id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    machineParts: Resolver<Array<ResolversTypes['MachinePart']>, ParentType, ContextType>;
    specType: Resolver<ResolversTypes['MachineSpecType'], ParentType, ContextType>;
    value: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    machineProfile: Resolver<ResolversTypes['MachineProfile'], ParentType, ContextType, RequireFields<QueryMachineProfileArgs, 'id'>>;
    machineProfileCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType, RequireFields<QueryMachineProfilesArgs, never>>;
    me: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
    userProfile: Resolver<ResolversTypes['UserProfile'], ParentType, ContextType, RequireFields<QueryUserProfileArgs, 'id'>>;
};
export declare type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
    authenticationType: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    username: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
    name: 'Decimal';
}
export declare type Resolvers<ContextType = any> = {
    MachineAxis: MachineAxisResolvers<ContextType>;
    MachineCommand: MachineCommandResolvers<ContextType>;
    MachineFeature: MachineFeatureResolvers<ContextType>;
    MachineFirmware: MachineFirmwareResolvers<ContextType>;
    MachinePart: MachinePartResolvers<ContextType>;
    MachineProfile: MachineProfileResolvers<ContextType>;
    MachineSetting: MachineSettingResolvers<ContextType>;
    MachineSpec: MachineSpecResolvers<ContextType>;
    Query: QueryResolvers<ContextType>;
    UserProfile: UserProfileResolvers<ContextType>;
    Decimal: GraphQLScalarType;
};
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
export declare type MachineAxisPropsFragment = ({
    __typename?: 'MachineAxis';
} & Pick<MachineAxis, 'id' | 'name' | 'min' | 'max' | 'accuracy' | 'precision'>);
export declare type MachineCommandPropsFragment = ({
    __typename?: 'MachineCommand';
} & Pick<MachineCommand, 'id' | 'name' | 'value'>);
export declare type MachineFeaturePropsFragment = ({
    __typename?: 'MachineFeature';
} & Pick<MachineFeature, 'id' | 'key' | 'disabled' | 'title' | 'description' | 'icon'>);
export declare type MachineFirmwareMinimalFragment = ({
    __typename?: 'MachineFirmware';
} & Pick<MachineFirmware, 'controllerType' | 'baudRate' | 'rtscts'>);
export declare type MachineFirmwarePropsFragment = ({
    __typename?: 'MachineFirmware';
} & Pick<MachineFirmware, 'id' | 'requiredVersion' | 'suggestedVersion' | 'name' | 'edition' | 'downloadUrl' | 'helpUrl'> & MachineFirmwareMinimalFragment);
export declare type MachinePartPropsFragment = ({
    __typename?: 'MachinePart';
} & Pick<MachinePart, 'id' | 'partType' | 'optional' | 'isDefault' | 'sortOrder' | 'title' | 'description' | 'dataBlob'>);
export declare type MachinePartCompleteFragment = ({
    __typename?: 'MachinePart';
} & {
    settings: Array<({
        __typename?: 'MachineSetting';
    } & MachineSettingPropsFragment)>;
    specs: Array<({
        __typename?: 'MachineSpec';
    } & MachineSpecPropsFragment)>;
} & MachinePartPropsFragment);
export declare type MachineProfilePropsFragment = ({
    __typename?: 'MachineProfile';
} & Pick<MachineProfile, 'id' | 'name' | 'brand' | 'model' | 'icon' | 'description' | 'machineCategory' | 'discontinued' | 'featured'>);
export declare type MachineProfileCompleteFragment = ({
    __typename?: 'MachineProfile';
} & {
    firmware: Array<({
        __typename?: 'MachineFirmware';
    } & MachineFirmwarePropsFragment)>;
    axes: Array<({
        __typename?: 'MachineAxis';
    } & MachineAxisPropsFragment)>;
    parts: Array<({
        __typename?: 'MachinePart';
    } & MachinePartCompleteFragment)>;
    commands: Array<({
        __typename?: 'MachineCommand';
    } & MachineCommandPropsFragment)>;
    features: Array<({
        __typename?: 'MachineFeature';
    } & MachineFeaturePropsFragment)>;
} & MachineProfilePropsFragment);
export declare type MachineSearchResultFragment = ({
    __typename?: 'MachineProfile';
} & MachineProfilePropsFragment);
export declare type SearchMachineProfilesQueryVariables = Exact<{
    q: Maybe<Scalars['String']>;
}>;
export declare type SearchMachineProfilesQuery = ({
    __typename?: 'Query';
} & {
    machineProfiles: Array<({
        __typename?: 'MachineProfile';
    } & MachineSearchResultFragment)>;
});
export declare type GetCompleteMachineProfileQueryVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type GetCompleteMachineProfileQuery = ({
    __typename?: 'Query';
} & {
    machineProfile: ({
        __typename?: 'MachineProfile';
    } & MachineProfileCompleteFragment);
});
export declare type MachineSettingPropsFragment = ({
    __typename?: 'MachineSetting';
} & Pick<MachineSetting, 'id' | 'title' | 'settingType' | 'key' | 'value'>);
export declare type MachineSpecPropsFragment = ({
    __typename?: 'MachineSpec';
} & Pick<MachineSpec, 'id' | 'specType' | 'value'>);
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
    q: string | null;
}>>;
export declare function useSearchMachineProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMachineProfilesQuery, SearchMachineProfilesQueryVariables>): Apollo.QueryTuple<SearchMachineProfilesQuery, Exact<{
    q: string | null;
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
