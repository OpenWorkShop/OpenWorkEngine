/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

export type IMachineFirmwareRequirement = {
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  requiredVersion: Scalars['Decimal'];
  suggestedVersion: Scalars['Decimal'];
};

export type ISerialPortOptions = {
  baudRate: Scalars['Int'];
  dataBits: Maybe<Scalars['Int']>;
  handshake: Maybe<Handshake>;
  parity: Maybe<Parity>;
  readBufferSize: Maybe<Scalars['Int']>;
  readTimeout: Maybe<Scalars['Int']>;
  rtsEnable: Maybe<Scalars['Boolean']>;
  stopBits: Maybe<StopBits>;
  writeBufferSize: Maybe<Scalars['Int']>;
  writeTimeout: Maybe<Scalars['Int']>;
};

export type IParsedValue =
  | ParsedAxisFlags
  | ParsedBool
  | ParsedDecimal
  | ParsedEnumOfKinematicsMode
  | ParsedEnumOfStatusReportType
  | ParsedString;

export type AlertError = {
  __typename?: 'AlertError';
  message: Scalars['String'];
  name: Scalars['String'];
};

export type AppUpdates = {
  __typename?: 'AppUpdates';
  checkForUpdates: Scalars['Boolean'];
  prereleases: Scalars['Boolean'];
};

export type AxisFlags = {
  __typename?: 'AxisFlags';
  x: Scalars['Boolean'];
  y: Scalars['Boolean'];
  z: Scalars['Boolean'];
};

export type CommandSettings = {
  __typename?: 'CommandSettings';
  commands: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  mtime: Scalars['Long'];
  title: Scalars['String'];
};

export type CompiledInstruction = {
  __typename?: 'CompiledInstruction';
  chunks: Array<SyntaxChunk>;
  code: Scalars['String'];
  source: Scalars['String'];
};

export type ConnectedPort = {
  __typename?: 'ConnectedPort';
  createdAt: Scalars['DateTime'];
  machine: ControlledMachine;
  port: SystemPort;
  status: PortStatus;
};

export type ConnectionSettings = {
  __typename?: 'ConnectionSettings';
  firmware: MachineFirmwareSettings;
  firmwareRequirement: IMachineFirmwareRequirement;
  machineProfileId: Maybe<Scalars['String']>;
  manufacturer: Maybe<Scalars['String']>;
  portName: Scalars['String'];
  toSerialPortOptions: ISerialPortOptions;
};

export type ControlledMachine = {
  __typename?: 'ControlledMachine';
  configuration: MachineConfiguration;
  id: Scalars['String'];
  logs: Maybe<MachineLogEntryConnection>;
  machineProfileId: Maybe<Scalars['String']>;
  settings: FirmwareSettings;
  status: MachineStatus;
  topicId: Scalars['String'];
};

export type ControlledMachineLogsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  order: Maybe<Array<MachineLogEntrySortInput>>;
  where: Maybe<MachineLogEntryFilterInput>;
};

export type Controller = {
  __typename?: 'Controller';
  checkCode: MachineExecutionResult;
  configuration: MachineExecutionResult;
  controllerType: MachineControllerType;
  createdAt: Scalars['DateTime'];
  firmware: MachineExecutionResult;
  help: MachineExecutionResult;
  homing: MachineExecutionResult;
  id: Scalars['String'];
  move: MachineExecutionResult;
  parameters: MachineExecutionResult;
  pause: MachineExecutionResult;
  play: MachineExecutionResult;
  reset: MachineExecutionResult;
  setFirmwareSetting: MachineExecutionResult;
  setFirmwareSettings: Array<MachineExecutionResult>;
  settings: MachineExecutionResult;
  startup: MachineExecutionResult;
  status: MachineExecutionResult;
  unlock: MachineExecutionResult;
  writeCommand: MachineExecutionResult;
};

export type ControllerMoveArgs = {
  moveCommand: MoveCommandInput;
};

export type ControllerSetFirmwareSettingArgs = {
  settingChange: FirmwareSettingChangeInput;
};

export type ControllerSetFirmwareSettingsArgs = {
  settingChanges: Array<FirmwareSettingChangeInput>;
};

export type ControllerWriteCommandArgs = {
  commandCode: Scalars['String'];
  sourceName: Scalars['String'];
};

export type EventSettings = {
  __typename?: 'EventSettings';
  commands: Scalars['String'];
  enabled: Scalars['Boolean'];
  event: Scalars['String'];
  id: Scalars['String'];
  mtime: Scalars['Long'];
  trigger: Scalars['String'];
};

export type FileSystemSettings = {
  __typename?: 'FileSystemSettings';
  documentsDirectory: Maybe<Scalars['String']>;
  mountPoints: Array<MountPointSettings>;
};

export type FirmwareApplicatorSettings = {
  __typename?: 'FirmwareApplicatorSettings';
  laserEnabled: FirmwareSettingOfBoolean;
  settings: Array<FirmwareSetting>;
  shuttleRadius: FirmwareSettingOfDecimal;
  shuttleWeight: FirmwareSettingOfDecimal;
  speedMax: FirmwareSettingOfDecimal;
  speedMin: FirmwareSettingOfDecimal;
};

export type FirmwareAxisValues = {
  __typename?: 'FirmwareAxisValues';
  settings: Array<FirmwareSetting>;
  x: FirmwareSettingOfDecimal;
  y: FirmwareSettingOfDecimal;
  z: FirmwareSettingOfDecimal;
};

export type FirmwareCalibrationSettings = {
  __typename?: 'FirmwareCalibrationSettings';
  chainElongationFactor: FirmwareSettingOfDecimal;
  chainLength: FirmwareSettingOfDecimal;
  chainOverSprocket: FirmwareSettingOfBoolean;
  chainSagCorrection: FirmwareSettingOfDecimal;
  homeChainLengths: FirmwareSettingOfDecimal;
  kinematics: FirmwareSettingOfKinematicsMode;
  leftChainTolerance: FirmwareSettingOfDecimal;
  motorDistance: FirmwareAxisValues;
  rightChainTolerance: FirmwareSettingOfDecimal;
  scaling: FirmwareAxisValues;
  settings: Array<FirmwareSetting>;
};

export type FirmwareComparisonNodeOfDecimal = {
  __typename?: 'FirmwareComparisonNodeOfDecimal';
  detectedValue: Scalars['Decimal'];
  hasDetectedValue: Scalars['Boolean'];
  meetsRequirement: Scalars['Boolean'];
  requiredValue: Scalars['Decimal'];
};

export type FirmwareComparisonNodeOfString = {
  __typename?: 'FirmwareComparisonNodeOfString';
  detectedValue: Maybe<Scalars['String']>;
  hasDetectedValue: Scalars['Boolean'];
  meetsRequirement: Scalars['Boolean'];
  requiredValue: Maybe<Scalars['String']>;
};

export type FirmwareHomingSettings = {
  __typename?: 'FirmwareHomingSettings';
  debounce: FirmwareSettingOfDecimal;
  directionInvert: FirmwareSettingOfAxisFlags;
  enabled: FirmwareSettingOfBoolean;
  feedRate: FirmwareSettingOfDecimal;
  pullOff: FirmwareSettingOfDecimal;
  seekRate: FirmwareSettingOfDecimal;
  settings: Array<FirmwareSetting>;
};

export type FirmwareMovementSettings = {
  __typename?: 'FirmwareMovementSettings';
  acceleration: FirmwareAxisValues;
  arcTolerance: FirmwareSettingOfDecimal;
  hardLimits: FirmwareSettingOfBoolean;
  junctionDeviation: FirmwareSettingOfDecimal;
  machineSize: FirmwareAxisValues;
  positionMax: FirmwareAxisValues;
  positionMin: FirmwareAxisValues;
  rateMax: FirmwareAxisValues;
  settings: Array<FirmwareSetting>;
  softLimits: FirmwareSettingOfBoolean;
};

export type FirmwarePinsSettings = {
  __typename?: 'FirmwarePinsSettings';
  imax: FirmwareAxisValues;
  kDerivative: FirmwareAxisValues;
  kIntegral: FirmwareAxisValues;
  kProportional: FirmwareAxisValues;
  limitPinsInvert: FirmwareSettingOfBoolean;
  probePinInvert: FirmwareSettingOfBoolean;
  settings: Array<FirmwareSetting>;
  stepDirectionInvert: FirmwareSettingOfAxisFlags;
  stepEnableInvert: FirmwareSettingOfBoolean;
  stepIdleDelay: FirmwareSettingOfDecimal;
  stepPulse: FirmwareSettingOfDecimal;
  stepSignalInvert: FirmwareSettingOfAxisFlags;
  steps: FirmwareAxisValues;
};

export type FirmwareReportingSettings = {
  __typename?: 'FirmwareReportingSettings';
  reportInches: FirmwareSettingOfBoolean;
  settings: Array<FirmwareSetting>;
  statusReport: FirmwareSettingOfStatusReportType;
};

export type FirmwareRequirement = IMachineFirmwareRequirement & {
  __typename?: 'FirmwareRequirement';
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  requiredVersion: Scalars['Decimal'];
  suggestedVersion: Scalars['Decimal'];
};

export type FirmwareSetting = {
  __typename?: 'FirmwareSetting';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  defaultValue: Maybe<IParsedValue>;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettingOfAxisFlags = {
  __typename?: 'FirmwareSettingOfAxisFlags';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: AxisFlags;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettingOfBoolean = {
  __typename?: 'FirmwareSettingOfBoolean';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: Scalars['Boolean'];
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettingOfDecimal = {
  __typename?: 'FirmwareSettingOfDecimal';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: Scalars['Decimal'];
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettingOfKinematicsMode = {
  __typename?: 'FirmwareSettingOfKinematicsMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: KinematicsMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettingOfStatusReportType = {
  __typename?: 'FirmwareSettingOfStatusReportType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: StatusReportType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
};

export type FirmwareSettings = {
  __typename?: 'FirmwareSettings';
  applicator: FirmwareApplicatorSettings;
  calibration: FirmwareCalibrationSettings;
  homing: FirmwareHomingSettings;
  movement: FirmwareMovementSettings;
  pins: FirmwarePinsSettings;
  reporting: FirmwareReportingSettings;
  settings: Array<FirmwareSetting>;
};

export type KeyValuePairOfKinematicsModeAndInt32 = {
  __typename?: 'KeyValuePairOfKinematicsModeAndInt32';
  key: KinematicsMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfStatusReportTypeAndInt32 = {
  __typename?: 'KeyValuePairOfStatusReportTypeAndInt32';
  key: StatusReportType;
  value: Scalars['Int'];
};

export type MachineAlert = {
  __typename?: 'MachineAlert';
  code: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  type: MachineAlertType;
};

export type MachineApplicatorState = {
  __typename?: 'MachineApplicatorState';
  feedRate: Scalars['Decimal'];
  isFloodCoolantEnabled: Scalars['Boolean'];
  isMistCoolantEnabled: Scalars['Boolean'];
  isOn: Scalars['Boolean'];
  lengthOffset: Maybe<MachinePosition>;
  lengthOffsetFactorType: FactorType;
  probePosition: Maybe<MachinePosition>;
  radiusCompensation: RadiusCompensation;
  spinDirection: SpinDirection;
  spinSpeed: Scalars['Decimal'];
  temperature: Maybe<Scalars['Decimal']>;
  toolId: Scalars['String'];
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

export type MachineAxisSettings = {
  __typename?: 'MachineAxisSettings';
  accuracy: Scalars['Decimal'];
  id: Maybe<Scalars['String']>;
  max: Scalars['Decimal'];
  min: Scalars['Decimal'];
  name: AxisName;
  precision: Scalars['Decimal'];
};

export type MachineBuffer = {
  __typename?: 'MachineBuffer';
  availableReceive: Scalars['Int'];
  availableSend: Scalars['Int'];
  lineNumber: Scalars['Int'];
  responseQueueLength: Scalars['Int'];
  writeQueueLength: Scalars['Int'];
};

export type MachineCommand = {
  __typename?: 'MachineCommand';
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  name: Scalars['String'];
  syntax: ProgramSyntax;
  value: Scalars['String'];
};

export type MachineCommandSettings = {
  __typename?: 'MachineCommandSettings';
  id: Scalars['String'];
  name: Scalars['String'];
  syntax: ProgramSyntax;
  value: Scalars['String'];
};

export type MachineConfiguration = {
  __typename?: 'MachineConfiguration';
  firmware: MachineDetectedFirmware;
  modals: MachineModals;
  options: Maybe<MachineOptions>;
  referencePosition: Array<MachinePosition>;
  workCoordinates: Array<MachinePosition>;
  workOffset: MachinePosition;
};

export type MachineDetectedFirmware = {
  __typename?: 'MachineDetectedFirmware';
  edition: FirmwareComparisonNodeOfString;
  friendlyName: Maybe<Scalars['String']>;
  isValid: Scalars['Boolean'];
  meetsRequirements: Scalars['Boolean'];
  name: FirmwareComparisonNodeOfString;
  protocol: FirmwareComparisonNodeOfString;
  requirement: FirmwareRequirement;
  version: FirmwareComparisonNodeOfDecimal;
  welcomeMessage: Maybe<Scalars['String']>;
};

export type MachineExecutionResult = {
  __typename?: 'MachineExecutionResult';
  instructionResults: Array<MachineInstructionResult>;
  machine: ControlledMachine;
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

export type MachineFeatureSettings = {
  __typename?: 'MachineFeatureSettings';
  description: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Scalars['String'];
  title: Maybe<Scalars['String']>;
};

export type MachineFirmware = IMachineFirmwareRequirement & {
  __typename?: 'MachineFirmware';
  baudRate: Scalars['Decimal'];
  baudRateValue: Scalars['Int'];
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  id: Scalars['String'];
  machineProfiles: Array<MachineProfile>;
  name: Scalars['String'];
  requiredVersion: Scalars['Decimal'];
  rtscts: Scalars['Boolean'];
  suggestedVersion: Scalars['Decimal'];
};

export type MachineFirmwareSettings = IMachineFirmwareRequirement & {
  __typename?: 'MachineFirmwareSettings';
  baudRate: Maybe<BaudRate>;
  baudRateValue: Scalars['Int'];
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  requiredVersion: Scalars['Decimal'];
  rtscts: Scalars['Boolean'];
  suggestedVersion: Scalars['Decimal'];
};

export type MachineInstructionResult = {
  __typename?: 'MachineInstructionResult';
  instruction: CompiledInstruction;
  responseLogEntry: Maybe<MachineLogEntry>;
  writeLogEntry: MachineLogEntry;
};

export type MachineLogEntry = {
  __typename?: 'MachineLogEntry';
  canMergeWith: Scalars['Boolean'];
  code: Array<SyntaxChunk>;
  count: Scalars['Int'];
  error: Maybe<MachineAlert>;
  id: Scalars['Int'];
  isResponse: Scalars['Boolean'];
  logLevel: MachineLogLevel;
  message: Scalars['String'];
  source: MachineLogSource;
  timestamp: Scalars['DateTime'];
  timestamps: Array<Scalars['DateTime']>;
  writeState: SerialWriteState;
};

/** A connection to a list of items. */
export type MachineLogEntryConnection = {
  __typename?: 'MachineLogEntryConnection';
  /** A list of edges. */
  edges: Maybe<Array<MachineLogEntryEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<MachineLogEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MachineLogEntryEdge = {
  __typename?: 'MachineLogEntryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MachineLogEntry;
};

export type MachineModalStateOfAxisPlane = {
  __typename?: 'MachineModalStateOfAxisPlane';
  code: Maybe<Scalars['String']>;
  value: AxisPlane;
};

export type MachineModalStateOfEnabledType = {
  __typename?: 'MachineModalStateOfEnabledType';
  code: Maybe<Scalars['String']>;
  value: EnabledType;
};

export type MachineModalStateOfFeedRateMode = {
  __typename?: 'MachineModalStateOfFeedRateMode';
  code: Maybe<Scalars['String']>;
  value: FeedRateMode;
};

export type MachineModalStateOfMachineMotionType = {
  __typename?: 'MachineModalStateOfMachineMotionType';
  code: Maybe<Scalars['String']>;
  value: MachineMotionType;
};

export type MachineModalStateOfMachineProgramState = {
  __typename?: 'MachineModalStateOfMachineProgramState';
  code: Maybe<Scalars['String']>;
  value: MachineProgramState;
};

export type MachineModalStateOfMovementDistanceType = {
  __typename?: 'MachineModalStateOfMovementDistanceType';
  code: Maybe<Scalars['String']>;
  value: MovementDistanceType;
};

export type MachineModalStateOfPathControlMode = {
  __typename?: 'MachineModalStateOfPathControlMode';
  code: Maybe<Scalars['String']>;
  value: PathControlMode;
};

export type MachineModalStateOfSpindleSpeedMode = {
  __typename?: 'MachineModalStateOfSpindleSpeedMode';
  code: Maybe<Scalars['String']>;
  value: SpindleSpeedMode;
};

export type MachineModalStateOfTimingMode = {
  __typename?: 'MachineModalStateOfTimingMode';
  code: Maybe<Scalars['String']>;
  value: TimingMode;
};

export type MachineModalStateOfUnitType = {
  __typename?: 'MachineModalStateOfUnitType';
  code: Maybe<Scalars['String']>;
  value: UnitType;
};

export type MachineModals = {
  __typename?: 'MachineModals';
  arcDistance: Maybe<MachineModalStateOfMovementDistanceType>;
  cannedCycleReturnMode: Maybe<MachineModalStateOfTimingMode>;
  cylindricalInterpolation: Maybe<MachineModalStateOfEnabledType>;
  distance: Maybe<MachineModalStateOfMovementDistanceType>;
  feedRate: Maybe<MachineModalStateOfFeedRateMode>;
  motion: MachineModalStateOfMachineMotionType;
  pathControlMode: Maybe<MachineModalStateOfPathControlMode>;
  plane: Maybe<MachineModalStateOfAxisPlane>;
  programState: Maybe<MachineModalStateOfMachineProgramState>;
  spindleSpeed: Maybe<MachineModalStateOfSpindleSpeedMode>;
  units: Maybe<MachineModalStateOfUnitType>;
  userDefinedCount: Scalars['Int'];
  userDefinedCurrent: Scalars['Int'];
  workCoordinateSystemCount: Scalars['Int'];
  workCoordinateSystemCurrent: Scalars['Int'];
};

export type MachineOptions = {
  __typename?: 'MachineOptions';
  raw: Scalars['String'];
};

export type MachineOverrides = {
  __typename?: 'MachineOverrides';
  feed: Scalars['Decimal'];
  feedAllowed: Scalars['Boolean'];
  rapids: Scalars['Decimal'];
  speed: Scalars['Decimal'];
  speedAllowed: Scalars['Boolean'];
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
  settings: Array<MachinePresetSetting>;
  sortOrder: Scalars['Int'];
  specs: Array<MachineSpec>;
  title: Maybe<Scalars['String']>;
};

export type MachinePartSettings = {
  __typename?: 'MachinePartSettings';
  dataBlob: Scalars['String'];
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  isDefault: Scalars['Boolean'];
  optional: Scalars['Boolean'];
  partType: MachinePartType;
  settings: Array<MachineSettingSettings>;
  specs: Array<MachineSpecSettings>;
  title: Scalars['String'];
};

export type MachinePosition = {
  __typename?: 'MachinePosition';
  a: Maybe<Scalars['Decimal']>;
  b: Maybe<Scalars['Decimal']>;
  c: Maybe<Scalars['Decimal']>;
  x: Maybe<Scalars['Decimal']>;
  y: Maybe<Scalars['Decimal']>;
  z: Maybe<Scalars['Decimal']>;
};

export type MachinePresetSetting = {
  __typename?: 'MachinePresetSetting';
  id: Scalars['String'];
  key: Scalars['String'];
  machineParts: Array<MachinePart>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  value: Scalars['String'];
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

export type MachineSettingSettings = {
  __typename?: 'MachineSettingSettings';
  id: Scalars['String'];
  key: Scalars['String'];
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

export type MachineSpecSettings = {
  __typename?: 'MachineSpecSettings';
  id: Scalars['String'];
  specType: MachineSpecType;
  value: Scalars['Decimal'];
};

export type MachineStatus = {
  __typename?: 'MachineStatus';
  activePins: Array<MachinePinType>;
  activityState: ActiveState;
  alarm: Maybe<MachineAlert>;
  applicator: MachineApplicatorState;
  buffer: MachineBuffer;
  machinePosition: MachinePosition;
  overrides: Maybe<MachineOverrides>;
  workCoordinateOffset: Maybe<MachinePosition>;
  workPosition: Maybe<MachinePosition>;
};

export type MacroSettings = {
  __typename?: 'MacroSettings';
  content: Scalars['String'];
  id: Scalars['String'];
  mtime: Scalars['Long'];
  name: Scalars['String'];
};

export type MakerHubSettings = {
  __typename?: 'MakerHubSettings';
  enabled: Scalars['Boolean'];
};

export type MountPointSettings = {
  __typename?: 'MountPointSettings';
  route: Scalars['String'];
  target: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeWorkspacePort: Workspace;
  closePort: SystemPort;
  closeWorkspace: Workspace;
  controlMachine: Controller;
  createWorkspace: Workspace;
  deleteWorkspace: Workspace;
  openPort: SystemPort;
  openWorkspace: Workspace;
  updateWorkspace: Workspace;
  uploadProgram: ProgramFileUpload;
};

export type MutationChangeWorkspacePortArgs = {
  portName: Scalars['String'];
  workspaceId: Scalars['String'];
};

export type MutationClosePortArgs = {
  portName: Scalars['String'];
};

export type MutationCloseWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type MutationControlMachineArgs = {
  workspaceId: Scalars['String'];
};

export type MutationCreateWorkspaceArgs = {
  workspaceSettings: WorkspaceSettingsInput;
};

export type MutationDeleteWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type MutationOpenPortArgs = {
  firmware: FirmwareRequirementInput;
  options: SerialPortOptionsInput;
  portName: Scalars['String'];
};

export type MutationOpenWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type MutationUpdateWorkspaceArgs = {
  workspaceSettings: WorkspaceSettingsInput;
};

export type MutationUploadProgramArgs = {
  fileUpload: ProgramFileUploadInput;
};

export type OpenControllerSession = {
  __typename?: 'OpenControllerSession';
  roles: Array<Scalars['String']>;
  token: Scalars['String'];
  user: OpenControllerUser;
};

export type OpenControllerSettings = {
  __typename?: 'OpenControllerSettings';
  appUpdates: AppUpdates;
  commands: Array<CommandSettings>;
  events: Array<EventSettings>;
  fileSystem: FileSystemSettings;
  hub: MakerHubSettings;
  macros: Array<MacroSettings>;
  users: Array<OpenControllerUser>;
  workspaces: Array<WorkspaceSettings>;
};

export type OpenControllerUser = {
  __typename?: 'OpenControllerUser';
  authenticationType: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Maybe<Scalars['String']>;
  tokens: Array<Scalars['String']>;
  username: Scalars['String'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
};

export type ParsedAxisFlags = {
  __typename?: 'ParsedAxisFlags';
  valueAxisFlags: AxisFlags;
  valueString: Scalars['String'];
};

export type ParsedBool = {
  __typename?: 'ParsedBool';
  valueBool: Scalars['Boolean'];
  valueString: Scalars['String'];
};

export type ParsedDecimal = {
  __typename?: 'ParsedDecimal';
  valueDecimal: Scalars['Decimal'];
  valueString: Scalars['String'];
};

export type ParsedEnumOfKinematicsMode = {
  __typename?: 'ParsedEnumOfKinematicsMode';
  valueEnum: KinematicsMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfKinematicsModeAndInt32>;
};

export type ParsedEnumOfStatusReportType = {
  __typename?: 'ParsedEnumOfStatusReportType';
  valueEnum: StatusReportType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfStatusReportTypeAndInt32>;
};

export type ParsedString = {
  __typename?: 'ParsedString';
  valueString: Scalars['String'];
};

export type PortOptions = ISerialPortOptions & {
  __typename?: 'PortOptions';
  baudRate: Scalars['Int'];
  dataBits: Maybe<Scalars['Int']>;
  handshake: Maybe<Handshake>;
  parity: Maybe<Parity>;
  readBufferSize: Maybe<Scalars['Int']>;
  readTimeout: Maybe<Scalars['Int']>;
  rtsEnable: Maybe<Scalars['Boolean']>;
  stopBits: Maybe<StopBits>;
  writeBufferSize: Maybe<Scalars['Int']>;
  writeTimeout: Maybe<Scalars['Int']>;
};

export type PortStatus = {
  __typename?: 'PortStatus';
  bytesToRead: Scalars['Int'];
  bytesToWrite: Scalars['Int'];
  charactersRead: Scalars['Int'];
  charactersWritten: Scalars['Int'];
  isOpen: Scalars['Boolean'];
  linesRead: Scalars['Int'];
  linesWritten: Scalars['Int'];
};

export type ProgramFile = {
  __typename?: 'ProgramFile';
  name: Scalars['String'];
  syntax: ProgramSyntax;
};

export type ProgramFileUpload = {
  __typename?: 'ProgramFileUpload';
  lastModified: Scalars['Long'];
  name: Scalars['String'];
  size: Scalars['Int'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authenticate: OpenControllerSession;
  getPort: SystemPort;
  getSettings: OpenControllerSettings;
  getWorkspace: Workspace;
  listPorts: Array<SystemPort>;
  listWorkspaces: Array<Workspace>;
  machineProfile: MachineProfile;
  machineProfileCount: Scalars['Int'];
  machineProfiles: Array<MachineProfile>;
  me: Maybe<UserProfile>;
  programs: Array<ProgramFile>;
  userProfile: UserProfile;
};

export type QueryAuthenticateArgs = {
  token: Scalars['String'];
};

export type QueryGetPortArgs = {
  portName: Scalars['String'];
};

export type QueryGetWorkspaceArgs = {
  workspaceId: Scalars['String'];
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

export type Subscription = {
  __typename?: 'Subscription';
  onMachineConfiguration: ControlledMachine;
  onMachineLog: ControlledMachine;
  onMachineSetting: ControlledMachine;
  onMachineStatus: ControlledMachine;
  onPortChange: SystemPort;
  onWorkspaceChange: Workspace;
};

export type SubscriptionOnMachineConfigurationArgs = {
  portName: Scalars['String'];
};

export type SubscriptionOnMachineLogArgs = {
  portName: Scalars['String'];
};

export type SubscriptionOnMachineSettingArgs = {
  portName: Scalars['String'];
};

export type SubscriptionOnMachineStatusArgs = {
  portName: Scalars['String'];
};

export type SyntaxChunk = {
  __typename?: 'SyntaxChunk';
  comment: Scalars['String'];
  comments: Array<Scalars['String']>;
  isCode: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  type: SyntaxType;
  value: Scalars['String'];
};

export type SystemPort = {
  __typename?: 'SystemPort';
  connection: Maybe<ConnectedPort>;
  error: Maybe<AlertError>;
  options: PortOptions;
  portName: Scalars['String'];
  state: PortState;
  topicId: Scalars['String'];
};

export type UserProfile = {
  __typename?: 'UserProfile';
  authenticationType: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  username: Maybe<Scalars['String']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  error: Maybe<AlertError>;
  id: Scalars['String'];
  port: Maybe<SystemPort>;
  portName: Scalars['String'];
  settings: WorkspaceSettings;
  state: WorkspaceState;
  topicId: Scalars['String'];
  units: UnitType;
};

export type WorkspaceSettings = {
  __typename?: 'WorkspaceSettings';
  autoReconnect: Scalars['Boolean'];
  axes: Array<MachineAxisSettings>;
  bkColor: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
  commands: Array<MachineCommandSettings>;
  connection: ConnectionSettings;
  features: Array<MachineFeatureSettings>;
  icon: Maybe<Scalars['String']>;
  id: Scalars['String'];
  machineCategory: MachineCategory;
  machineProfileId: Maybe<Scalars['String']>;
  name: Scalars['String'];
  onboarded: Scalars['Boolean'];
  parts: Array<MachinePartSettings>;
  path: Scalars['String'];
  preferImperial: Scalars['Boolean'];
};

export enum ActiveState {
  Alarm = 'ALARM',
  Check = 'CHECK',
  Door = 'DOOR',
  Hold = 'HOLD',
  Home = 'HOME',
  IdleReady = 'IDLE_READY',
  Initializing = 'INITIALIZING',
  Run = 'RUN',
  Sleep = 'SLEEP',
}

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export enum AxisName {
  A = 'A',
  B = 'B',
  C = 'C',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export enum AxisPlane {
  Xy = 'XY',
  Xz = 'XZ',
  Yz = 'YZ',
}

export enum BaudRate {
  Br115200 = 'BR115200',
  Br19200 = 'BR19200',
  Br2400 = 'BR2400',
  Br250000 = 'BR250000',
  Br38400 = 'BR38400',
  Br57600 = 'BR57600',
  Br9600 = 'BR9600',
}

export enum EnabledType {
  Disabled = 'DISABLED',
  Enabled = 'ENABLED',
}

export enum FactorType {
  Negative = 'NEGATIVE',
  None = 'NONE',
  Positive = 'POSITIVE',
}

export enum FeedRateMode {
  InverseTime = 'INVERSE_TIME',
  UnitsPerMinute = 'UNITS_PER_MINUTE',
  UnitsPerRevolution = 'UNITS_PER_REVOLUTION',
}

export enum Handshake {
  None = 'NONE',
  RequestToSend = 'REQUEST_TO_SEND',
  RequestToSendXOnXOff = 'REQUEST_TO_SEND_X_ON_X_OFF',
  XOnXOff = 'X_ON_X_OFF',
}

export enum KinematicsMode {
  Linear = 'LINEAR',
  Triangular = 'TRIANGULAR',
}

export enum MachineAlertType {
  Alarm = 'ALARM',
  Error = 'ERROR',
  Exception = 'EXCEPTION',
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
  Unknown = 'UNKNOWN',
}

export enum MachineLogLevel {
  Cfg = 'CFG',
  Dbg = 'DBG',
  Err = 'ERR',
  Inf = 'INF',
  Wrn = 'WRN',
}

export enum MachineLogSource {
  SerialRead = 'SERIAL_READ',
  SerialWrite = 'SERIAL_WRITE',
}

export enum MachineMotionType {
  Arc = 'ARC',
  ArcCcw = 'ARC_CCW',
  Cancel = 'CANCEL',
  Dwell = 'DWELL',
  Linear = 'LINEAR',
  Probe = 'PROBE',
  Rapid = 'RAPID',
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

export enum MachinePinType {
  A = 'A',
  D = 'D',
  H = 'H',
  P = 'P',
  R = 'R',
  S = 'S',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export enum MachineProgramState {
  AutomaticChange = 'AUTOMATIC_CHANGE',
  CompulsoryStop = 'COMPULSORY_STOP',
  EndOfProgram = 'END_OF_PROGRAM',
  OptionalStop = 'OPTIONAL_STOP',
}

export enum MachineSettingType {
  Acceleration = 'ACCELERATION',
  ApplicatorWeight = 'APPLICATOR_WEIGHT',
  ArcTolerance = 'ARC_TOLERANCE',
  AxisScale = 'AXIS_SCALE',
  ChainElongationFactor = 'CHAIN_ELONGATION_FACTOR',
  ChainLength = 'CHAIN_LENGTH',
  ChainOverSprocket = 'CHAIN_OVER_SPROCKET',
  ChainSagCorrection = 'CHAIN_SAG_CORRECTION',
  ChainToleranceLeft = 'CHAIN_TOLERANCE_LEFT',
  ChainToleranceRight = 'CHAIN_TOLERANCE_RIGHT',
  DirectionPortInvert = 'DIRECTION_PORT_INVERT',
  DistBetweenMotors = 'DIST_BETWEEN_MOTORS',
  Grbl = 'GRBL',
  HardLimits = 'HARD_LIMITS',
  HomingCycle = 'HOMING_CYCLE',
  HomingDebounce = 'HOMING_DEBOUNCE',
  HomingDirectionInvert = 'HOMING_DIRECTION_INVERT',
  HomingFeed = 'HOMING_FEED',
  HomingPullOff = 'HOMING_PULL_OFF',
  HomingSeek = 'HOMING_SEEK',
  Imax = 'IMAX',
  JunctionDeviation = 'JUNCTION_DEVIATION',
  Kv = 'KV',
  LaserMode = 'LASER_MODE',
  LimitPinsInvert = 'LIMIT_PINS_INVERT',
  MachineSize = 'MACHINE_SIZE',
  MaxSpindleSpeed = 'MAX_SPINDLE_SPEED',
  MinSpindleSpeed = 'MIN_SPINDLE_SPEED',
  MotorOffsetY = 'MOTOR_OFFSET_Y',
  PidKd = 'PID_KD',
  PidKi = 'PID_KI',
  PidKp = 'PID_KP',
  ProbePinInvert = 'PROBE_PIN_INVERT',
  RateMax = 'RATE_MAX',
  ReportInches = 'REPORT_INCHES',
  RotationDiskRadius = 'ROTATION_DISK_RADIUS',
  SimpleKinematics = 'SIMPLE_KINEMATICS',
  SoftLimits = 'SOFT_LIMITS',
  StatusReport = 'STATUS_REPORT',
  Steps = 'STEPS',
  StepEnableInvert = 'STEP_ENABLE_INVERT',
  StepIdleDelay = 'STEP_IDLE_DELAY',
  StepPortInvert = 'STEP_PORT_INVERT',
  StepPulse = 'STEP_PULSE',
  TravelMax = 'TRAVEL_MAX',
  TravelMin = 'TRAVEL_MIN',
}

export enum MachineSettingUnits {
  Microseconds = 'MICROSECONDS',
  Millimeters = 'MILLIMETERS',
  MillimetersPerMinute = 'MILLIMETERS_PER_MINUTE',
  MillimetersPerSecondsSquared = 'MILLIMETERS_PER_SECONDS_SQUARED',
  Milliseconds = 'MILLISECONDS',
  Newtons = 'NEWTONS',
  Percent = 'PERCENT',
  Pid = 'PID',
  Rpm = 'RPM',
  StepsPerMillimeter = 'STEPS_PER_MILLIMETER',
  Unknown = 'UNKNOWN',
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

export enum MovementDistanceType {
  Absolute = 'ABSOLUTE',
  Relative = 'RELATIVE',
}

export enum Parity {
  Even = 'EVEN',
  Mark = 'MARK',
  None = 'NONE',
  Odd = 'ODD',
  Space = 'SPACE',
}

export enum PathControlMode {
  Blended = 'BLENDED',
  Exact = 'EXACT',
}

export enum PortState {
  Active = 'ACTIVE',
  Error = 'ERROR',
  HasData = 'HAS_DATA',
  HasFirmware = 'HAS_FIRMWARE',
  Opening = 'OPENING',
  Ready = 'READY',
  Startup = 'STARTUP',
  Unplugged = 'UNPLUGGED',
}

export enum ProgramSyntax {
  GCode = 'G_CODE',
}

export enum RadiusCompensation {
  DynamicLeft = 'DYNAMIC_LEFT',
  DynamicRight = 'DYNAMIC_RIGHT',
  Left = 'LEFT',
  None = 'NONE',
  Right = 'RIGHT',
}

export enum SerialWriteState {
  Error = 'ERROR',
  None = 'NONE',
  Ok = 'OK',
  Queued = 'QUEUED',
  Sent = 'SENT',
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum SpinDirection {
  Ccw = 'CCW',
  Cw = 'CW',
  None = 'NONE',
}

export enum SpindleSpeedMode {
  ConstantSpindleSpeed = 'CONSTANT_SPINDLE_SPEED',
  ConstantSurfaceSpeed = 'CONSTANT_SURFACE_SPEED',
}

export enum StatusReportType {
  BufferData = 'BUFFER_DATA',
  Position = 'POSITION',
}

export enum StopBits {
  None = 'NONE',
  One = 'ONE',
  OnePointFive = 'ONE_POINT_FIVE',
  Two = 'TWO',
}

export enum SyntaxType {
  Keyword = 'KEYWORD',
  Operator = 'OPERATOR',
  Unknown = 'UNKNOWN',
  Value = 'VALUE',
}

export enum TimingMode {
  PerMinutEected = 'PER_MINUTEected',
  PerRevolution = 'PER_REVOLUTION',
}

export enum UnitType {
  Imperial = 'IMPERIAL',
  Metric = 'METRIC',
}

export enum WorkspaceState {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Disconnected = 'DISCONNECTED',
  Error = 'ERROR',
  Opening = 'OPENING',
}

export type BooleanOperationFilterInput = {
  eq: Maybe<Scalars['Boolean']>;
  neq: Maybe<Scalars['Boolean']>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq: Maybe<Scalars['DateTime']>;
  gt: Maybe<Scalars['DateTime']>;
  gte: Maybe<Scalars['DateTime']>;
  in: Maybe<Array<Scalars['DateTime']>>;
  lt: Maybe<Scalars['DateTime']>;
  lte: Maybe<Scalars['DateTime']>;
  neq: Maybe<Scalars['DateTime']>;
  ngt: Maybe<Scalars['DateTime']>;
  ngte: Maybe<Scalars['DateTime']>;
  nin: Maybe<Array<Scalars['DateTime']>>;
  nlt: Maybe<Scalars['DateTime']>;
  nlte: Maybe<Scalars['DateTime']>;
};

export type ComparableInt32OperationFilterInput = {
  eq: Maybe<Scalars['Int']>;
  gt: Maybe<Scalars['Int']>;
  gte: Maybe<Scalars['Int']>;
  in: Maybe<Array<Scalars['Int']>>;
  lt: Maybe<Scalars['Int']>;
  lte: Maybe<Scalars['Int']>;
  neq: Maybe<Scalars['Int']>;
  ngt: Maybe<Scalars['Int']>;
  ngte: Maybe<Scalars['Int']>;
  nin: Maybe<Array<Scalars['Int']>>;
  nlt: Maybe<Scalars['Int']>;
  nlte: Maybe<Scalars['Int']>;
};

export type ConnectionSettingsInput = {
  firmware: MachineFirmwareSettingsInput;
  machineProfileId: Maybe<Scalars['String']>;
  manufacturer: Maybe<Scalars['String']>;
  portName: Scalars['String'];
};

export type FirmwareRequirementInput = {
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  requiredVersion: Scalars['Decimal'];
  suggestedVersion: Scalars['Decimal'];
};

export type FirmwareSettingChangeInput = {
  id: Scalars['String'];
  value: Scalars['String'];
};

export type ListComparableDateTimeOperationFilterInput = {
  all: Maybe<ComparableDateTimeOperationFilterInput>;
  any: Maybe<Scalars['Boolean']>;
  none: Maybe<ComparableDateTimeOperationFilterInput>;
  some: Maybe<ComparableDateTimeOperationFilterInput>;
};

export type ListFilterInputTypeOfSyntaxChunkFilterInput = {
  all: Maybe<SyntaxChunkFilterInput>;
  any: Maybe<Scalars['Boolean']>;
  none: Maybe<SyntaxChunkFilterInput>;
  some: Maybe<SyntaxChunkFilterInput>;
};

export type ListStringOperationFilterInput = {
  all: Maybe<StringOperationFilterInput>;
  any: Maybe<Scalars['Boolean']>;
  none: Maybe<StringOperationFilterInput>;
  some: Maybe<StringOperationFilterInput>;
};

export type MachineAlertFilterInput = {
  and: Maybe<Array<MachineAlertFilterInput>>;
  code: Maybe<StringOperationFilterInput>;
  message: Maybe<StringOperationFilterInput>;
  name: Maybe<StringOperationFilterInput>;
  or: Maybe<Array<MachineAlertFilterInput>>;
  type: Maybe<MachineAlertTypeOperationFilterInput>;
};

export type MachineAlertSortInput = {
  code: Maybe<SortEnumType>;
  message: Maybe<SortEnumType>;
  name: Maybe<SortEnumType>;
  type: Maybe<SortEnumType>;
};

export type MachineAlertTypeOperationFilterInput = {
  eq: Maybe<MachineAlertType>;
  in: Maybe<Array<MachineAlertType>>;
  neq: Maybe<MachineAlertType>;
  nin: Maybe<Array<MachineAlertType>>;
};

export type MachineAxisSettingsInput = {
  accuracy: Scalars['Decimal'];
  id: Maybe<Scalars['String']>;
  max: Scalars['Decimal'];
  min: Scalars['Decimal'];
  name: AxisName;
  precision: Scalars['Decimal'];
};

export type MachineCommandSettingsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  syntax: ProgramSyntax;
  value: Scalars['String'];
};

export type MachineFeatureSettingsInput = {
  description: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Scalars['String'];
  title: Maybe<Scalars['String']>;
};

export type MachineFirmwareSettingsInput = {
  baudRate: Maybe<BaudRate>;
  baudRateValue: Scalars['Int'];
  controllerType: MachineControllerType;
  downloadUrl: Maybe<Scalars['String']>;
  edition: Maybe<Scalars['String']>;
  helpUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  requiredVersion: Scalars['Decimal'];
  rtscts: Scalars['Boolean'];
  suggestedVersion: Scalars['Decimal'];
};

export type MachineLogEntryFilterInput = {
  and: Maybe<Array<MachineLogEntryFilterInput>>;
  code: Maybe<ListFilterInputTypeOfSyntaxChunkFilterInput>;
  count: Maybe<ComparableInt32OperationFilterInput>;
  error: Maybe<MachineAlertFilterInput>;
  isResponse: Maybe<BooleanOperationFilterInput>;
  logLevel: Maybe<MachineLogLevelOperationFilterInput>;
  message: Maybe<StringOperationFilterInput>;
  or: Maybe<Array<MachineLogEntryFilterInput>>;
  source: Maybe<MachineLogSourceOperationFilterInput>;
  timestamp: Maybe<ComparableDateTimeOperationFilterInput>;
  timestamps: Maybe<ListComparableDateTimeOperationFilterInput>;
  writeState: Maybe<SerialWriteStateOperationFilterInput>;
};

export type MachineLogEntrySortInput = {
  count: Maybe<SortEnumType>;
  error: Maybe<MachineAlertSortInput>;
  id: Maybe<SortEnumType>;
  isResponse: Maybe<SortEnumType>;
  logLevel: Maybe<SortEnumType>;
  message: Maybe<SortEnumType>;
  source: Maybe<SortEnumType>;
  timestamp: Maybe<SortEnumType>;
  writeState: Maybe<SortEnumType>;
};

export type MachineLogLevelOperationFilterInput = {
  eq: Maybe<MachineLogLevel>;
  in: Maybe<Array<MachineLogLevel>>;
  neq: Maybe<MachineLogLevel>;
  nin: Maybe<Array<MachineLogLevel>>;
};

export type MachineLogSourceOperationFilterInput = {
  eq: Maybe<MachineLogSource>;
  in: Maybe<Array<MachineLogSource>>;
  neq: Maybe<MachineLogSource>;
  nin: Maybe<Array<MachineLogSource>>;
};

export type MachinePartSettingsInput = {
  dataBlob: Scalars['String'];
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  isDefault: Scalars['Boolean'];
  optional: Scalars['Boolean'];
  partType: MachinePartType;
  settings: Array<MachineSettingSettingsInput>;
  specs: Array<MachineSpecSettingsInput>;
  title: Scalars['String'];
};

export type MachineSettingSettingsInput = {
  id: Scalars['String'];
  key: Scalars['String'];
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type MachineSpecSettingsInput = {
  id: Scalars['String'];
  specType: MachineSpecType;
  value: Scalars['Decimal'];
};

export type MoveCommandInput = {
  a: Maybe<Scalars['Decimal']>;
  b: Maybe<Scalars['Decimal']>;
  c: Maybe<Scalars['Decimal']>;
  distanceType: MovementDistanceType;
  motionType: Maybe<MachineMotionType>;
  x: Maybe<Scalars['Decimal']>;
  y: Maybe<Scalars['Decimal']>;
  z: Maybe<Scalars['Decimal']>;
};

export type ProgramFileUploadInput = {
  lastModified: Scalars['Long'];
  name: Scalars['String'];
  size: Scalars['Int'];
  type: Scalars['String'];
};

export type SerialPortOptionsInput = {
  baudRate: Scalars['Int'];
  dataBits: Maybe<Scalars['Int']>;
  handshake: Maybe<Handshake>;
  parity: Maybe<Parity>;
  readBufferSize: Maybe<Scalars['Int']>;
  readTimeout: Maybe<Scalars['Int']>;
  rtsEnable: Maybe<Scalars['Boolean']>;
  stopBits: Maybe<StopBits>;
  writeBufferSize: Maybe<Scalars['Int']>;
  writeTimeout: Maybe<Scalars['Int']>;
};

export type SerialWriteStateOperationFilterInput = {
  eq: Maybe<SerialWriteState>;
  in: Maybe<Array<SerialWriteState>>;
  neq: Maybe<SerialWriteState>;
  nin: Maybe<Array<SerialWriteState>>;
};

export type StringOperationFilterInput = {
  and: Maybe<Array<StringOperationFilterInput>>;
  contains: Maybe<Scalars['String']>;
  endsWith: Maybe<Scalars['String']>;
  eq: Maybe<Scalars['String']>;
  in: Maybe<Array<Maybe<Scalars['String']>>>;
  ncontains: Maybe<Scalars['String']>;
  nendsWith: Maybe<Scalars['String']>;
  neq: Maybe<Scalars['String']>;
  nin: Maybe<Array<Maybe<Scalars['String']>>>;
  nstartsWith: Maybe<Scalars['String']>;
  or: Maybe<Array<StringOperationFilterInput>>;
  startsWith: Maybe<Scalars['String']>;
};

export type SyntaxChunkFilterInput = {
  and: Maybe<Array<SyntaxChunkFilterInput>>;
  comment: Maybe<StringOperationFilterInput>;
  comments: Maybe<ListStringOperationFilterInput>;
  isCode: Maybe<BooleanOperationFilterInput>;
  isValid: Maybe<BooleanOperationFilterInput>;
  or: Maybe<Array<SyntaxChunkFilterInput>>;
  type: Maybe<SyntaxTypeOperationFilterInput>;
  value: Maybe<StringOperationFilterInput>;
};

export type SyntaxTypeOperationFilterInput = {
  eq: Maybe<SyntaxType>;
  in: Maybe<Array<SyntaxType>>;
  neq: Maybe<SyntaxType>;
  nin: Maybe<Array<SyntaxType>>;
};

export type WorkspaceSettingsInput = {
  autoReconnect: Scalars['Boolean'];
  axes: Array<MachineAxisSettingsInput>;
  bkColor: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
  commands: Array<MachineCommandSettingsInput>;
  connection: ConnectionSettingsInput;
  features: Array<MachineFeatureSettingsInput>;
  icon: Maybe<Scalars['String']>;
  id: Scalars['String'];
  machineCategory: MachineCategory;
  machineProfileId: Maybe<Scalars['String']>;
  name: Scalars['String'];
  onboarded: Scalars['Boolean'];
  parts: Array<MachinePartSettingsInput>;
  path: Scalars['String'];
  preferImperial: Scalars['Boolean'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  IMachineFirmwareRequirement:
    | ResolversTypes['FirmwareRequirement']
    | ResolversTypes['MachineFirmware']
    | ResolversTypes['MachineFirmwareSettings'];
  String: ResolverTypeWrapper<Scalars['String']>;
  ISerialPortOptions: ResolversTypes['PortOptions'];
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  IParsedValue:
    | ResolversTypes['ParsedAxisFlags']
    | ResolversTypes['ParsedBool']
    | ResolversTypes['ParsedDecimal']
    | ResolversTypes['ParsedEnumOfKinematicsMode']
    | ResolversTypes['ParsedEnumOfStatusReportType']
    | ResolversTypes['ParsedString'];
  AlertError: ResolverTypeWrapper<AlertError>;
  AppUpdates: ResolverTypeWrapper<AppUpdates>;
  AxisFlags: ResolverTypeWrapper<AxisFlags>;
  CommandSettings: ResolverTypeWrapper<CommandSettings>;
  CompiledInstruction: ResolverTypeWrapper<CompiledInstruction>;
  ConnectedPort: ResolverTypeWrapper<ConnectedPort>;
  ConnectionSettings: ResolverTypeWrapper<ConnectionSettings>;
  ControlledMachine: ResolverTypeWrapper<ControlledMachine>;
  Controller: ResolverTypeWrapper<Controller>;
  EventSettings: ResolverTypeWrapper<EventSettings>;
  FileSystemSettings: ResolverTypeWrapper<FileSystemSettings>;
  FirmwareApplicatorSettings: ResolverTypeWrapper<FirmwareApplicatorSettings>;
  FirmwareAxisValues: ResolverTypeWrapper<FirmwareAxisValues>;
  FirmwareCalibrationSettings: ResolverTypeWrapper<FirmwareCalibrationSettings>;
  FirmwareComparisonNodeOfDecimal: ResolverTypeWrapper<FirmwareComparisonNodeOfDecimal>;
  FirmwareComparisonNodeOfString: ResolverTypeWrapper<FirmwareComparisonNodeOfString>;
  FirmwareHomingSettings: ResolverTypeWrapper<FirmwareHomingSettings>;
  FirmwareMovementSettings: ResolverTypeWrapper<FirmwareMovementSettings>;
  FirmwarePinsSettings: ResolverTypeWrapper<FirmwarePinsSettings>;
  FirmwareReportingSettings: ResolverTypeWrapper<FirmwareReportingSettings>;
  FirmwareRequirement: ResolverTypeWrapper<FirmwareRequirement>;
  FirmwareSetting: ResolverTypeWrapper<
    Omit<FirmwareSetting, 'currentValue' | 'defaultValue'> & {
      currentValue: Maybe<ResolversTypes['IParsedValue']>;
      defaultValue: Maybe<ResolversTypes['IParsedValue']>;
    }
  >;
  FirmwareSettingOfAxisFlags: ResolverTypeWrapper<
    Omit<FirmwareSettingOfAxisFlags, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettingOfBoolean: ResolverTypeWrapper<
    Omit<FirmwareSettingOfBoolean, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettingOfDecimal: ResolverTypeWrapper<
    Omit<FirmwareSettingOfDecimal, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettingOfKinematicsMode: ResolverTypeWrapper<
    Omit<FirmwareSettingOfKinematicsMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettingOfStatusReportType: ResolverTypeWrapper<
    Omit<FirmwareSettingOfStatusReportType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettings: ResolverTypeWrapper<FirmwareSettings>;
  KeyValuePairOfKinematicsModeAndInt32: ResolverTypeWrapper<KeyValuePairOfKinematicsModeAndInt32>;
  KeyValuePairOfStatusReportTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfStatusReportTypeAndInt32>;
  MachineAlert: ResolverTypeWrapper<MachineAlert>;
  MachineApplicatorState: ResolverTypeWrapper<MachineApplicatorState>;
  MachineAxis: ResolverTypeWrapper<MachineAxis>;
  MachineAxisSettings: ResolverTypeWrapper<MachineAxisSettings>;
  MachineBuffer: ResolverTypeWrapper<MachineBuffer>;
  MachineCommand: ResolverTypeWrapper<MachineCommand>;
  MachineCommandSettings: ResolverTypeWrapper<MachineCommandSettings>;
  MachineConfiguration: ResolverTypeWrapper<MachineConfiguration>;
  MachineDetectedFirmware: ResolverTypeWrapper<MachineDetectedFirmware>;
  MachineExecutionResult: ResolverTypeWrapper<MachineExecutionResult>;
  MachineFeature: ResolverTypeWrapper<MachineFeature>;
  MachineFeatureSettings: ResolverTypeWrapper<MachineFeatureSettings>;
  MachineFirmware: ResolverTypeWrapper<MachineFirmware>;
  MachineFirmwareSettings: ResolverTypeWrapper<MachineFirmwareSettings>;
  MachineInstructionResult: ResolverTypeWrapper<MachineInstructionResult>;
  MachineLogEntry: ResolverTypeWrapper<MachineLogEntry>;
  MachineLogEntryConnection: ResolverTypeWrapper<MachineLogEntryConnection>;
  MachineLogEntryEdge: ResolverTypeWrapper<MachineLogEntryEdge>;
  MachineModalStateOfAxisPlane: ResolverTypeWrapper<MachineModalStateOfAxisPlane>;
  MachineModalStateOfEnabledType: ResolverTypeWrapper<MachineModalStateOfEnabledType>;
  MachineModalStateOfFeedRateMode: ResolverTypeWrapper<MachineModalStateOfFeedRateMode>;
  MachineModalStateOfMachineMotionType: ResolverTypeWrapper<MachineModalStateOfMachineMotionType>;
  MachineModalStateOfMachineProgramState: ResolverTypeWrapper<MachineModalStateOfMachineProgramState>;
  MachineModalStateOfMovementDistanceType: ResolverTypeWrapper<MachineModalStateOfMovementDistanceType>;
  MachineModalStateOfPathControlMode: ResolverTypeWrapper<MachineModalStateOfPathControlMode>;
  MachineModalStateOfSpindleSpeedMode: ResolverTypeWrapper<MachineModalStateOfSpindleSpeedMode>;
  MachineModalStateOfTimingMode: ResolverTypeWrapper<MachineModalStateOfTimingMode>;
  MachineModalStateOfUnitType: ResolverTypeWrapper<MachineModalStateOfUnitType>;
  MachineModals: ResolverTypeWrapper<MachineModals>;
  MachineOptions: ResolverTypeWrapper<MachineOptions>;
  MachineOverrides: ResolverTypeWrapper<MachineOverrides>;
  MachinePart: ResolverTypeWrapper<MachinePart>;
  MachinePartSettings: ResolverTypeWrapper<MachinePartSettings>;
  MachinePosition: ResolverTypeWrapper<MachinePosition>;
  MachinePresetSetting: ResolverTypeWrapper<MachinePresetSetting>;
  MachineProfile: ResolverTypeWrapper<MachineProfile>;
  MachineSettingSettings: ResolverTypeWrapper<MachineSettingSettings>;
  MachineSpec: ResolverTypeWrapper<MachineSpec>;
  MachineSpecSettings: ResolverTypeWrapper<MachineSpecSettings>;
  MachineStatus: ResolverTypeWrapper<MachineStatus>;
  MacroSettings: ResolverTypeWrapper<MacroSettings>;
  MakerHubSettings: ResolverTypeWrapper<MakerHubSettings>;
  MountPointSettings: ResolverTypeWrapper<MountPointSettings>;
  Mutation: ResolverTypeWrapper<{}>;
  OpenControllerSession: ResolverTypeWrapper<OpenControllerSession>;
  OpenControllerSettings: ResolverTypeWrapper<OpenControllerSettings>;
  OpenControllerUser: ResolverTypeWrapper<OpenControllerUser>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  ParsedAxisFlags: ResolverTypeWrapper<ParsedAxisFlags>;
  ParsedBool: ResolverTypeWrapper<ParsedBool>;
  ParsedDecimal: ResolverTypeWrapper<ParsedDecimal>;
  ParsedEnumOfKinematicsMode: ResolverTypeWrapper<ParsedEnumOfKinematicsMode>;
  ParsedEnumOfStatusReportType: ResolverTypeWrapper<ParsedEnumOfStatusReportType>;
  ParsedString: ResolverTypeWrapper<ParsedString>;
  PortOptions: ResolverTypeWrapper<PortOptions>;
  PortStatus: ResolverTypeWrapper<PortStatus>;
  ProgramFile: ResolverTypeWrapper<ProgramFile>;
  ProgramFileUpload: ResolverTypeWrapper<ProgramFileUpload>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  SyntaxChunk: ResolverTypeWrapper<SyntaxChunk>;
  SystemPort: ResolverTypeWrapper<SystemPort>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  Workspace: ResolverTypeWrapper<Workspace>;
  WorkspaceSettings: ResolverTypeWrapper<WorkspaceSettings>;
  ActiveState: ActiveState;
  ApplyPolicy: ApplyPolicy;
  AxisName: AxisName;
  AxisPlane: AxisPlane;
  BaudRate: BaudRate;
  EnabledType: EnabledType;
  FactorType: FactorType;
  FeedRateMode: FeedRateMode;
  Handshake: Handshake;
  KinematicsMode: KinematicsMode;
  MachineAlertType: MachineAlertType;
  MachineCategory: MachineCategory;
  MachineControllerType: MachineControllerType;
  MachineLogLevel: MachineLogLevel;
  MachineLogSource: MachineLogSource;
  MachineMotionType: MachineMotionType;
  MachinePartType: MachinePartType;
  MachinePinType: MachinePinType;
  MachineProgramState: MachineProgramState;
  MachineSettingType: MachineSettingType;
  MachineSettingUnits: MachineSettingUnits;
  MachineSpecType: MachineSpecType;
  MovementDistanceType: MovementDistanceType;
  Parity: Parity;
  PathControlMode: PathControlMode;
  PortState: PortState;
  ProgramSyntax: ProgramSyntax;
  RadiusCompensation: RadiusCompensation;
  SerialWriteState: SerialWriteState;
  SortEnumType: SortEnumType;
  SpinDirection: SpinDirection;
  SpindleSpeedMode: SpindleSpeedMode;
  StatusReportType: StatusReportType;
  StopBits: StopBits;
  SyntaxType: SyntaxType;
  TimingMode: TimingMode;
  UnitType: UnitType;
  WorkspaceState: WorkspaceState;
  BooleanOperationFilterInput: BooleanOperationFilterInput;
  ComparableDateTimeOperationFilterInput: ComparableDateTimeOperationFilterInput;
  ComparableInt32OperationFilterInput: ComparableInt32OperationFilterInput;
  ConnectionSettingsInput: ConnectionSettingsInput;
  FirmwareRequirementInput: FirmwareRequirementInput;
  FirmwareSettingChangeInput: FirmwareSettingChangeInput;
  ListComparableDateTimeOperationFilterInput: ListComparableDateTimeOperationFilterInput;
  ListFilterInputTypeOfSyntaxChunkFilterInput: ListFilterInputTypeOfSyntaxChunkFilterInput;
  ListStringOperationFilterInput: ListStringOperationFilterInput;
  MachineAlertFilterInput: MachineAlertFilterInput;
  MachineAlertSortInput: MachineAlertSortInput;
  MachineAlertTypeOperationFilterInput: MachineAlertTypeOperationFilterInput;
  MachineAxisSettingsInput: MachineAxisSettingsInput;
  MachineCommandSettingsInput: MachineCommandSettingsInput;
  MachineFeatureSettingsInput: MachineFeatureSettingsInput;
  MachineFirmwareSettingsInput: MachineFirmwareSettingsInput;
  MachineLogEntryFilterInput: MachineLogEntryFilterInput;
  MachineLogEntrySortInput: MachineLogEntrySortInput;
  MachineLogLevelOperationFilterInput: MachineLogLevelOperationFilterInput;
  MachineLogSourceOperationFilterInput: MachineLogSourceOperationFilterInput;
  MachinePartSettingsInput: MachinePartSettingsInput;
  MachineSettingSettingsInput: MachineSettingSettingsInput;
  MachineSpecSettingsInput: MachineSpecSettingsInput;
  MoveCommandInput: MoveCommandInput;
  ProgramFileUploadInput: ProgramFileUploadInput;
  SerialPortOptionsInput: SerialPortOptionsInput;
  SerialWriteStateOperationFilterInput: SerialWriteStateOperationFilterInput;
  StringOperationFilterInput: StringOperationFilterInput;
  SyntaxChunkFilterInput: SyntaxChunkFilterInput;
  SyntaxTypeOperationFilterInput: SyntaxTypeOperationFilterInput;
  WorkspaceSettingsInput: WorkspaceSettingsInput;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Long: ResolverTypeWrapper<Scalars['Long']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  IMachineFirmwareRequirement:
    | ResolversParentTypes['FirmwareRequirement']
    | ResolversParentTypes['MachineFirmware']
    | ResolversParentTypes['MachineFirmwareSettings'];
  String: Scalars['String'];
  ISerialPortOptions: ResolversParentTypes['PortOptions'];
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  IParsedValue:
    | ResolversParentTypes['ParsedAxisFlags']
    | ResolversParentTypes['ParsedBool']
    | ResolversParentTypes['ParsedDecimal']
    | ResolversParentTypes['ParsedEnumOfKinematicsMode']
    | ResolversParentTypes['ParsedEnumOfStatusReportType']
    | ResolversParentTypes['ParsedString'];
  AlertError: AlertError;
  AppUpdates: AppUpdates;
  AxisFlags: AxisFlags;
  CommandSettings: CommandSettings;
  CompiledInstruction: CompiledInstruction;
  ConnectedPort: ConnectedPort;
  ConnectionSettings: ConnectionSettings;
  ControlledMachine: ControlledMachine;
  Controller: Controller;
  EventSettings: EventSettings;
  FileSystemSettings: FileSystemSettings;
  FirmwareApplicatorSettings: FirmwareApplicatorSettings;
  FirmwareAxisValues: FirmwareAxisValues;
  FirmwareCalibrationSettings: FirmwareCalibrationSettings;
  FirmwareComparisonNodeOfDecimal: FirmwareComparisonNodeOfDecimal;
  FirmwareComparisonNodeOfString: FirmwareComparisonNodeOfString;
  FirmwareHomingSettings: FirmwareHomingSettings;
  FirmwareMovementSettings: FirmwareMovementSettings;
  FirmwarePinsSettings: FirmwarePinsSettings;
  FirmwareReportingSettings: FirmwareReportingSettings;
  FirmwareRequirement: FirmwareRequirement;
  FirmwareSetting: Omit<FirmwareSetting, 'currentValue' | 'defaultValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
    defaultValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettingOfAxisFlags: Omit<FirmwareSettingOfAxisFlags, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettingOfBoolean: Omit<FirmwareSettingOfBoolean, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettingOfDecimal: Omit<FirmwareSettingOfDecimal, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettingOfKinematicsMode: Omit<FirmwareSettingOfKinematicsMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettingOfStatusReportType: Omit<FirmwareSettingOfStatusReportType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettings: FirmwareSettings;
  KeyValuePairOfKinematicsModeAndInt32: KeyValuePairOfKinematicsModeAndInt32;
  KeyValuePairOfStatusReportTypeAndInt32: KeyValuePairOfStatusReportTypeAndInt32;
  MachineAlert: MachineAlert;
  MachineApplicatorState: MachineApplicatorState;
  MachineAxis: MachineAxis;
  MachineAxisSettings: MachineAxisSettings;
  MachineBuffer: MachineBuffer;
  MachineCommand: MachineCommand;
  MachineCommandSettings: MachineCommandSettings;
  MachineConfiguration: MachineConfiguration;
  MachineDetectedFirmware: MachineDetectedFirmware;
  MachineExecutionResult: MachineExecutionResult;
  MachineFeature: MachineFeature;
  MachineFeatureSettings: MachineFeatureSettings;
  MachineFirmware: MachineFirmware;
  MachineFirmwareSettings: MachineFirmwareSettings;
  MachineInstructionResult: MachineInstructionResult;
  MachineLogEntry: MachineLogEntry;
  MachineLogEntryConnection: MachineLogEntryConnection;
  MachineLogEntryEdge: MachineLogEntryEdge;
  MachineModalStateOfAxisPlane: MachineModalStateOfAxisPlane;
  MachineModalStateOfEnabledType: MachineModalStateOfEnabledType;
  MachineModalStateOfFeedRateMode: MachineModalStateOfFeedRateMode;
  MachineModalStateOfMachineMotionType: MachineModalStateOfMachineMotionType;
  MachineModalStateOfMachineProgramState: MachineModalStateOfMachineProgramState;
  MachineModalStateOfMovementDistanceType: MachineModalStateOfMovementDistanceType;
  MachineModalStateOfPathControlMode: MachineModalStateOfPathControlMode;
  MachineModalStateOfSpindleSpeedMode: MachineModalStateOfSpindleSpeedMode;
  MachineModalStateOfTimingMode: MachineModalStateOfTimingMode;
  MachineModalStateOfUnitType: MachineModalStateOfUnitType;
  MachineModals: MachineModals;
  MachineOptions: MachineOptions;
  MachineOverrides: MachineOverrides;
  MachinePart: MachinePart;
  MachinePartSettings: MachinePartSettings;
  MachinePosition: MachinePosition;
  MachinePresetSetting: MachinePresetSetting;
  MachineProfile: MachineProfile;
  MachineSettingSettings: MachineSettingSettings;
  MachineSpec: MachineSpec;
  MachineSpecSettings: MachineSpecSettings;
  MachineStatus: MachineStatus;
  MacroSettings: MacroSettings;
  MakerHubSettings: MakerHubSettings;
  MountPointSettings: MountPointSettings;
  Mutation: {};
  OpenControllerSession: OpenControllerSession;
  OpenControllerSettings: OpenControllerSettings;
  OpenControllerUser: OpenControllerUser;
  PageInfo: PageInfo;
  ParsedAxisFlags: ParsedAxisFlags;
  ParsedBool: ParsedBool;
  ParsedDecimal: ParsedDecimal;
  ParsedEnumOfKinematicsMode: ParsedEnumOfKinematicsMode;
  ParsedEnumOfStatusReportType: ParsedEnumOfStatusReportType;
  ParsedString: ParsedString;
  PortOptions: PortOptions;
  PortStatus: PortStatus;
  ProgramFile: ProgramFile;
  ProgramFileUpload: ProgramFileUpload;
  Query: {};
  Subscription: {};
  SyntaxChunk: SyntaxChunk;
  SystemPort: SystemPort;
  UserProfile: UserProfile;
  Workspace: Workspace;
  WorkspaceSettings: WorkspaceSettings;
  BooleanOperationFilterInput: BooleanOperationFilterInput;
  ComparableDateTimeOperationFilterInput: ComparableDateTimeOperationFilterInput;
  ComparableInt32OperationFilterInput: ComparableInt32OperationFilterInput;
  ConnectionSettingsInput: ConnectionSettingsInput;
  FirmwareRequirementInput: FirmwareRequirementInput;
  FirmwareSettingChangeInput: FirmwareSettingChangeInput;
  ListComparableDateTimeOperationFilterInput: ListComparableDateTimeOperationFilterInput;
  ListFilterInputTypeOfSyntaxChunkFilterInput: ListFilterInputTypeOfSyntaxChunkFilterInput;
  ListStringOperationFilterInput: ListStringOperationFilterInput;
  MachineAlertFilterInput: MachineAlertFilterInput;
  MachineAlertSortInput: MachineAlertSortInput;
  MachineAlertTypeOperationFilterInput: MachineAlertTypeOperationFilterInput;
  MachineAxisSettingsInput: MachineAxisSettingsInput;
  MachineCommandSettingsInput: MachineCommandSettingsInput;
  MachineFeatureSettingsInput: MachineFeatureSettingsInput;
  MachineFirmwareSettingsInput: MachineFirmwareSettingsInput;
  MachineLogEntryFilterInput: MachineLogEntryFilterInput;
  MachineLogEntrySortInput: MachineLogEntrySortInput;
  MachineLogLevelOperationFilterInput: MachineLogLevelOperationFilterInput;
  MachineLogSourceOperationFilterInput: MachineLogSourceOperationFilterInput;
  MachinePartSettingsInput: MachinePartSettingsInput;
  MachineSettingSettingsInput: MachineSettingSettingsInput;
  MachineSpecSettingsInput: MachineSpecSettingsInput;
  MoveCommandInput: MoveCommandInput;
  ProgramFileUploadInput: ProgramFileUploadInput;
  SerialPortOptionsInput: SerialPortOptionsInput;
  SerialWriteStateOperationFilterInput: SerialWriteStateOperationFilterInput;
  StringOperationFilterInput: StringOperationFilterInput;
  SyntaxChunkFilterInput: SyntaxChunkFilterInput;
  SyntaxTypeOperationFilterInput: SyntaxTypeOperationFilterInput;
  WorkspaceSettingsInput: WorkspaceSettingsInput;
  Decimal: Scalars['Decimal'];
  DateTime: Scalars['DateTime'];
  Long: Scalars['Long'];
};

export type IMachineFirmwareRequirementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IMachineFirmwareRequirement'] = ResolversParentTypes['IMachineFirmwareRequirement']
> = {
  __resolveType: TypeResolveFn<
    'FirmwareRequirement' | 'MachineFirmware' | 'MachineFirmwareSettings',
    ParentType,
    ContextType
  >;
  controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
  downloadUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  edition: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  helpUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  suggestedVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
};

export type ISerialPortOptionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ISerialPortOptions'] = ResolversParentTypes['ISerialPortOptions']
> = {
  __resolveType: TypeResolveFn<'PortOptions', ParentType, ContextType>;
  baudRate: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dataBits: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  handshake: Resolver<Maybe<ResolversTypes['Handshake']>, ParentType, ContextType>;
  parity: Resolver<Maybe<ResolversTypes['Parity']>, ParentType, ContextType>;
  readBufferSize: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  readTimeout: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rtsEnable: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stopBits: Resolver<Maybe<ResolversTypes['StopBits']>, ParentType, ContextType>;
  writeBufferSize: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  writeTimeout: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type IParsedValueResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IParsedValue'] = ResolversParentTypes['IParsedValue']
> = {
  __resolveType: TypeResolveFn<
    | 'ParsedAxisFlags'
    | 'ParsedBool'
    | 'ParsedDecimal'
    | 'ParsedEnumOfKinematicsMode'
    | 'ParsedEnumOfStatusReportType'
    | 'ParsedString',
    ParentType,
    ContextType
  >;
};

export type AlertErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AlertError'] = ResolversParentTypes['AlertError']
> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AppUpdatesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AppUpdates'] = ResolversParentTypes['AppUpdates']
> = {
  checkForUpdates: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  prereleases: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AxisFlagsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AxisFlags'] = ResolversParentTypes['AxisFlags']
> = {
  x: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  y: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  z: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommandSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CommandSettings'] = ResolversParentTypes['CommandSettings']
> = {
  commands: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mtime: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompiledInstructionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['CompiledInstruction'] = ResolversParentTypes['CompiledInstruction']
> = {
  chunks: Resolver<Array<ResolversTypes['SyntaxChunk']>, ParentType, ContextType>;
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectedPortResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConnectedPort'] = ResolversParentTypes['ConnectedPort']
> = {
  createdAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  machine: Resolver<ResolversTypes['ControlledMachine'], ParentType, ContextType>;
  port: Resolver<ResolversTypes['SystemPort'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['PortStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ConnectionSettings'] = ResolversParentTypes['ConnectionSettings']
> = {
  firmware: Resolver<ResolversTypes['MachineFirmwareSettings'], ParentType, ContextType>;
  firmwareRequirement: Resolver<ResolversTypes['IMachineFirmwareRequirement'], ParentType, ContextType>;
  machineProfileId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manufacturer: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  portName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toSerialPortOptions: Resolver<ResolversTypes['ISerialPortOptions'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ControlledMachineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ControlledMachine'] = ResolversParentTypes['ControlledMachine']
> = {
  configuration: Resolver<ResolversTypes['MachineConfiguration'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  logs: Resolver<
    Maybe<ResolversTypes['MachineLogEntryConnection']>,
    ParentType,
    ContextType,
    RequireFields<ControlledMachineLogsArgs, never>
  >;
  machineProfileId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  settings: Resolver<ResolversTypes['FirmwareSettings'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['MachineStatus'], ParentType, ContextType>;
  topicId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ControllerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Controller'] = ResolversParentTypes['Controller']
> = {
  checkCode: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  configuration: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  firmware: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  help: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  homing: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  move: Resolver<
    ResolversTypes['MachineExecutionResult'],
    ParentType,
    ContextType,
    RequireFields<ControllerMoveArgs, 'moveCommand'>
  >;
  parameters: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  pause: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  play: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  reset: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  setFirmwareSetting: Resolver<
    ResolversTypes['MachineExecutionResult'],
    ParentType,
    ContextType,
    RequireFields<ControllerSetFirmwareSettingArgs, 'settingChange'>
  >;
  setFirmwareSettings: Resolver<
    Array<ResolversTypes['MachineExecutionResult']>,
    ParentType,
    ContextType,
    RequireFields<ControllerSetFirmwareSettingsArgs, 'settingChanges'>
  >;
  settings: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  startup: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  unlock: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  writeCommand: Resolver<
    ResolversTypes['MachineExecutionResult'],
    ParentType,
    ContextType,
    RequireFields<ControllerWriteCommandArgs, 'commandCode' | 'sourceName'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EventSettings'] = ResolversParentTypes['EventSettings']
> = {
  commands: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  event: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mtime: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  trigger: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileSystemSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FileSystemSettings'] = ResolversParentTypes['FileSystemSettings']
> = {
  documentsDirectory: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mountPoints: Resolver<Array<ResolversTypes['MountPointSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareApplicatorSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareApplicatorSettings'] = ResolversParentTypes['FirmwareApplicatorSettings']
> = {
  laserEnabled: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  shuttleRadius: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  shuttleWeight: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  speedMax: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  speedMin: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareAxisValuesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareAxisValues'] = ResolversParentTypes['FirmwareAxisValues']
> = {
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  x: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  y: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  z: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareCalibrationSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareCalibrationSettings'] = ResolversParentTypes['FirmwareCalibrationSettings']
> = {
  chainElongationFactor: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  chainLength: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  chainOverSprocket: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  chainSagCorrection: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  homeChainLengths: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  kinematics: Resolver<ResolversTypes['FirmwareSettingOfKinematicsMode'], ParentType, ContextType>;
  leftChainTolerance: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  motorDistance: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  rightChainTolerance: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  scaling: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareComparisonNodeOfDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareComparisonNodeOfDecimal'] = ResolversParentTypes['FirmwareComparisonNodeOfDecimal']
> = {
  detectedValue: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  hasDetectedValue: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  meetsRequirement: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requiredValue: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareComparisonNodeOfStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareComparisonNodeOfString'] = ResolversParentTypes['FirmwareComparisonNodeOfString']
> = {
  detectedValue: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasDetectedValue: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  meetsRequirement: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  requiredValue: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareHomingSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareHomingSettings'] = ResolversParentTypes['FirmwareHomingSettings']
> = {
  debounce: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  directionInvert: Resolver<ResolversTypes['FirmwareSettingOfAxisFlags'], ParentType, ContextType>;
  enabled: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  feedRate: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  pullOff: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  seekRate: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareMovementSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareMovementSettings'] = ResolversParentTypes['FirmwareMovementSettings']
> = {
  acceleration: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  arcTolerance: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  hardLimits: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  junctionDeviation: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  machineSize: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  positionMax: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  positionMin: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  rateMax: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  softLimits: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwarePinsSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwarePinsSettings'] = ResolversParentTypes['FirmwarePinsSettings']
> = {
  imax: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  kDerivative: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  kIntegral: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  kProportional: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  limitPinsInvert: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  probePinInvert: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  stepDirectionInvert: Resolver<ResolversTypes['FirmwareSettingOfAxisFlags'], ParentType, ContextType>;
  stepEnableInvert: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  stepIdleDelay: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  stepPulse: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  stepSignalInvert: Resolver<ResolversTypes['FirmwareSettingOfAxisFlags'], ParentType, ContextType>;
  steps: Resolver<ResolversTypes['FirmwareAxisValues'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareReportingSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareReportingSettings'] = ResolversParentTypes['FirmwareReportingSettings']
> = {
  reportInches: Resolver<ResolversTypes['FirmwareSettingOfBoolean'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  statusReport: Resolver<ResolversTypes['FirmwareSettingOfStatusReportType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareRequirementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareRequirement'] = ResolversParentTypes['FirmwareRequirement']
> = {
  controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
  downloadUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  edition: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  helpUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  suggestedVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSetting'] = ResolversParentTypes['FirmwareSetting']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  defaultValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfAxisFlagsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfAxisFlags'] = ResolversParentTypes['FirmwareSettingOfAxisFlags']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['AxisFlags'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfBooleanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfBoolean'] = ResolversParentTypes['FirmwareSettingOfBoolean']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfDecimal'] = ResolversParentTypes['FirmwareSettingOfDecimal']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfKinematicsModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfKinematicsMode'] = ResolversParentTypes['FirmwareSettingOfKinematicsMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['KinematicsMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfStatusReportTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfStatusReportType'] = ResolversParentTypes['FirmwareSettingOfStatusReportType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['StatusReportType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettings'] = ResolversParentTypes['FirmwareSettings']
> = {
  applicator: Resolver<ResolversTypes['FirmwareApplicatorSettings'], ParentType, ContextType>;
  calibration: Resolver<ResolversTypes['FirmwareCalibrationSettings'], ParentType, ContextType>;
  homing: Resolver<ResolversTypes['FirmwareHomingSettings'], ParentType, ContextType>;
  movement: Resolver<ResolversTypes['FirmwareMovementSettings'], ParentType, ContextType>;
  pins: Resolver<ResolversTypes['FirmwarePinsSettings'], ParentType, ContextType>;
  reporting: Resolver<ResolversTypes['FirmwareReportingSettings'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfKinematicsModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfKinematicsModeAndInt32'] = ResolversParentTypes['KeyValuePairOfKinematicsModeAndInt32']
> = {
  key: Resolver<ResolversTypes['KinematicsMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfStatusReportTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfStatusReportTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfStatusReportTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['StatusReportType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineAlertResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineAlert'] = ResolversParentTypes['MachineAlert']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['MachineAlertType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineApplicatorStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineApplicatorState'] = ResolversParentTypes['MachineApplicatorState']
> = {
  feedRate: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  isFloodCoolantEnabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMistCoolantEnabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isOn: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lengthOffset: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  lengthOffsetFactorType: Resolver<ResolversTypes['FactorType'], ParentType, ContextType>;
  probePosition: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  radiusCompensation: Resolver<ResolversTypes['RadiusCompensation'], ParentType, ContextType>;
  spinDirection: Resolver<ResolversTypes['SpinDirection'], ParentType, ContextType>;
  spinSpeed: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  temperature: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  toolId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineAxisResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineAxis'] = ResolversParentTypes['MachineAxis']
> = {
  accuracy: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
  max: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  min: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['AxisName'], ParentType, ContextType>;
  precision: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineAxisSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineAxisSettings'] = ResolversParentTypes['MachineAxisSettings']
> = {
  accuracy: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  max: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  min: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['AxisName'], ParentType, ContextType>;
  precision: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineBufferResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineBuffer'] = ResolversParentTypes['MachineBuffer']
> = {
  availableReceive: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableSend: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lineNumber: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  responseQueueLength: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  writeQueueLength: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineCommandResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineCommand'] = ResolversParentTypes['MachineCommand']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syntax: Resolver<ResolversTypes['ProgramSyntax'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineCommandSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineCommandSettings'] = ResolversParentTypes['MachineCommandSettings']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syntax: Resolver<ResolversTypes['ProgramSyntax'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineConfigurationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineConfiguration'] = ResolversParentTypes['MachineConfiguration']
> = {
  firmware: Resolver<ResolversTypes['MachineDetectedFirmware'], ParentType, ContextType>;
  modals: Resolver<ResolversTypes['MachineModals'], ParentType, ContextType>;
  options: Resolver<Maybe<ResolversTypes['MachineOptions']>, ParentType, ContextType>;
  referencePosition: Resolver<Array<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  workCoordinates: Resolver<Array<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  workOffset: Resolver<ResolversTypes['MachinePosition'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineDetectedFirmwareResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineDetectedFirmware'] = ResolversParentTypes['MachineDetectedFirmware']
> = {
  edition: Resolver<ResolversTypes['FirmwareComparisonNodeOfString'], ParentType, ContextType>;
  friendlyName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isValid: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  meetsRequirements: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['FirmwareComparisonNodeOfString'], ParentType, ContextType>;
  protocol: Resolver<ResolversTypes['FirmwareComparisonNodeOfString'], ParentType, ContextType>;
  requirement: Resolver<ResolversTypes['FirmwareRequirement'], ParentType, ContextType>;
  version: Resolver<ResolversTypes['FirmwareComparisonNodeOfDecimal'], ParentType, ContextType>;
  welcomeMessage: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineExecutionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineExecutionResult'] = ResolversParentTypes['MachineExecutionResult']
> = {
  instructionResults: Resolver<Array<ResolversTypes['MachineInstructionResult']>, ParentType, ContextType>;
  machine: Resolver<ResolversTypes['ControlledMachine'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineFeatureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineFeature'] = ResolversParentTypes['MachineFeature']
> = {
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineFeatureSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineFeatureSettings'] = ResolversParentTypes['MachineFeatureSettings']
> = {
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  disabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  icon: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineFirmwareResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineFirmware'] = ResolversParentTypes['MachineFirmware']
> = {
  baudRate: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  baudRateValue: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
  downloadUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  edition: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  helpUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requiredVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  rtscts: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  suggestedVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineFirmwareSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineFirmwareSettings'] = ResolversParentTypes['MachineFirmwareSettings']
> = {
  baudRate: Resolver<Maybe<ResolversTypes['BaudRate']>, ParentType, ContextType>;
  baudRateValue: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  controllerType: Resolver<ResolversTypes['MachineControllerType'], ParentType, ContextType>;
  downloadUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  edition: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  helpUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  requiredVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  rtscts: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  suggestedVersion: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineInstructionResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineInstructionResult'] = ResolversParentTypes['MachineInstructionResult']
> = {
  instruction: Resolver<ResolversTypes['CompiledInstruction'], ParentType, ContextType>;
  responseLogEntry: Resolver<Maybe<ResolversTypes['MachineLogEntry']>, ParentType, ContextType>;
  writeLogEntry: Resolver<ResolversTypes['MachineLogEntry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLogEntryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineLogEntry'] = ResolversParentTypes['MachineLogEntry']
> = {
  canMergeWith: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  code: Resolver<Array<ResolversTypes['SyntaxChunk']>, ParentType, ContextType>;
  count: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  error: Resolver<Maybe<ResolversTypes['MachineAlert']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isResponse: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  logLevel: Resolver<ResolversTypes['MachineLogLevel'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source: Resolver<ResolversTypes['MachineLogSource'], ParentType, ContextType>;
  timestamp: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  timestamps: Resolver<Array<ResolversTypes['DateTime']>, ParentType, ContextType>;
  writeState: Resolver<ResolversTypes['SerialWriteState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLogEntryConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineLogEntryConnection'] = ResolversParentTypes['MachineLogEntryConnection']
> = {
  edges: Resolver<Maybe<Array<ResolversTypes['MachineLogEntryEdge']>>, ParentType, ContextType>;
  nodes: Resolver<Maybe<Array<ResolversTypes['MachineLogEntry']>>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineLogEntryEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineLogEntryEdge'] = ResolversParentTypes['MachineLogEntryEdge']
> = {
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['MachineLogEntry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfAxisPlaneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfAxisPlane'] = ResolversParentTypes['MachineModalStateOfAxisPlane']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['AxisPlane'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfEnabledTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfEnabledType'] = ResolversParentTypes['MachineModalStateOfEnabledType']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['EnabledType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfFeedRateModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfFeedRateMode'] = ResolversParentTypes['MachineModalStateOfFeedRateMode']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['FeedRateMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfMachineMotionTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfMachineMotionType'] = ResolversParentTypes['MachineModalStateOfMachineMotionType']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['MachineMotionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfMachineProgramStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfMachineProgramState'] = ResolversParentTypes['MachineModalStateOfMachineProgramState']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['MachineProgramState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfMovementDistanceTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfMovementDistanceType'] = ResolversParentTypes['MachineModalStateOfMovementDistanceType']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['MovementDistanceType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfPathControlModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfPathControlMode'] = ResolversParentTypes['MachineModalStateOfPathControlMode']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['PathControlMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfSpindleSpeedModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfSpindleSpeedMode'] = ResolversParentTypes['MachineModalStateOfSpindleSpeedMode']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['SpindleSpeedMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfTimingModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfTimingMode'] = ResolversParentTypes['MachineModalStateOfTimingMode']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['TimingMode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalStateOfUnitTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModalStateOfUnitType'] = ResolversParentTypes['MachineModalStateOfUnitType']
> = {
  code: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineModalsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModals'] = ResolversParentTypes['MachineModals']
> = {
  arcDistance: Resolver<Maybe<ResolversTypes['MachineModalStateOfMovementDistanceType']>, ParentType, ContextType>;
  cannedCycleReturnMode: Resolver<Maybe<ResolversTypes['MachineModalStateOfTimingMode']>, ParentType, ContextType>;
  cylindricalInterpolation: Resolver<Maybe<ResolversTypes['MachineModalStateOfEnabledType']>, ParentType, ContextType>;
  distance: Resolver<Maybe<ResolversTypes['MachineModalStateOfMovementDistanceType']>, ParentType, ContextType>;
  feedRate: Resolver<Maybe<ResolversTypes['MachineModalStateOfFeedRateMode']>, ParentType, ContextType>;
  motion: Resolver<ResolversTypes['MachineModalStateOfMachineMotionType'], ParentType, ContextType>;
  pathControlMode: Resolver<Maybe<ResolversTypes['MachineModalStateOfPathControlMode']>, ParentType, ContextType>;
  plane: Resolver<Maybe<ResolversTypes['MachineModalStateOfAxisPlane']>, ParentType, ContextType>;
  programState: Resolver<Maybe<ResolversTypes['MachineModalStateOfMachineProgramState']>, ParentType, ContextType>;
  spindleSpeed: Resolver<Maybe<ResolversTypes['MachineModalStateOfSpindleSpeedMode']>, ParentType, ContextType>;
  units: Resolver<Maybe<ResolversTypes['MachineModalStateOfUnitType']>, ParentType, ContextType>;
  userDefinedCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userDefinedCurrent: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workCoordinateSystemCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  workCoordinateSystemCurrent: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineOptionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineOptions'] = ResolversParentTypes['MachineOptions']
> = {
  raw: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineOverridesResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineOverrides'] = ResolversParentTypes['MachineOverrides']
> = {
  feed: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  feedAllowed: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  rapids: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  speed: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  speedAllowed: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachinePartResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachinePart'] = ResolversParentTypes['MachinePart']
> = {
  dataBlob: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDefault: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  machineProfiles: Resolver<Array<ResolversTypes['MachineProfile']>, ParentType, ContextType>;
  optional: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  partType: Resolver<ResolversTypes['MachinePartType'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['MachinePresetSetting']>, ParentType, ContextType>;
  sortOrder: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  specs: Resolver<Array<ResolversTypes['MachineSpec']>, ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachinePartSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachinePartSettings'] = ResolversParentTypes['MachinePartSettings']
> = {
  dataBlob: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isDefault: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  optional: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  partType: Resolver<ResolversTypes['MachinePartType'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['MachineSettingSettings']>, ParentType, ContextType>;
  specs: Resolver<Array<ResolversTypes['MachineSpecSettings']>, ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachinePositionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachinePosition'] = ResolversParentTypes['MachinePosition']
> = {
  a: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  b: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  c: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  x: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  y: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  z: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachinePresetSettingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachinePresetSetting'] = ResolversParentTypes['MachinePresetSetting']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineParts: Resolver<Array<ResolversTypes['MachinePart']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineProfile'] = ResolversParentTypes['MachineProfile']
> = {
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

export type MachineSettingSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineSettingSettings'] = ResolversParentTypes['MachineSettingSettings']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineSpecResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineSpec'] = ResolversParentTypes['MachineSpec']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineParts: Resolver<Array<ResolversTypes['MachinePart']>, ParentType, ContextType>;
  specType: Resolver<ResolversTypes['MachineSpecType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineSpecSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineSpecSettings'] = ResolversParentTypes['MachineSpecSettings']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specType: Resolver<ResolversTypes['MachineSpecType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineStatus'] = ResolversParentTypes['MachineStatus']
> = {
  activePins: Resolver<Array<ResolversTypes['MachinePinType']>, ParentType, ContextType>;
  activityState: Resolver<ResolversTypes['ActiveState'], ParentType, ContextType>;
  alarm: Resolver<Maybe<ResolversTypes['MachineAlert']>, ParentType, ContextType>;
  applicator: Resolver<ResolversTypes['MachineApplicatorState'], ParentType, ContextType>;
  buffer: Resolver<ResolversTypes['MachineBuffer'], ParentType, ContextType>;
  machinePosition: Resolver<ResolversTypes['MachinePosition'], ParentType, ContextType>;
  overrides: Resolver<Maybe<ResolversTypes['MachineOverrides']>, ParentType, ContextType>;
  workCoordinateOffset: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  workPosition: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MacroSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MacroSettings'] = ResolversParentTypes['MacroSettings']
> = {
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mtime: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MakerHubSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MakerHubSettings'] = ResolversParentTypes['MakerHubSettings']
> = {
  enabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MountPointSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MountPointSettings'] = ResolversParentTypes['MountPointSettings']
> = {
  route: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  changeWorkspacePort: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationChangeWorkspacePortArgs, 'portName' | 'workspaceId'>
  >;
  closePort: Resolver<
    ResolversTypes['SystemPort'],
    ParentType,
    ContextType,
    RequireFields<MutationClosePortArgs, 'portName'>
  >;
  closeWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationCloseWorkspaceArgs, 'workspaceId'>
  >;
  controlMachine: Resolver<
    ResolversTypes['Controller'],
    ParentType,
    ContextType,
    RequireFields<MutationControlMachineArgs, 'workspaceId'>
  >;
  createWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateWorkspaceArgs, 'workspaceSettings'>
  >;
  deleteWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteWorkspaceArgs, 'workspaceId'>
  >;
  openPort: Resolver<
    ResolversTypes['SystemPort'],
    ParentType,
    ContextType,
    RequireFields<MutationOpenPortArgs, 'firmware' | 'options' | 'portName'>
  >;
  openWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationOpenWorkspaceArgs, 'workspaceId'>
  >;
  updateWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWorkspaceArgs, 'workspaceSettings'>
  >;
  uploadProgram: Resolver<
    ResolversTypes['ProgramFileUpload'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadProgramArgs, 'fileUpload'>
  >;
};

export type OpenControllerSessionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OpenControllerSession'] = ResolversParentTypes['OpenControllerSession']
> = {
  roles: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  token: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user: Resolver<ResolversTypes['OpenControllerUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenControllerSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OpenControllerSettings'] = ResolversParentTypes['OpenControllerSettings']
> = {
  appUpdates: Resolver<ResolversTypes['AppUpdates'], ParentType, ContextType>;
  commands: Resolver<Array<ResolversTypes['CommandSettings']>, ParentType, ContextType>;
  events: Resolver<Array<ResolversTypes['EventSettings']>, ParentType, ContextType>;
  fileSystem: Resolver<ResolversTypes['FileSystemSettings'], ParentType, ContextType>;
  hub: Resolver<ResolversTypes['MakerHubSettings'], ParentType, ContextType>;
  macros: Resolver<Array<ResolversTypes['MacroSettings']>, ParentType, ContextType>;
  users: Resolver<Array<ResolversTypes['OpenControllerUser']>, ParentType, ContextType>;
  workspaces: Resolver<Array<ResolversTypes['WorkspaceSettings']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpenControllerUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['OpenControllerUser'] = ResolversParentTypes['OpenControllerUser']
> = {
  authenticationType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enabled: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokens: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedAxisFlagsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedAxisFlags'] = ResolversParentTypes['ParsedAxisFlags']
> = {
  valueAxisFlags: Resolver<ResolversTypes['AxisFlags'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedBoolResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedBool'] = ResolversParentTypes['ParsedBool']
> = {
  valueBool: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedDecimal'] = ResolversParentTypes['ParsedDecimal']
> = {
  valueDecimal: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfKinematicsModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfKinematicsMode'] = ResolversParentTypes['ParsedEnumOfKinematicsMode']
> = {
  valueEnum: Resolver<ResolversTypes['KinematicsMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfKinematicsModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfStatusReportTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfStatusReportType'] = ResolversParentTypes['ParsedEnumOfStatusReportType']
> = {
  valueEnum: Resolver<ResolversTypes['StatusReportType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfStatusReportTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedString'] = ResolversParentTypes['ParsedString']
> = {
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PortOptionsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PortOptions'] = ResolversParentTypes['PortOptions']
> = {
  baudRate: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dataBits: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  handshake: Resolver<Maybe<ResolversTypes['Handshake']>, ParentType, ContextType>;
  parity: Resolver<Maybe<ResolversTypes['Parity']>, ParentType, ContextType>;
  readBufferSize: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  readTimeout: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rtsEnable: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stopBits: Resolver<Maybe<ResolversTypes['StopBits']>, ParentType, ContextType>;
  writeBufferSize: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  writeTimeout: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PortStatusResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PortStatus'] = ResolversParentTypes['PortStatus']
> = {
  bytesToRead: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bytesToWrite: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  charactersRead: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  charactersWritten: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isOpen: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  linesRead: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  linesWritten: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFile'] = ResolversParentTypes['ProgramFile']
> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  syntax: Resolver<ResolversTypes['ProgramSyntax'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileUploadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFileUpload'] = ResolversParentTypes['ProgramFileUpload']
> = {
  lastModified: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  authenticate: Resolver<
    ResolversTypes['OpenControllerSession'],
    ParentType,
    ContextType,
    RequireFields<QueryAuthenticateArgs, 'token'>
  >;
  getPort: Resolver<ResolversTypes['SystemPort'], ParentType, ContextType, RequireFields<QueryGetPortArgs, 'portName'>>;
  getSettings: Resolver<ResolversTypes['OpenControllerSettings'], ParentType, ContextType>;
  getWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<QueryGetWorkspaceArgs, 'workspaceId'>
  >;
  listPorts: Resolver<Array<ResolversTypes['SystemPort']>, ParentType, ContextType>;
  listWorkspaces: Resolver<Array<ResolversTypes['Workspace']>, ParentType, ContextType>;
  machineProfile: Resolver<
    ResolversTypes['MachineProfile'],
    ParentType,
    ContextType,
    RequireFields<QueryMachineProfileArgs, 'id'>
  >;
  machineProfileCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  machineProfiles: Resolver<
    Array<ResolversTypes['MachineProfile']>,
    ParentType,
    ContextType,
    RequireFields<QueryMachineProfilesArgs, never>
  >;
  me: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  programs: Resolver<Array<ResolversTypes['ProgramFile']>, ParentType, ContextType>;
  userProfile: Resolver<
    ResolversTypes['UserProfile'],
    ParentType,
    ContextType,
    RequireFields<QueryUserProfileArgs, 'id'>
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  onMachineConfiguration: SubscriptionResolver<
    ResolversTypes['ControlledMachine'],
    'onMachineConfiguration',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnMachineConfigurationArgs, 'portName'>
  >;
  onMachineLog: SubscriptionResolver<
    ResolversTypes['ControlledMachine'],
    'onMachineLog',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnMachineLogArgs, 'portName'>
  >;
  onMachineSetting: SubscriptionResolver<
    ResolversTypes['ControlledMachine'],
    'onMachineSetting',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnMachineSettingArgs, 'portName'>
  >;
  onMachineStatus: SubscriptionResolver<
    ResolversTypes['ControlledMachine'],
    'onMachineStatus',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnMachineStatusArgs, 'portName'>
  >;
  onPortChange: SubscriptionResolver<ResolversTypes['SystemPort'], 'onPortChange', ParentType, ContextType>;
  onWorkspaceChange: SubscriptionResolver<ResolversTypes['Workspace'], 'onWorkspaceChange', ParentType, ContextType>;
};

export type SyntaxChunkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SyntaxChunk'] = ResolversParentTypes['SyntaxChunk']
> = {
  comment: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  isCode: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isValid: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['SyntaxType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SystemPortResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SystemPort'] = ResolversParentTypes['SystemPort']
> = {
  connection: Resolver<Maybe<ResolversTypes['ConnectedPort']>, ParentType, ContextType>;
  error: Resolver<Maybe<ResolversTypes['AlertError']>, ParentType, ContextType>;
  options: Resolver<ResolversTypes['PortOptions'], ParentType, ContextType>;
  portName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['PortState'], ParentType, ContextType>;
  topicId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']
> = {
  authenticationType: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Workspace'] = ResolversParentTypes['Workspace']
> = {
  error: Resolver<Maybe<ResolversTypes['AlertError']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  port: Resolver<Maybe<ResolversTypes['SystemPort']>, ParentType, ContextType>;
  portName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings: Resolver<ResolversTypes['WorkspaceSettings'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['WorkspaceState'], ParentType, ContextType>;
  topicId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  units: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WorkspaceSettingsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['WorkspaceSettings'] = ResolversParentTypes['WorkspaceSettings']
> = {
  autoReconnect: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  axes: Resolver<Array<ResolversTypes['MachineAxisSettings']>, ParentType, ContextType>;
  bkColor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  color: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commands: Resolver<Array<ResolversTypes['MachineCommandSettings']>, ParentType, ContextType>;
  connection: Resolver<ResolversTypes['ConnectionSettings'], ParentType, ContextType>;
  features: Resolver<Array<ResolversTypes['MachineFeatureSettings']>, ParentType, ContextType>;
  icon: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  machineCategory: Resolver<ResolversTypes['MachineCategory'], ParentType, ContextType>;
  machineProfileId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  onboarded: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  parts: Resolver<Array<ResolversTypes['MachinePartSettings']>, ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferImperial: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface LongScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Long'], any> {
  name: 'Long';
}

export type Resolvers<ContextType = any> = {
  IMachineFirmwareRequirement: IMachineFirmwareRequirementResolvers<ContextType>;
  ISerialPortOptions: ISerialPortOptionsResolvers<ContextType>;
  IParsedValue: IParsedValueResolvers<ContextType>;
  AlertError: AlertErrorResolvers<ContextType>;
  AppUpdates: AppUpdatesResolvers<ContextType>;
  AxisFlags: AxisFlagsResolvers<ContextType>;
  CommandSettings: CommandSettingsResolvers<ContextType>;
  CompiledInstruction: CompiledInstructionResolvers<ContextType>;
  ConnectedPort: ConnectedPortResolvers<ContextType>;
  ConnectionSettings: ConnectionSettingsResolvers<ContextType>;
  ControlledMachine: ControlledMachineResolvers<ContextType>;
  Controller: ControllerResolvers<ContextType>;
  EventSettings: EventSettingsResolvers<ContextType>;
  FileSystemSettings: FileSystemSettingsResolvers<ContextType>;
  FirmwareApplicatorSettings: FirmwareApplicatorSettingsResolvers<ContextType>;
  FirmwareAxisValues: FirmwareAxisValuesResolvers<ContextType>;
  FirmwareCalibrationSettings: FirmwareCalibrationSettingsResolvers<ContextType>;
  FirmwareComparisonNodeOfDecimal: FirmwareComparisonNodeOfDecimalResolvers<ContextType>;
  FirmwareComparisonNodeOfString: FirmwareComparisonNodeOfStringResolvers<ContextType>;
  FirmwareHomingSettings: FirmwareHomingSettingsResolvers<ContextType>;
  FirmwareMovementSettings: FirmwareMovementSettingsResolvers<ContextType>;
  FirmwarePinsSettings: FirmwarePinsSettingsResolvers<ContextType>;
  FirmwareReportingSettings: FirmwareReportingSettingsResolvers<ContextType>;
  FirmwareRequirement: FirmwareRequirementResolvers<ContextType>;
  FirmwareSetting: FirmwareSettingResolvers<ContextType>;
  FirmwareSettingOfAxisFlags: FirmwareSettingOfAxisFlagsResolvers<ContextType>;
  FirmwareSettingOfBoolean: FirmwareSettingOfBooleanResolvers<ContextType>;
  FirmwareSettingOfDecimal: FirmwareSettingOfDecimalResolvers<ContextType>;
  FirmwareSettingOfKinematicsMode: FirmwareSettingOfKinematicsModeResolvers<ContextType>;
  FirmwareSettingOfStatusReportType: FirmwareSettingOfStatusReportTypeResolvers<ContextType>;
  FirmwareSettings: FirmwareSettingsResolvers<ContextType>;
  KeyValuePairOfKinematicsModeAndInt32: KeyValuePairOfKinematicsModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfStatusReportTypeAndInt32: KeyValuePairOfStatusReportTypeAndInt32Resolvers<ContextType>;
  MachineAlert: MachineAlertResolvers<ContextType>;
  MachineApplicatorState: MachineApplicatorStateResolvers<ContextType>;
  MachineAxis: MachineAxisResolvers<ContextType>;
  MachineAxisSettings: MachineAxisSettingsResolvers<ContextType>;
  MachineBuffer: MachineBufferResolvers<ContextType>;
  MachineCommand: MachineCommandResolvers<ContextType>;
  MachineCommandSettings: MachineCommandSettingsResolvers<ContextType>;
  MachineConfiguration: MachineConfigurationResolvers<ContextType>;
  MachineDetectedFirmware: MachineDetectedFirmwareResolvers<ContextType>;
  MachineExecutionResult: MachineExecutionResultResolvers<ContextType>;
  MachineFeature: MachineFeatureResolvers<ContextType>;
  MachineFeatureSettings: MachineFeatureSettingsResolvers<ContextType>;
  MachineFirmware: MachineFirmwareResolvers<ContextType>;
  MachineFirmwareSettings: MachineFirmwareSettingsResolvers<ContextType>;
  MachineInstructionResult: MachineInstructionResultResolvers<ContextType>;
  MachineLogEntry: MachineLogEntryResolvers<ContextType>;
  MachineLogEntryConnection: MachineLogEntryConnectionResolvers<ContextType>;
  MachineLogEntryEdge: MachineLogEntryEdgeResolvers<ContextType>;
  MachineModalStateOfAxisPlane: MachineModalStateOfAxisPlaneResolvers<ContextType>;
  MachineModalStateOfEnabledType: MachineModalStateOfEnabledTypeResolvers<ContextType>;
  MachineModalStateOfFeedRateMode: MachineModalStateOfFeedRateModeResolvers<ContextType>;
  MachineModalStateOfMachineMotionType: MachineModalStateOfMachineMotionTypeResolvers<ContextType>;
  MachineModalStateOfMachineProgramState: MachineModalStateOfMachineProgramStateResolvers<ContextType>;
  MachineModalStateOfMovementDistanceType: MachineModalStateOfMovementDistanceTypeResolvers<ContextType>;
  MachineModalStateOfPathControlMode: MachineModalStateOfPathControlModeResolvers<ContextType>;
  MachineModalStateOfSpindleSpeedMode: MachineModalStateOfSpindleSpeedModeResolvers<ContextType>;
  MachineModalStateOfTimingMode: MachineModalStateOfTimingModeResolvers<ContextType>;
  MachineModalStateOfUnitType: MachineModalStateOfUnitTypeResolvers<ContextType>;
  MachineModals: MachineModalsResolvers<ContextType>;
  MachineOptions: MachineOptionsResolvers<ContextType>;
  MachineOverrides: MachineOverridesResolvers<ContextType>;
  MachinePart: MachinePartResolvers<ContextType>;
  MachinePartSettings: MachinePartSettingsResolvers<ContextType>;
  MachinePosition: MachinePositionResolvers<ContextType>;
  MachinePresetSetting: MachinePresetSettingResolvers<ContextType>;
  MachineProfile: MachineProfileResolvers<ContextType>;
  MachineSettingSettings: MachineSettingSettingsResolvers<ContextType>;
  MachineSpec: MachineSpecResolvers<ContextType>;
  MachineSpecSettings: MachineSpecSettingsResolvers<ContextType>;
  MachineStatus: MachineStatusResolvers<ContextType>;
  MacroSettings: MacroSettingsResolvers<ContextType>;
  MakerHubSettings: MakerHubSettingsResolvers<ContextType>;
  MountPointSettings: MountPointSettingsResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  OpenControllerSession: OpenControllerSessionResolvers<ContextType>;
  OpenControllerSettings: OpenControllerSettingsResolvers<ContextType>;
  OpenControllerUser: OpenControllerUserResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  ParsedAxisFlags: ParsedAxisFlagsResolvers<ContextType>;
  ParsedBool: ParsedBoolResolvers<ContextType>;
  ParsedDecimal: ParsedDecimalResolvers<ContextType>;
  ParsedEnumOfKinematicsMode: ParsedEnumOfKinematicsModeResolvers<ContextType>;
  ParsedEnumOfStatusReportType: ParsedEnumOfStatusReportTypeResolvers<ContextType>;
  ParsedString: ParsedStringResolvers<ContextType>;
  PortOptions: PortOptionsResolvers<ContextType>;
  PortStatus: PortStatusResolvers<ContextType>;
  ProgramFile: ProgramFileResolvers<ContextType>;
  ProgramFileUpload: ProgramFileUploadResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  SyntaxChunk: SyntaxChunkResolvers<ContextType>;
  SystemPort: SystemPortResolvers<ContextType>;
  UserProfile: UserProfileResolvers<ContextType>;
  Workspace: WorkspaceResolvers<ContextType>;
  WorkspaceSettings: WorkspaceSettingsResolvers<ContextType>;
  Decimal: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Long: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type SyntaxChunkFragment = { __typename?: 'SyntaxChunk' } & Pick<SyntaxChunk, 'value' | 'comment' | 'type'>;

export type MachineInstructionResultFragment = { __typename?: 'MachineInstructionResult' } & {
  writeLogEntry: { __typename?: 'MachineLogEntry' } & MachineLogEntryFragment;
  responseLogEntry: Maybe<{ __typename?: 'MachineLogEntry' } & MachineLogEntryFragment>;
};

export type MachineExecutionResultFragment = { __typename?: 'MachineExecutionResult' } & {
  instructionResults: Array<{ __typename?: 'MachineInstructionResult' } & MachineInstructionResultFragment>;
  machine: { __typename?: 'ControlledMachine' } & ControlledMachineFragment;
};

export type SetFirmwareSettingsMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  changeSet: Array<FirmwareSettingChangeInput>;
}>;

export type SetFirmwareSettingsMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      results: Array<{ __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment>;
    };
};

export type CommandMachineMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  code: Scalars['String'];
  source: Scalars['String'];
}>;

export type CommandMachineMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      result: { __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment;
    };
};

export type UnlockMachineMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type UnlockMachineMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      result: { __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment;
    };
};

export type ResetMachineMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type ResetMachineMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      result: { __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment;
    };
};

export type MoveMachineMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  moveCommand: MoveCommandInput;
}>;

export type MoveMachineMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      result: { __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment;
    };
};

export type AuthenticateQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type AuthenticateQuery = { __typename?: 'Query' } & {
  session: { __typename?: 'OpenControllerSession' } & OpenControllerSessionFragment;
};

export type OpenControllerSessionFragment = { __typename?: 'OpenControllerSession' } & Pick<
  OpenControllerSession,
  'token'
> & { user: { __typename?: 'OpenControllerUser' } & OpenControllerUserFullFragment };

export type OpenControllerUserMinFragment = { __typename?: 'OpenControllerUser' } & Pick<
  OpenControllerUser,
  'username'
>;

export type OpenControllerUserFullFragment = { __typename?: 'OpenControllerUser' } & Pick<
  OpenControllerUser,
  'id' | 'authenticationType' | 'enabled'
> &
  OpenControllerUserMinFragment;

export type ControlledMachineFragment = { __typename?: 'ControlledMachine' } & Pick<
  ControlledMachine,
  'topicId' | 'machineProfileId'
> & {
    configuration: { __typename?: 'MachineConfiguration' } & MachineConfigFragment;
    status: { __typename?: 'MachineStatus' } & MachineStatusFragment;
    settings: { __typename?: 'FirmwareSettings' } & FirmwareSettingsTypedFragment;
  } & MachineLogsFragment;

type FirmwareRequirement_FirmwareRequirement_Fragment = { __typename?: 'FirmwareRequirement' } & Pick<
  FirmwareRequirement,
  'controllerType' | 'name' | 'edition' | 'requiredVersion' | 'suggestedVersion' | 'helpUrl' | 'downloadUrl'
>;

type FirmwareRequirement_MachineFirmware_Fragment = { __typename?: 'MachineFirmware' } & Pick<
  MachineFirmware,
  'controllerType' | 'name' | 'edition' | 'requiredVersion' | 'suggestedVersion' | 'helpUrl' | 'downloadUrl'
>;

type FirmwareRequirement_MachineFirmwareSettings_Fragment = { __typename?: 'MachineFirmwareSettings' } & Pick<
  MachineFirmwareSettings,
  'controllerType' | 'name' | 'edition' | 'requiredVersion' | 'suggestedVersion' | 'helpUrl' | 'downloadUrl'
>;

export type FirmwareRequirementFragment =
  | FirmwareRequirement_FirmwareRequirement_Fragment
  | FirmwareRequirement_MachineFirmware_Fragment
  | FirmwareRequirement_MachineFirmwareSettings_Fragment;

export type DetectedFirmwareFragment = { __typename?: 'MachineDetectedFirmware' } & Pick<
  MachineDetectedFirmware,
  'friendlyName' | 'isValid' | 'welcomeMessage' | 'meetsRequirements'
> & {
    name: { __typename?: 'FirmwareComparisonNodeOfString' } & Pick<
      FirmwareComparisonNodeOfString,
      'requiredValue' | 'detectedValue' | 'hasDetectedValue' | 'meetsRequirement'
    >;
    version: { __typename?: 'FirmwareComparisonNodeOfDecimal' } & Pick<
      FirmwareComparisonNodeOfDecimal,
      'requiredValue' | 'detectedValue' | 'hasDetectedValue' | 'meetsRequirement'
    >;
    edition: { __typename?: 'FirmwareComparisonNodeOfString' } & Pick<
      FirmwareComparisonNodeOfString,
      'requiredValue' | 'detectedValue' | 'hasDetectedValue' | 'meetsRequirement'
    >;
    protocol: { __typename?: 'FirmwareComparisonNodeOfString' } & Pick<
      FirmwareComparisonNodeOfString,
      'requiredValue' | 'detectedValue' | 'hasDetectedValue' | 'meetsRequirement'
    >;
    requirement: { __typename?: 'FirmwareRequirement' } & FirmwareRequirement_FirmwareRequirement_Fragment;
  };

export type MachineAlertFragment = { __typename?: 'MachineAlert' } & Pick<
  MachineAlert,
  'type' | 'code' | 'name' | 'message'
>;

export type MachinePositionFragment = { __typename?: 'MachinePosition' } & Pick<
  MachinePosition,
  'x' | 'y' | 'z' | 'a' | 'b' | 'c'
>;

export type MachineAxisPropsFragment = { __typename?: 'MachineAxis' } & Pick<
  MachineAxis,
  'id' | 'name' | 'min' | 'max' | 'accuracy' | 'precision'
>;

export type MachineCommandPropsFragment = { __typename?: 'MachineCommand' } & Pick<
  MachineCommand,
  'id' | 'name' | 'value'
>;

export type MachineModalsFragment = { __typename?: 'MachineModals' } & Pick<
  MachineModals,
  'userDefinedCurrent' | 'userDefinedCount' | 'workCoordinateSystemCurrent' | 'workCoordinateSystemCount'
> & {
    motion: { __typename?: 'MachineModalStateOfMachineMotionType' } & Pick<
      MachineModalStateOfMachineMotionType,
      'code' | 'value'
    >;
    plane: Maybe<
      { __typename?: 'MachineModalStateOfAxisPlane' } & Pick<MachineModalStateOfAxisPlane, 'code' | 'value'>
    >;
    distance: Maybe<
      { __typename?: 'MachineModalStateOfMovementDistanceType' } & Pick<
        MachineModalStateOfMovementDistanceType,
        'code' | 'value'
      >
    >;
    arcDistance: Maybe<
      { __typename?: 'MachineModalStateOfMovementDistanceType' } & Pick<
        MachineModalStateOfMovementDistanceType,
        'code' | 'value'
      >
    >;
    feedRate: Maybe<
      { __typename?: 'MachineModalStateOfFeedRateMode' } & Pick<MachineModalStateOfFeedRateMode, 'code' | 'value'>
    >;
    units: Maybe<{ __typename?: 'MachineModalStateOfUnitType' } & Pick<MachineModalStateOfUnitType, 'code' | 'value'>>;
    cannedCycleReturnMode: Maybe<
      { __typename?: 'MachineModalStateOfTimingMode' } & Pick<MachineModalStateOfTimingMode, 'code' | 'value'>
    >;
    pathControlMode: Maybe<
      { __typename?: 'MachineModalStateOfPathControlMode' } & Pick<MachineModalStateOfPathControlMode, 'code' | 'value'>
    >;
    spindleSpeed: Maybe<
      { __typename?: 'MachineModalStateOfSpindleSpeedMode' } & Pick<
        MachineModalStateOfSpindleSpeedMode,
        'code' | 'value'
      >
    >;
    cylindricalInterpolation: Maybe<
      { __typename?: 'MachineModalStateOfEnabledType' } & Pick<MachineModalStateOfEnabledType, 'code' | 'value'>
    >;
    programState: Maybe<
      { __typename?: 'MachineModalStateOfMachineProgramState' } & Pick<
        MachineModalStateOfMachineProgramState,
        'code' | 'value'
      >
    >;
  };

export type MachineConfigFragment = { __typename?: 'MachineConfiguration' } & {
  firmware: { __typename?: 'MachineDetectedFirmware' } & DetectedFirmwareFragment;
  modals: { __typename?: 'MachineModals' } & MachineModalsFragment;
  workCoordinates: Array<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
  workOffset: { __typename?: 'MachinePosition' } & MachinePositionFragment;
  referencePosition: Array<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
};

export type MachineConfigurationSubscriptionVariables = Exact<{
  portName: Scalars['String'];
}>;

export type MachineConfigurationSubscription = { __typename?: 'Subscription' } & {
  machine: { __typename?: 'ControlledMachine' } & Pick<ControlledMachine, 'topicId'> & {
      configuration: { __typename?: 'MachineConfiguration' } & MachineConfigFragment;
    };
};

export type MachineFeaturePropsFragment = { __typename?: 'MachineFeature' } & Pick<
  MachineFeature,
  'id' | 'key' | 'disabled' | 'title' | 'description' | 'icon'
>;

export type MachineFirmwareMinimalFragment = { __typename?: 'MachineFirmware' } & Pick<
  MachineFirmware,
  'controllerType' | 'baudRate' | 'baudRateValue' | 'rtscts'
>;

export type MachineFirmwarePropsFragment = { __typename?: 'MachineFirmware' } & Pick<
  MachineFirmware,
  'id' | 'requiredVersion' | 'suggestedVersion' | 'name' | 'edition' | 'downloadUrl' | 'helpUrl'
> &
  MachineFirmwareMinimalFragment;

export type MachineLogEntryConnectionFragment = { __typename?: 'MachineLogEntryConnection' } & {
  edges: Maybe<
    Array<
      { __typename?: 'MachineLogEntryEdge' } & Pick<MachineLogEntryEdge, 'cursor'> & {
          node: { __typename?: 'MachineLogEntry' } & MachineLogEntryFragment;
        }
    >
  >;
  nodes: Maybe<Array<{ __typename?: 'MachineLogEntry' } & MachineLogEntryFragment>>;
  pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment;
};

export type PageInfoFragment = { __typename?: 'PageInfo' } & Pick<PageInfo, 'endCursor' | 'hasNextPage'>;

export type MachineLogEntryFragment = { __typename?: 'MachineLogEntry' } & Pick<
  MachineLogEntry,
  'id' | 'timestamp' | 'count' | 'message' | 'logLevel' | 'source' | 'writeState'
> & {
    error: Maybe<{ __typename?: 'MachineAlert' } & MachineAlertFragment>;
    code: Array<{ __typename?: 'SyntaxChunk' } & SyntaxChunkFragment>;
  };

export type MachineLogsFragment = { __typename?: 'ControlledMachine' } & {
  logs: Maybe<{ __typename?: 'MachineLogEntryConnection' } & MachineLogEntryConnectionFragment>;
};

export type MachineLogsSubscriptionVariables = Exact<{
  portName: Scalars['String'];
}>;

export type MachineLogsSubscription = { __typename?: 'Subscription' } & {
  machine: { __typename?: 'ControlledMachine' } & Pick<ControlledMachine, 'topicId'> & MachineLogsFragment;
};

export type MachinePartPropsFragment = { __typename?: 'MachinePart' } & Pick<
  MachinePart,
  'id' | 'partType' | 'optional' | 'isDefault' | 'sortOrder' | 'title' | 'description' | 'dataBlob'
>;

export type MachinePartCompleteFragment = { __typename?: 'MachinePart' } & {
  settings: Array<{ __typename?: 'MachinePresetSetting' } & MachinePresetSettingPropsFragment>;
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

export type MachinePresetSettingPropsFragment = { __typename?: 'MachinePresetSetting' } & Pick<
  MachinePresetSetting,
  'id' | 'title' | 'settingType' | 'key' | 'value'
>;

export type FirmwareSettingPolymorphicFragment = { __typename?: 'FirmwareSetting' } & Pick<
  FirmwareSetting,
  'id' | 'title' | 'key' | 'value' | 'units' | 'hasBeenRead'
> & {
    currentValue: Maybe<
      | ({ __typename?: 'ParsedAxisFlags' } & {
          valueAxisFlags: { __typename?: 'AxisFlags' } & Pick<AxisFlags, 'x' | 'y' | 'z'>;
        })
      | ({ __typename?: 'ParsedBool' } & Pick<ParsedBool, 'valueBool'>)
      | ({ __typename?: 'ParsedDecimal' } & Pick<ParsedDecimal, 'valueDecimal'>)
      | ({ __typename?: 'ParsedEnumOfKinematicsMode' } & {
          valueKinematicsMode: ParsedEnumOfKinematicsMode['valueEnum'];
        })
      | ({ __typename?: 'ParsedEnumOfStatusReportType' } & {
          valueStatusReportType: ParsedEnumOfStatusReportType['valueEnum'];
        })
      | ({ __typename?: 'ParsedString' } & Pick<ParsedString, 'valueString'>)
    >;
  };

export type FirmwareSettingDecimalFragment = { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
  FirmwareSettingOfDecimal,
  'id' | 'title' | 'key' | 'data'
>;

export type FirmwareSettingBoolFragment = { __typename?: 'FirmwareSettingOfBoolean' } & Pick<
  FirmwareSettingOfBoolean,
  'id' | 'title' | 'key' | 'data'
>;

export type FirmwareSettingAxisFlagsFragment = { __typename?: 'FirmwareSettingOfAxisFlags' } & Pick<
  FirmwareSettingOfAxisFlags,
  'id' | 'title' | 'key'
> & { data: { __typename?: 'AxisFlags' } & Pick<AxisFlags, 'x' | 'y' | 'z'> };

export type FirmwareAxisValuesFragment = { __typename?: 'FirmwareAxisValues' } & {
  x: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  y: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  z: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
};

export type FirmwareApplicatorSettingsFragment = { __typename?: 'FirmwareApplicatorSettings' } & {
  speedMax: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  speedMin: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  laserEnabled: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  shuttleRadius: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  shuttleWeight: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareCalibrationSettingsFragment = { __typename?: 'FirmwareCalibrationSettings' } & {
  kinematics: { __typename?: 'FirmwareSettingOfKinematicsMode' } & Pick<
    FirmwareSettingOfKinematicsMode,
    'id' | 'title' | 'key' | 'data'
  >;
  motorDistance: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  scaling: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  chainLength: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  chainOverSprocket: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  chainSagCorrection: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  chainElongationFactor: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  leftChainTolerance: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  rightChainTolerance: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  homeChainLengths: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareHomingSettingsFragment = { __typename?: 'FirmwareHomingSettings' } & {
  enabled: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  directionInvert: { __typename?: 'FirmwareSettingOfAxisFlags' } & FirmwareSettingAxisFlagsFragment;
  feedRate: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  seekRate: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  debounce: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  pullOff: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareMovementSettingsFragment = { __typename?: 'FirmwareMovementSettings' } & {
  junctionDeviation: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  arcTolerance: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  softLimits: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  hardLimits: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  rateMax: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  acceleration: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  positionMax: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  positionMin: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  machineSize: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwarePinsSettingsFragment = { __typename?: 'FirmwarePinsSettings' } & {
  stepPulse: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  stepIdleDelay: { __typename?: 'FirmwareSettingOfDecimal' } & FirmwareSettingDecimalFragment;
  stepSignalInvert: { __typename?: 'FirmwareSettingOfAxisFlags' } & FirmwareSettingAxisFlagsFragment;
  stepDirectionInvert: { __typename?: 'FirmwareSettingOfAxisFlags' } & FirmwareSettingAxisFlagsFragment;
  stepEnableInvert: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  limitPinsInvert: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  probePinInvert: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  steps: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  kProportional: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  kDerivative: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  kIntegral: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  imax: { __typename?: 'FirmwareAxisValues' } & FirmwareAxisValuesFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareReportingSettingsFragment = { __typename?: 'FirmwareReportingSettings' } & {
  statusReport: { __typename?: 'FirmwareSettingOfStatusReportType' } & Pick<
    FirmwareSettingOfStatusReportType,
    'id' | 'title' | 'settingType' | 'key' | 'data'
  >;
  reportInches: { __typename?: 'FirmwareSettingOfBoolean' } & FirmwareSettingBoolFragment;
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareSettingsListFragment = { __typename?: 'FirmwareSettings' } & {
  settings: Array<{ __typename?: 'FirmwareSetting' } & FirmwareSettingPolymorphicFragment>;
};

export type FirmwareSettingsTypedFragment = { __typename?: 'FirmwareSettings' } & {
  applicator: { __typename?: 'FirmwareApplicatorSettings' } & FirmwareApplicatorSettingsFragment;
  calibration: { __typename?: 'FirmwareCalibrationSettings' } & FirmwareCalibrationSettingsFragment;
  homing: { __typename?: 'FirmwareHomingSettings' } & FirmwareHomingSettingsFragment;
  movement: { __typename?: 'FirmwareMovementSettings' } & FirmwareMovementSettingsFragment;
  pins: { __typename?: 'FirmwarePinsSettings' } & FirmwarePinsSettingsFragment;
  reporting: { __typename?: 'FirmwareReportingSettings' } & FirmwareReportingSettingsFragment;
};

export type MachineSettingsSubscriptionVariables = Exact<{
  portName: Scalars['String'];
}>;

export type MachineSettingsSubscription = { __typename?: 'Subscription' } & {
  machine: { __typename?: 'ControlledMachine' } & Pick<ControlledMachine, 'topicId'> & {
      settings: { __typename?: 'FirmwareSettings' } & FirmwareSettingsTypedFragment;
    };
};

export type MachineSpecPropsFragment = { __typename?: 'MachineSpec' } & Pick<MachineSpec, 'id' | 'specType' | 'value'>;

export type MachineBufferFragment = { __typename?: 'MachineBuffer' } & Pick<
  MachineBuffer,
  'lineNumber' | 'availableReceive' | 'availableSend' | 'writeQueueLength' | 'responseQueueLength'
>;

export type ApplicatorStateFragment = { __typename?: 'MachineApplicatorState' } & Pick<
  MachineApplicatorState,
  | 'isOn'
  | 'toolId'
  | 'spinDirection'
  | 'spinSpeed'
  | 'feedRate'
  | 'lengthOffsetFactorType'
  | 'radiusCompensation'
  | 'isFloodCoolantEnabled'
  | 'isMistCoolantEnabled'
> & {
    lengthOffset: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
    probePosition: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
  };

export type MachineOverridesFragment = { __typename?: 'MachineOverrides' } & Pick<
  MachineOverrides,
  'feed' | 'feedAllowed' | 'rapids' | 'speed' | 'speedAllowed'
>;

export type MachineStatusFragment = { __typename?: 'MachineStatus' } & Pick<
  MachineStatus,
  'activityState' | 'activePins'
> & {
    machinePosition: { __typename?: 'MachinePosition' } & MachinePositionFragment;
    workPosition: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
    workCoordinateOffset: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
    alarm: Maybe<{ __typename?: 'MachineAlert' } & MachineAlertFragment>;
    buffer: { __typename?: 'MachineBuffer' } & MachineBufferFragment;
    applicator: { __typename?: 'MachineApplicatorState' } & ApplicatorStateFragment;
    overrides: Maybe<{ __typename?: 'MachineOverrides' } & MachineOverridesFragment>;
  };

export type MachineStatusSubscriptionVariables = Exact<{
  portName: Scalars['String'];
}>;

export type MachineStatusSubscription = { __typename?: 'Subscription' } & {
  machine: { __typename?: 'ControlledMachine' } & Pick<ControlledMachine, 'topicId'> & {
      status: { __typename?: 'MachineStatus' } & MachineStatusFragment;
    };
};

export type ConnectedPortFragment = { __typename?: 'ConnectedPort' } & {
  machine: { __typename?: 'ControlledMachine' } & ControlledMachineFragment;
  status: { __typename?: 'PortStatus' } & PortIoStatusFragment;
};

export type PortIoStatusFragment = { __typename?: 'PortStatus' } & Pick<
  PortStatus,
  'bytesToRead' | 'bytesToWrite' | 'charactersRead' | 'charactersWritten' | 'linesRead' | 'linesWritten'
>;

export type PortOptionsFragment = { __typename?: 'PortOptions' } & Pick<
  PortOptions,
  | 'baudRate'
  | 'parity'
  | 'dataBits'
  | 'stopBits'
  | 'handshake'
  | 'readBufferSize'
  | 'writeBufferSize'
  | 'rtsEnable'
  | 'readTimeout'
  | 'writeTimeout'
>;

export type SystemPortFragment = { __typename?: 'SystemPort' } & Pick<SystemPort, 'portName' | 'state'> & {
    error: Maybe<{ __typename?: 'AlertError' } & AlertErrorFragment>;
    options: { __typename?: 'PortOptions' } & PortOptionsFragment;
    connection: Maybe<{ __typename?: 'ConnectedPort' } & ConnectedPortFragment>;
  };

export type PortStatusFragment = { __typename?: 'SystemPort' } & Pick<SystemPort, 'portName' | 'state'> & {
    error: Maybe<{ __typename?: 'AlertError' } & AlertErrorFragment>;
    connection: Maybe<{ __typename?: 'ConnectedPort' } & ConnectedPortFragment>;
  };

export type ListPortsQueryVariables = Exact<{ [key: string]: never }>;

export type ListPortsQuery = { __typename?: 'Query' } & {
  ports: Array<{ __typename?: 'SystemPort' } & PortStatusFragment>;
};

export type PortChangeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PortChangeSubscription = { __typename?: 'Subscription' } & {
  port: { __typename?: 'SystemPort' } & PortStatusFragment;
};

export type OpenPortMutationVariables = Exact<{
  portName: Scalars['String'];
  firmware: FirmwareRequirementInput;
  options: SerialPortOptionsInput;
}>;

export type OpenPortMutation = { __typename?: 'Mutation' } & {
  port: { __typename?: 'SystemPort' } & SystemPortFragment;
};

export type ClosePortMutationVariables = Exact<{
  portName: Scalars['String'];
}>;

export type ClosePortMutation = { __typename?: 'Mutation' } & {
  port: { __typename?: 'SystemPort' } & PortStatusFragment;
};

export type EventFragment = { __typename?: 'EventSettings' } & Pick<
  EventSettings,
  'id' | 'mtime' | 'enabled' | 'event' | 'trigger' | 'commands'
>;

export type FileSystemFragment = { __typename?: 'FileSystemSettings' } & Pick<
  FileSystemSettings,
  'documentsDirectory'
> & { mountPoints: Array<{ __typename?: 'MountPointSettings' } & Pick<MountPointSettings, 'route' | 'target'>> };

export type MachineAxisFragment = { __typename?: 'MachineAxisSettings' } & Pick<
  MachineAxisSettings,
  'id' | 'name' | 'min' | 'max' | 'precision' | 'accuracy'
>;

export type MachineCommandFragment = { __typename?: 'MachineCommandSettings' } & Pick<
  MachineCommandSettings,
  'id' | 'name' | 'value'
>;

export type MachineConnectionSettingsFragment = { __typename?: 'ConnectionSettings' } & Pick<
  ConnectionSettings,
  'portName' | 'manufacturer'
> & { firmware: { __typename?: 'MachineFirmwareSettings' } & MachineFirmwareFragment };

export type MachineFeatureFragment = { __typename?: 'MachineFeatureSettings' } & Pick<
  MachineFeatureSettings,
  'id' | 'disabled' | 'key' | 'title' | 'description' | 'icon'
>;

export type MachineFirmwareFragment = { __typename?: 'MachineFirmwareSettings' } & Pick<
  MachineFirmwareSettings,
  | 'id'
  | 'controllerType'
  | 'baudRateValue'
  | 'name'
  | 'edition'
  | 'rtscts'
  | 'requiredVersion'
  | 'suggestedVersion'
  | 'downloadUrl'
  | 'helpUrl'
>;

export type MachinePartFragment = { __typename?: 'MachinePartSettings' } & Pick<
  MachinePartSettings,
  'id' | 'partType' | 'title' | 'description' | 'optional' | 'isDefault' | 'dataBlob'
> & {
    settings: Array<{ __typename?: 'MachineSettingSettings' } & MachineSettingsFragment>;
    specs: Array<{ __typename?: 'MachineSpecSettings' } & MachineSpecFragment>;
  };

export type MachineSettingsFragment = { __typename?: 'MachineSettingSettings' } & Pick<
  MachineSettingSettings,
  'id' | 'title' | 'settingType' | 'key' | 'value'
>;

export type MachineSpecFragment = { __typename?: 'MachineSpecSettings' } & Pick<
  MachineSpecSettings,
  'id' | 'specType' | 'value'
>;

export type CommandFragment = { __typename?: 'CommandSettings' } & Pick<
  CommandSettings,
  'id' | 'mtime' | 'commands' | 'title' | 'enabled'
>;

export type AppUpdatesFragment = { __typename?: 'AppUpdates' } & Pick<AppUpdates, 'checkForUpdates' | 'prereleases'>;

export type MakerHubFragment = { __typename?: 'MakerHubSettings' } & Pick<MakerHubSettings, 'enabled'>;

export type EssentialSettingsFragment = { __typename?: 'OpenControllerSettings' } & {
  fileSystem: { __typename?: 'FileSystemSettings' } & FileSystemFragment;
  appUpdates: { __typename?: 'AppUpdates' } & AppUpdatesFragment;
  commands: Array<{ __typename?: 'CommandSettings' } & CommandFragment>;
  events: Array<{ __typename?: 'EventSettings' } & EventFragment>;
  hub: { __typename?: 'MakerHubSettings' } & MakerHubFragment;
  users: Array<{ __typename?: 'OpenControllerUser' } & OpenControllerUserFullFragment>;
};

export type StartupFragment = { __typename?: 'Query' } & {
  settings: { __typename?: 'OpenControllerSettings' } & EssentialSettingsFragment;
  workspaces: Array<{ __typename?: 'Workspace' } & WorkspaceFullFragment>;
};

export type StartupQueryVariables = Exact<{
  token: Scalars['String'];
}>;

export type StartupQuery = { __typename?: 'Query' } & {
  session: { __typename?: 'OpenControllerSession' } & OpenControllerSessionFragment;
} & StartupFragment;

export type WorkspacePropsFragment = { __typename?: 'WorkspaceSettings' } & Pick<
  WorkspaceSettings,
  | 'id'
  | 'machineProfileId'
  | 'machineCategory'
  | 'name'
  | 'onboarded'
  | 'path'
  | 'color'
  | 'bkColor'
  | 'icon'
  | 'autoReconnect'
  | 'preferImperial'
>;

export type WorkspaceFullSettingsFragment = { __typename?: 'WorkspaceSettings' } & {
  connection: { __typename?: 'ConnectionSettings' } & MachineConnectionSettingsFragment;
  axes: Array<{ __typename?: 'MachineAxisSettings' } & MachineAxisFragment>;
  features: Array<{ __typename?: 'MachineFeatureSettings' } & MachineFeatureFragment>;
  commands: Array<{ __typename?: 'MachineCommandSettings' } & MachineCommandFragment>;
  parts: Array<{ __typename?: 'MachinePartSettings' } & MachinePartFragment>;
} & WorkspacePropsFragment;

export type WorkspaceEssentialSettingsFragment = { __typename?: 'WorkspaceSettings' } & WorkspaceFullSettingsFragment;

export type WorkspacePortConnectionFragment = { __typename?: 'SystemPort' } & {
  connection: Maybe<
    { __typename?: 'ConnectedPort' } & { machine: { __typename?: 'ControlledMachine' } & ControlledMachineFragment }
  >;
};

export type WorkspaceFullFragment = { __typename?: 'Workspace' } & Pick<
  Workspace,
  'id' | 'portName' | 'state' | 'units'
> & {
    error: Maybe<{ __typename?: 'AlertError' } & AlertErrorFragment>;
    settings: { __typename?: 'WorkspaceSettings' } & WorkspaceFullSettingsFragment;
    port: Maybe<{ __typename?: 'SystemPort' } & WorkspacePortConnectionFragment>;
  };

export type WorkspaceQueryVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type WorkspaceQuery = { __typename?: 'Query' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type CreateWorkspaceMutationVariables = Exact<{
  workspaceSettings: WorkspaceSettingsInput;
}>;

export type CreateWorkspaceMutation = { __typename?: 'Mutation' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type DeleteWorkspaceMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type DeleteWorkspaceMutation = { __typename?: 'Mutation' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type WorkspaceChangeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WorkspaceChangeSubscription = { __typename?: 'Subscription' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type OpenWorkspaceMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type OpenWorkspaceMutation = { __typename?: 'Mutation' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type CloseWorkspaceMutationVariables = Exact<{
  workspaceId: Scalars['String'];
}>;

export type CloseWorkspaceMutation = { __typename?: 'Mutation' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type ChangeWorkspacePortMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  portName: Scalars['String'];
}>;

export type ChangeWorkspacePortMutation = { __typename?: 'Mutation' } & {
  workspace: { __typename?: 'Workspace' } & WorkspaceFullFragment;
};

export type AlertErrorFragment = { __typename?: 'AlertError' } & Pick<AlertError, 'name' | 'message'>;

export const MachineAlertFragmentDoc = gql`
  fragment MachineAlert on MachineAlert {
    type
    code
    name
    message
  }
`;
export const SyntaxChunkFragmentDoc = gql`
  fragment SyntaxChunk on SyntaxChunk {
    value
    comment
    type
  }
`;
export const MachineLogEntryFragmentDoc = gql`
  fragment MachineLogEntry on MachineLogEntry {
    id
    timestamp
    count
    message
    logLevel
    source
    writeState
    error {
      ...MachineAlert
    }
    code {
      ...SyntaxChunk
    }
  }
  ${MachineAlertFragmentDoc}
  ${SyntaxChunkFragmentDoc}
`;
export const MachineInstructionResultFragmentDoc = gql`
  fragment MachineInstructionResult on MachineInstructionResult {
    writeLogEntry {
      ...MachineLogEntry
    }
    responseLogEntry {
      ...MachineLogEntry
    }
  }
  ${MachineLogEntryFragmentDoc}
`;
export const FirmwareRequirementFragmentDoc = gql`
  fragment FirmwareRequirement on IMachineFirmwareRequirement {
    controllerType
    name
    edition
    requiredVersion
    suggestedVersion
    helpUrl
    downloadUrl
  }
`;
export const DetectedFirmwareFragmentDoc = gql`
  fragment DetectedFirmware on MachineDetectedFirmware {
    friendlyName
    isValid
    name {
      requiredValue
      detectedValue
      hasDetectedValue
      meetsRequirement
    }
    version {
      requiredValue
      detectedValue
      hasDetectedValue
      meetsRequirement
    }
    edition {
      requiredValue
      detectedValue
      hasDetectedValue
      meetsRequirement
    }
    protocol {
      requiredValue
      detectedValue
      hasDetectedValue
      meetsRequirement
    }
    welcomeMessage
    requirement {
      ...FirmwareRequirement
    }
    meetsRequirements
  }
  ${FirmwareRequirementFragmentDoc}
`;
export const MachineModalsFragmentDoc = gql`
  fragment MachineModals on MachineModals {
    motion {
      code
      value
    }
    plane {
      code
      value
    }
    distance {
      code
      value
    }
    arcDistance {
      code
      value
    }
    feedRate {
      code
      value
    }
    units {
      code
      value
    }
    cannedCycleReturnMode {
      code
      value
    }
    pathControlMode {
      code
      value
    }
    spindleSpeed {
      code
      value
    }
    cylindricalInterpolation {
      code
      value
    }
    programState {
      code
      value
    }
    userDefinedCurrent
    userDefinedCount
    workCoordinateSystemCurrent
    workCoordinateSystemCount
  }
`;
export const MachinePositionFragmentDoc = gql`
  fragment MachinePosition on MachinePosition {
    x
    y
    z
    a
    b
    c
  }
`;
export const MachineConfigFragmentDoc = gql`
  fragment MachineConfig on MachineConfiguration {
    firmware {
      ...DetectedFirmware
    }
    modals {
      ...MachineModals
    }
    workCoordinates {
      ...MachinePosition
    }
    workOffset {
      ...MachinePosition
    }
    referencePosition {
      ...MachinePosition
    }
  }
  ${DetectedFirmwareFragmentDoc}
  ${MachineModalsFragmentDoc}
  ${MachinePositionFragmentDoc}
`;
export const MachineBufferFragmentDoc = gql`
  fragment MachineBuffer on MachineBuffer {
    lineNumber
    availableReceive
    availableSend
    writeQueueLength
    responseQueueLength
  }
`;
export const ApplicatorStateFragmentDoc = gql`
  fragment ApplicatorState on MachineApplicatorState {
    isOn
    toolId
    spinDirection
    spinSpeed
    feedRate
    lengthOffset {
      ...MachinePosition
    }
    lengthOffsetFactorType
    radiusCompensation
    probePosition {
      ...MachinePosition
    }
    isFloodCoolantEnabled
    isMistCoolantEnabled
  }
  ${MachinePositionFragmentDoc}
`;
export const MachineOverridesFragmentDoc = gql`
  fragment MachineOverrides on MachineOverrides {
    feed
    feedAllowed
    rapids
    speed
    speedAllowed
  }
`;
export const MachineStatusFragmentDoc = gql`
  fragment MachineStatus on MachineStatus {
    activityState
    machinePosition {
      ...MachinePosition
    }
    workPosition {
      ...MachinePosition
    }
    workCoordinateOffset {
      ...MachinePosition
    }
    alarm {
      ...MachineAlert
    }
    buffer {
      ...MachineBuffer
    }
    activePins
    applicator {
      ...ApplicatorState
    }
    overrides {
      ...MachineOverrides
    }
  }
  ${MachinePositionFragmentDoc}
  ${MachineAlertFragmentDoc}
  ${MachineBufferFragmentDoc}
  ${ApplicatorStateFragmentDoc}
  ${MachineOverridesFragmentDoc}
`;
export const FirmwareSettingDecimalFragmentDoc = gql`
  fragment FirmwareSettingDecimal on FirmwareSettingOfDecimal {
    id
    title
    key
    data
  }
`;
export const FirmwareSettingBoolFragmentDoc = gql`
  fragment FirmwareSettingBool on FirmwareSettingOfBoolean {
    id
    title
    key
    data
  }
`;
export const FirmwareSettingPolymorphicFragmentDoc = gql`
  fragment FirmwareSettingPolymorphic on FirmwareSetting {
    id
    title
    key
    value
    units
    hasBeenRead
    currentValue {
      ... on ParsedDecimal {
        valueDecimal
      }
      ... on ParsedString {
        valueString
      }
      ... on ParsedAxisFlags {
        valueAxisFlags {
          x
          y
          z
        }
      }
      ... on ParsedBool {
        valueBool
      }
      ... on ParsedEnumOfKinematicsMode {
        valueKinematicsMode: valueEnum
      }
      ... on ParsedEnumOfStatusReportType {
        valueStatusReportType: valueEnum
      }
    }
  }
`;
export const FirmwareApplicatorSettingsFragmentDoc = gql`
  fragment FirmwareApplicatorSettings on FirmwareApplicatorSettings {
    speedMax {
      ...FirmwareSettingDecimal
    }
    speedMin {
      ...FirmwareSettingDecimal
    }
    laserEnabled {
      ...FirmwareSettingBool
    }
    shuttleRadius {
      ...FirmwareSettingDecimal
    }
    shuttleWeight {
      ...FirmwareSettingDecimal
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingDecimalFragmentDoc}
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwareAxisValuesFragmentDoc = gql`
  fragment FirmwareAxisValues on FirmwareAxisValues {
    x {
      ...FirmwareSettingDecimal
    }
    y {
      ...FirmwareSettingDecimal
    }
    z {
      ...FirmwareSettingDecimal
    }
  }
  ${FirmwareSettingDecimalFragmentDoc}
`;
export const FirmwareCalibrationSettingsFragmentDoc = gql`
  fragment FirmwareCalibrationSettings on FirmwareCalibrationSettings {
    kinematics {
      id
      title
      key
      data
    }
    motorDistance {
      ...FirmwareAxisValues
    }
    scaling {
      ...FirmwareAxisValues
    }
    chainLength {
      ...FirmwareSettingDecimal
    }
    chainOverSprocket {
      ...FirmwareSettingBool
    }
    chainSagCorrection {
      ...FirmwareSettingDecimal
    }
    chainElongationFactor {
      ...FirmwareSettingDecimal
    }
    leftChainTolerance {
      ...FirmwareSettingDecimal
    }
    rightChainTolerance {
      ...FirmwareSettingDecimal
    }
    homeChainLengths {
      ...FirmwareSettingDecimal
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareAxisValuesFragmentDoc}
  ${FirmwareSettingDecimalFragmentDoc}
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwareSettingAxisFlagsFragmentDoc = gql`
  fragment FirmwareSettingAxisFlags on FirmwareSettingOfAxisFlags {
    id
    title
    key
    data {
      x
      y
      z
    }
  }
`;
export const FirmwareHomingSettingsFragmentDoc = gql`
  fragment FirmwareHomingSettings on FirmwareHomingSettings {
    enabled {
      ...FirmwareSettingBool
    }
    directionInvert {
      ...FirmwareSettingAxisFlags
    }
    feedRate {
      ...FirmwareSettingDecimal
    }
    seekRate {
      ...FirmwareSettingDecimal
    }
    debounce {
      ...FirmwareSettingDecimal
    }
    pullOff {
      ...FirmwareSettingDecimal
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareSettingAxisFlagsFragmentDoc}
  ${FirmwareSettingDecimalFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwareMovementSettingsFragmentDoc = gql`
  fragment FirmwareMovementSettings on FirmwareMovementSettings {
    junctionDeviation {
      ...FirmwareSettingDecimal
    }
    arcTolerance {
      ...FirmwareSettingDecimal
    }
    softLimits {
      ...FirmwareSettingBool
    }
    hardLimits {
      ...FirmwareSettingBool
    }
    rateMax {
      ...FirmwareAxisValues
    }
    acceleration {
      ...FirmwareAxisValues
    }
    positionMax {
      ...FirmwareAxisValues
    }
    positionMin {
      ...FirmwareAxisValues
    }
    machineSize {
      ...FirmwareAxisValues
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingDecimalFragmentDoc}
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareAxisValuesFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwarePinsSettingsFragmentDoc = gql`
  fragment FirmwarePinsSettings on FirmwarePinsSettings {
    stepPulse {
      ...FirmwareSettingDecimal
    }
    stepIdleDelay {
      ...FirmwareSettingDecimal
    }
    stepSignalInvert {
      ...FirmwareSettingAxisFlags
    }
    stepDirectionInvert {
      ...FirmwareSettingAxisFlags
    }
    stepEnableInvert {
      ...FirmwareSettingBool
    }
    limitPinsInvert {
      ...FirmwareSettingBool
    }
    probePinInvert {
      ...FirmwareSettingBool
    }
    steps {
      ...FirmwareAxisValues
    }
    kProportional {
      ...FirmwareAxisValues
    }
    kDerivative {
      ...FirmwareAxisValues
    }
    kIntegral {
      ...FirmwareAxisValues
    }
    imax {
      ...FirmwareAxisValues
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingDecimalFragmentDoc}
  ${FirmwareSettingAxisFlagsFragmentDoc}
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareAxisValuesFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwareReportingSettingsFragmentDoc = gql`
  fragment FirmwareReportingSettings on FirmwareReportingSettings {
    statusReport {
      id
      title
      settingType
      key
      data
    }
    reportInches {
      ...FirmwareSettingBool
    }
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingBoolFragmentDoc}
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const FirmwareSettingsTypedFragmentDoc = gql`
  fragment FirmwareSettingsTyped on FirmwareSettings {
    applicator {
      ...FirmwareApplicatorSettings
    }
    calibration {
      ...FirmwareCalibrationSettings
    }
    homing {
      ...FirmwareHomingSettings
    }
    movement {
      ...FirmwareMovementSettings
    }
    pins {
      ...FirmwarePinsSettings
    }
    reporting {
      ...FirmwareReportingSettings
    }
  }
  ${FirmwareApplicatorSettingsFragmentDoc}
  ${FirmwareCalibrationSettingsFragmentDoc}
  ${FirmwareHomingSettingsFragmentDoc}
  ${FirmwareMovementSettingsFragmentDoc}
  ${FirmwarePinsSettingsFragmentDoc}
  ${FirmwareReportingSettingsFragmentDoc}
`;
export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
  }
`;
export const MachineLogEntryConnectionFragmentDoc = gql`
  fragment MachineLogEntryConnection on MachineLogEntryConnection {
    edges {
      cursor
      node {
        ...MachineLogEntry
      }
    }
    nodes {
      ...MachineLogEntry
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${MachineLogEntryFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const MachineLogsFragmentDoc = gql`
  fragment MachineLogs on ControlledMachine {
    logs(first: 50, order: { timestamp: DESC }) {
      ...MachineLogEntryConnection
    }
  }
  ${MachineLogEntryConnectionFragmentDoc}
`;
export const ControlledMachineFragmentDoc = gql`
  fragment ControlledMachine on ControlledMachine {
    topicId
    machineProfileId
    configuration {
      ...MachineConfig
    }
    status {
      ...MachineStatus
    }
    settings {
      ...FirmwareSettingsTyped
    }
    ...MachineLogs
  }
  ${MachineConfigFragmentDoc}
  ${MachineStatusFragmentDoc}
  ${FirmwareSettingsTypedFragmentDoc}
  ${MachineLogsFragmentDoc}
`;
export const MachineExecutionResultFragmentDoc = gql`
  fragment MachineExecutionResult on MachineExecutionResult {
    instructionResults {
      ...MachineInstructionResult
    }
    machine {
      ...ControlledMachine
    }
  }
  ${MachineInstructionResultFragmentDoc}
  ${ControlledMachineFragmentDoc}
`;
export const OpenControllerUserMinFragmentDoc = gql`
  fragment OpenControllerUserMin on OpenControllerUser {
    username
  }
`;
export const OpenControllerUserFullFragmentDoc = gql`
  fragment OpenControllerUserFull on OpenControllerUser {
    ...OpenControllerUserMin
    id
    authenticationType
    enabled
  }
  ${OpenControllerUserMinFragmentDoc}
`;
export const OpenControllerSessionFragmentDoc = gql`
  fragment OpenControllerSession on OpenControllerSession {
    token
    user {
      ...OpenControllerUserFull
    }
  }
  ${OpenControllerUserFullFragmentDoc}
`;
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
    baudRateValue
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
export const MachinePresetSettingPropsFragmentDoc = gql`
  fragment MachinePresetSettingProps on MachinePresetSetting {
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
      ...MachinePresetSettingProps
    }
    specs {
      ...MachineSpecProps
    }
  }
  ${MachinePartPropsFragmentDoc}
  ${MachinePresetSettingPropsFragmentDoc}
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
export const FirmwareSettingsListFragmentDoc = gql`
  fragment FirmwareSettingsList on FirmwareSettings {
    settings {
      ...FirmwareSettingPolymorphic
    }
  }
  ${FirmwareSettingPolymorphicFragmentDoc}
`;
export const AlertErrorFragmentDoc = gql`
  fragment AlertError on AlertError {
    name
    message
  }
`;
export const PortOptionsFragmentDoc = gql`
  fragment PortOptions on PortOptions {
    baudRate
    parity
    dataBits
    stopBits
    handshake
    readBufferSize
    writeBufferSize
    rtsEnable
    readTimeout
    writeTimeout
  }
`;
export const PortIoStatusFragmentDoc = gql`
  fragment PortIOStatus on PortStatus {
    bytesToRead
    bytesToWrite
    charactersRead
    charactersWritten
    linesRead
    linesWritten
  }
`;
export const ConnectedPortFragmentDoc = gql`
  fragment ConnectedPort on ConnectedPort {
    machine {
      ...ControlledMachine
    }
    status {
      ...PortIOStatus
    }
  }
  ${ControlledMachineFragmentDoc}
  ${PortIoStatusFragmentDoc}
`;
export const SystemPortFragmentDoc = gql`
  fragment SystemPort on SystemPort {
    portName
    state
    error {
      ...AlertError
    }
    options {
      ...PortOptions
    }
    connection {
      ...ConnectedPort
    }
  }
  ${AlertErrorFragmentDoc}
  ${PortOptionsFragmentDoc}
  ${ConnectedPortFragmentDoc}
`;
export const PortStatusFragmentDoc = gql`
  fragment PortStatus on SystemPort {
    portName
    state
    error {
      ...AlertError
    }
    connection {
      ...ConnectedPort
    }
  }
  ${AlertErrorFragmentDoc}
  ${ConnectedPortFragmentDoc}
`;
export const FileSystemFragmentDoc = gql`
  fragment FileSystem on FileSystemSettings {
    documentsDirectory
    mountPoints {
      route
      target
    }
  }
`;
export const AppUpdatesFragmentDoc = gql`
  fragment AppUpdates on AppUpdates {
    checkForUpdates
    prereleases
  }
`;
export const CommandFragmentDoc = gql`
  fragment Command on CommandSettings {
    id
    mtime
    commands
    title
    enabled
  }
`;
export const EventFragmentDoc = gql`
  fragment Event on EventSettings {
    id
    mtime
    enabled
    event
    trigger
    commands
  }
`;
export const MakerHubFragmentDoc = gql`
  fragment MakerHub on MakerHubSettings {
    enabled
  }
`;
export const EssentialSettingsFragmentDoc = gql`
  fragment EssentialSettings on OpenControllerSettings {
    fileSystem {
      ...FileSystem
    }
    appUpdates {
      ...AppUpdates
    }
    commands {
      ...Command
    }
    events {
      ...Event
    }
    hub {
      ...MakerHub
    }
    users {
      ...OpenControllerUserFull
    }
  }
  ${FileSystemFragmentDoc}
  ${AppUpdatesFragmentDoc}
  ${CommandFragmentDoc}
  ${EventFragmentDoc}
  ${MakerHubFragmentDoc}
  ${OpenControllerUserFullFragmentDoc}
`;
export const WorkspacePropsFragmentDoc = gql`
  fragment WorkspaceProps on WorkspaceSettings {
    id
    machineProfileId
    machineCategory
    name
    onboarded
    path
    color
    bkColor
    icon
    autoReconnect
    preferImperial
  }
`;
export const MachineFirmwareFragmentDoc = gql`
  fragment MachineFirmware on MachineFirmwareSettings {
    id
    controllerType
    baudRateValue
    name
    edition
    rtscts
    requiredVersion
    suggestedVersion
    downloadUrl
    helpUrl
  }
`;
export const MachineConnectionSettingsFragmentDoc = gql`
  fragment MachineConnectionSettings on ConnectionSettings {
    portName
    manufacturer
    firmware {
      ...MachineFirmware
    }
  }
  ${MachineFirmwareFragmentDoc}
`;
export const MachineAxisFragmentDoc = gql`
  fragment MachineAxis on MachineAxisSettings {
    id
    name
    min
    max
    precision
    accuracy
  }
`;
export const MachineFeatureFragmentDoc = gql`
  fragment MachineFeature on MachineFeatureSettings {
    id
    disabled
    key
    title
    description
    icon
  }
`;
export const MachineCommandFragmentDoc = gql`
  fragment MachineCommand on MachineCommandSettings {
    id
    name
    value
  }
`;
export const MachineSettingsFragmentDoc = gql`
  fragment MachineSettings on MachineSettingSettings {
    id
    title
    settingType
    key
    value
  }
`;
export const MachineSpecFragmentDoc = gql`
  fragment MachineSpec on MachineSpecSettings {
    id
    specType
    value
  }
`;
export const MachinePartFragmentDoc = gql`
  fragment MachinePart on MachinePartSettings {
    id
    partType
    title
    description
    optional
    isDefault
    dataBlob
    settings {
      ...MachineSettings
    }
    specs {
      ...MachineSpec
    }
  }
  ${MachineSettingsFragmentDoc}
  ${MachineSpecFragmentDoc}
`;
export const WorkspaceFullSettingsFragmentDoc = gql`
  fragment WorkspaceFullSettings on WorkspaceSettings {
    ...WorkspaceProps
    connection {
      ...MachineConnectionSettings
    }
    axes {
      ...MachineAxis
    }
    features {
      ...MachineFeature
    }
    commands {
      ...MachineCommand
    }
    parts {
      ...MachinePart
    }
  }
  ${WorkspacePropsFragmentDoc}
  ${MachineConnectionSettingsFragmentDoc}
  ${MachineAxisFragmentDoc}
  ${MachineFeatureFragmentDoc}
  ${MachineCommandFragmentDoc}
  ${MachinePartFragmentDoc}
`;
export const WorkspacePortConnectionFragmentDoc = gql`
  fragment WorkspacePortConnection on SystemPort {
    connection {
      machine {
        ...ControlledMachine
      }
    }
  }
  ${ControlledMachineFragmentDoc}
`;
export const WorkspaceFullFragmentDoc = gql`
  fragment WorkspaceFull on Workspace {
    id
    portName
    state
    units
    error {
      ...AlertError
    }
    settings {
      ...WorkspaceFullSettings
    }
    port {
      ...WorkspacePortConnection
    }
  }
  ${AlertErrorFragmentDoc}
  ${WorkspaceFullSettingsFragmentDoc}
  ${WorkspacePortConnectionFragmentDoc}
`;
export const StartupFragmentDoc = gql`
  fragment Startup on Query {
    settings: getSettings {
      ...EssentialSettings
    }
    workspaces: listWorkspaces {
      ...WorkspaceFull
    }
  }
  ${EssentialSettingsFragmentDoc}
  ${WorkspaceFullFragmentDoc}
`;
export const WorkspaceEssentialSettingsFragmentDoc = gql`
  fragment WorkspaceEssentialSettings on WorkspaceSettings {
    ...WorkspaceFullSettings
  }
  ${WorkspaceFullSettingsFragmentDoc}
`;
export const SetFirmwareSettingsDocument = gql`
  mutation SetFirmwareSettings($workspaceId: String!, $changeSet: [FirmwareSettingChangeInput!]!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      results: setFirmwareSettings(settingChanges: $changeSet) {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type SetFirmwareSettingsMutationFn = Apollo.MutationFunction<
  SetFirmwareSettingsMutation,
  SetFirmwareSettingsMutationVariables
>;

/**
 * __useSetFirmwareSettingsMutation__
 *
 * To run a mutation, you first call `useSetFirmwareSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetFirmwareSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setFirmwareSettingsMutation, { data, loading, error }] = useSetFirmwareSettingsMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      changeSet: // value for 'changeSet'
 *   },
 * });
 */
export function useSetFirmwareSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<SetFirmwareSettingsMutation, SetFirmwareSettingsMutationVariables>,
) {
  return Apollo.useMutation<SetFirmwareSettingsMutation, SetFirmwareSettingsMutationVariables>(
    SetFirmwareSettingsDocument,
    baseOptions,
  );
}
export type SetFirmwareSettingsMutationHookResult = ReturnType<typeof useSetFirmwareSettingsMutation>;
export type SetFirmwareSettingsMutationResult = Apollo.MutationResult<SetFirmwareSettingsMutation>;
export type SetFirmwareSettingsMutationOptions = Apollo.BaseMutationOptions<
  SetFirmwareSettingsMutation,
  SetFirmwareSettingsMutationVariables
>;
export const CommandMachineDocument = gql`
  mutation CommandMachine($workspaceId: String!, $code: String!, $source: String!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      result: writeCommand(commandCode: $code, sourceName: $source) {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type CommandMachineMutationFn = Apollo.MutationFunction<CommandMachineMutation, CommandMachineMutationVariables>;

/**
 * __useCommandMachineMutation__
 *
 * To run a mutation, you first call `useCommandMachineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommandMachineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commandMachineMutation, { data, loading, error }] = useCommandMachineMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      code: // value for 'code'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useCommandMachineMutation(
  baseOptions?: Apollo.MutationHookOptions<CommandMachineMutation, CommandMachineMutationVariables>,
) {
  return Apollo.useMutation<CommandMachineMutation, CommandMachineMutationVariables>(
    CommandMachineDocument,
    baseOptions,
  );
}
export type CommandMachineMutationHookResult = ReturnType<typeof useCommandMachineMutation>;
export type CommandMachineMutationResult = Apollo.MutationResult<CommandMachineMutation>;
export type CommandMachineMutationOptions = Apollo.BaseMutationOptions<
  CommandMachineMutation,
  CommandMachineMutationVariables
>;
export const UnlockMachineDocument = gql`
  mutation UnlockMachine($workspaceId: String!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      result: unlock {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type UnlockMachineMutationFn = Apollo.MutationFunction<UnlockMachineMutation, UnlockMachineMutationVariables>;

/**
 * __useUnlockMachineMutation__
 *
 * To run a mutation, you first call `useUnlockMachineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlockMachineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlockMachineMutation, { data, loading, error }] = useUnlockMachineMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useUnlockMachineMutation(
  baseOptions?: Apollo.MutationHookOptions<UnlockMachineMutation, UnlockMachineMutationVariables>,
) {
  return Apollo.useMutation<UnlockMachineMutation, UnlockMachineMutationVariables>(UnlockMachineDocument, baseOptions);
}
export type UnlockMachineMutationHookResult = ReturnType<typeof useUnlockMachineMutation>;
export type UnlockMachineMutationResult = Apollo.MutationResult<UnlockMachineMutation>;
export type UnlockMachineMutationOptions = Apollo.BaseMutationOptions<
  UnlockMachineMutation,
  UnlockMachineMutationVariables
>;
export const ResetMachineDocument = gql`
  mutation ResetMachine($workspaceId: String!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      result: reset {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type ResetMachineMutationFn = Apollo.MutationFunction<ResetMachineMutation, ResetMachineMutationVariables>;

/**
 * __useResetMachineMutation__
 *
 * To run a mutation, you first call `useResetMachineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMachineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMachineMutation, { data, loading, error }] = useResetMachineMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useResetMachineMutation(
  baseOptions?: Apollo.MutationHookOptions<ResetMachineMutation, ResetMachineMutationVariables>,
) {
  return Apollo.useMutation<ResetMachineMutation, ResetMachineMutationVariables>(ResetMachineDocument, baseOptions);
}
export type ResetMachineMutationHookResult = ReturnType<typeof useResetMachineMutation>;
export type ResetMachineMutationResult = Apollo.MutationResult<ResetMachineMutation>;
export type ResetMachineMutationOptions = Apollo.BaseMutationOptions<
  ResetMachineMutation,
  ResetMachineMutationVariables
>;
export const MoveMachineDocument = gql`
  mutation MoveMachine($workspaceId: String!, $moveCommand: MoveCommandInput!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      result: move(moveCommand: $moveCommand) {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type MoveMachineMutationFn = Apollo.MutationFunction<MoveMachineMutation, MoveMachineMutationVariables>;

/**
 * __useMoveMachineMutation__
 *
 * To run a mutation, you first call `useMoveMachineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveMachineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveMachineMutation, { data, loading, error }] = useMoveMachineMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      moveCommand: // value for 'moveCommand'
 *   },
 * });
 */
export function useMoveMachineMutation(
  baseOptions?: Apollo.MutationHookOptions<MoveMachineMutation, MoveMachineMutationVariables>,
) {
  return Apollo.useMutation<MoveMachineMutation, MoveMachineMutationVariables>(MoveMachineDocument, baseOptions);
}
export type MoveMachineMutationHookResult = ReturnType<typeof useMoveMachineMutation>;
export type MoveMachineMutationResult = Apollo.MutationResult<MoveMachineMutation>;
export type MoveMachineMutationOptions = Apollo.BaseMutationOptions<MoveMachineMutation, MoveMachineMutationVariables>;
export const AuthenticateDocument = gql`
  query Authenticate($token: String!) {
    session: authenticate(token: $token) {
      ...OpenControllerSession
    }
  }
  ${OpenControllerSessionFragmentDoc}
`;

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAuthenticateQuery(
  baseOptions: Apollo.QueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>,
) {
  return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, baseOptions);
}
export function useAuthenticateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>,
) {
  return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, baseOptions);
}
export type AuthenticateQueryHookResult = ReturnType<typeof useAuthenticateQuery>;
export type AuthenticateLazyQueryHookResult = ReturnType<typeof useAuthenticateLazyQuery>;
export type AuthenticateQueryResult = Apollo.QueryResult<AuthenticateQuery, AuthenticateQueryVariables>;
export const MachineConfigurationDocument = gql`
  subscription MachineConfiguration($portName: String!) {
    machine: onMachineConfiguration(portName: $portName) {
      topicId
      configuration {
        ...MachineConfig
      }
    }
  }
  ${MachineConfigFragmentDoc}
`;

/**
 * __useMachineConfigurationSubscription__
 *
 * To run a query within a React component, call `useMachineConfigurationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMachineConfigurationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMachineConfigurationSubscription({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useMachineConfigurationSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    MachineConfigurationSubscription,
    MachineConfigurationSubscriptionVariables
  >,
) {
  return Apollo.useSubscription<MachineConfigurationSubscription, MachineConfigurationSubscriptionVariables>(
    MachineConfigurationDocument,
    baseOptions,
  );
}
export type MachineConfigurationSubscriptionHookResult = ReturnType<typeof useMachineConfigurationSubscription>;
export type MachineConfigurationSubscriptionResult = Apollo.SubscriptionResult<MachineConfigurationSubscription>;
export const MachineLogsDocument = gql`
  subscription MachineLogs($portName: String!) {
    machine: onMachineLog(portName: $portName) {
      topicId
      ...MachineLogs
    }
  }
  ${MachineLogsFragmentDoc}
`;

/**
 * __useMachineLogsSubscription__
 *
 * To run a query within a React component, call `useMachineLogsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMachineLogsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMachineLogsSubscription({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useMachineLogsSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<MachineLogsSubscription, MachineLogsSubscriptionVariables>,
) {
  return Apollo.useSubscription<MachineLogsSubscription, MachineLogsSubscriptionVariables>(
    MachineLogsDocument,
    baseOptions,
  );
}
export type MachineLogsSubscriptionHookResult = ReturnType<typeof useMachineLogsSubscription>;
export type MachineLogsSubscriptionResult = Apollo.SubscriptionResult<MachineLogsSubscription>;
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
export const MachineSettingsDocument = gql`
  subscription MachineSettings($portName: String!) {
    machine: onMachineSetting(portName: $portName) {
      topicId
      settings {
        ...FirmwareSettingsTyped
      }
    }
  }
  ${FirmwareSettingsTypedFragmentDoc}
`;

/**
 * __useMachineSettingsSubscription__
 *
 * To run a query within a React component, call `useMachineSettingsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMachineSettingsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMachineSettingsSubscription({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useMachineSettingsSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<MachineSettingsSubscription, MachineSettingsSubscriptionVariables>,
) {
  return Apollo.useSubscription<MachineSettingsSubscription, MachineSettingsSubscriptionVariables>(
    MachineSettingsDocument,
    baseOptions,
  );
}
export type MachineSettingsSubscriptionHookResult = ReturnType<typeof useMachineSettingsSubscription>;
export type MachineSettingsSubscriptionResult = Apollo.SubscriptionResult<MachineSettingsSubscription>;
export const MachineStatusDocument = gql`
  subscription MachineStatus($portName: String!) {
    machine: onMachineStatus(portName: $portName) {
      topicId
      status {
        ...MachineStatus
      }
    }
  }
  ${MachineStatusFragmentDoc}
`;

/**
 * __useMachineStatusSubscription__
 *
 * To run a query within a React component, call `useMachineStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMachineStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMachineStatusSubscription({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useMachineStatusSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<MachineStatusSubscription, MachineStatusSubscriptionVariables>,
) {
  return Apollo.useSubscription<MachineStatusSubscription, MachineStatusSubscriptionVariables>(
    MachineStatusDocument,
    baseOptions,
  );
}
export type MachineStatusSubscriptionHookResult = ReturnType<typeof useMachineStatusSubscription>;
export type MachineStatusSubscriptionResult = Apollo.SubscriptionResult<MachineStatusSubscription>;
export const ListPortsDocument = gql`
  query ListPorts {
    ports: listPorts {
      ...PortStatus
    }
  }
  ${PortStatusFragmentDoc}
`;

/**
 * __useListPortsQuery__
 *
 * To run a query within a React component, call `useListPortsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPortsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPortsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPortsQuery(baseOptions?: Apollo.QueryHookOptions<ListPortsQuery, ListPortsQueryVariables>) {
  return Apollo.useQuery<ListPortsQuery, ListPortsQueryVariables>(ListPortsDocument, baseOptions);
}
export function useListPortsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListPortsQuery, ListPortsQueryVariables>,
) {
  return Apollo.useLazyQuery<ListPortsQuery, ListPortsQueryVariables>(ListPortsDocument, baseOptions);
}
export type ListPortsQueryHookResult = ReturnType<typeof useListPortsQuery>;
export type ListPortsLazyQueryHookResult = ReturnType<typeof useListPortsLazyQuery>;
export type ListPortsQueryResult = Apollo.QueryResult<ListPortsQuery, ListPortsQueryVariables>;
export const PortChangeDocument = gql`
  subscription PortChange {
    port: onPortChange {
      ...PortStatus
    }
  }
  ${PortStatusFragmentDoc}
`;

/**
 * __usePortChangeSubscription__
 *
 * To run a query within a React component, call `usePortChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePortChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePortChangeSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<PortChangeSubscription, PortChangeSubscriptionVariables>,
) {
  return Apollo.useSubscription<PortChangeSubscription, PortChangeSubscriptionVariables>(
    PortChangeDocument,
    baseOptions,
  );
}
export type PortChangeSubscriptionHookResult = ReturnType<typeof usePortChangeSubscription>;
export type PortChangeSubscriptionResult = Apollo.SubscriptionResult<PortChangeSubscription>;
export const OpenPortDocument = gql`
  mutation OpenPort($portName: String!, $firmware: FirmwareRequirementInput!, $options: SerialPortOptionsInput!) {
    port: openPort(portName: $portName, firmware: $firmware, options: $options) {
      ...SystemPort
    }
  }
  ${SystemPortFragmentDoc}
`;
export type OpenPortMutationFn = Apollo.MutationFunction<OpenPortMutation, OpenPortMutationVariables>;

/**
 * __useOpenPortMutation__
 *
 * To run a mutation, you first call `useOpenPortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenPortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openPortMutation, { data, loading, error }] = useOpenPortMutation({
 *   variables: {
 *      portName: // value for 'portName'
 *      firmware: // value for 'firmware'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useOpenPortMutation(
  baseOptions?: Apollo.MutationHookOptions<OpenPortMutation, OpenPortMutationVariables>,
) {
  return Apollo.useMutation<OpenPortMutation, OpenPortMutationVariables>(OpenPortDocument, baseOptions);
}
export type OpenPortMutationHookResult = ReturnType<typeof useOpenPortMutation>;
export type OpenPortMutationResult = Apollo.MutationResult<OpenPortMutation>;
export type OpenPortMutationOptions = Apollo.BaseMutationOptions<OpenPortMutation, OpenPortMutationVariables>;
export const ClosePortDocument = gql`
  mutation ClosePort($portName: String!) {
    port: closePort(portName: $portName) {
      ...PortStatus
    }
  }
  ${PortStatusFragmentDoc}
`;
export type ClosePortMutationFn = Apollo.MutationFunction<ClosePortMutation, ClosePortMutationVariables>;

/**
 * __useClosePortMutation__
 *
 * To run a mutation, you first call `useClosePortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClosePortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closePortMutation, { data, loading, error }] = useClosePortMutation({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useClosePortMutation(
  baseOptions?: Apollo.MutationHookOptions<ClosePortMutation, ClosePortMutationVariables>,
) {
  return Apollo.useMutation<ClosePortMutation, ClosePortMutationVariables>(ClosePortDocument, baseOptions);
}
export type ClosePortMutationHookResult = ReturnType<typeof useClosePortMutation>;
export type ClosePortMutationResult = Apollo.MutationResult<ClosePortMutation>;
export type ClosePortMutationOptions = Apollo.BaseMutationOptions<ClosePortMutation, ClosePortMutationVariables>;
export const StartupDocument = gql`
  query Startup($token: String!) {
    session: authenticate(token: $token) {
      ...OpenControllerSession
    }
    ...Startup
  }
  ${OpenControllerSessionFragmentDoc}
  ${StartupFragmentDoc}
`;

/**
 * __useStartupQuery__
 *
 * To run a query within a React component, call `useStartupQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartupQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useStartupQuery(baseOptions: Apollo.QueryHookOptions<StartupQuery, StartupQueryVariables>) {
  return Apollo.useQuery<StartupQuery, StartupQueryVariables>(StartupDocument, baseOptions);
}
export function useStartupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StartupQuery, StartupQueryVariables>) {
  return Apollo.useLazyQuery<StartupQuery, StartupQueryVariables>(StartupDocument, baseOptions);
}
export type StartupQueryHookResult = ReturnType<typeof useStartupQuery>;
export type StartupLazyQueryHookResult = ReturnType<typeof useStartupLazyQuery>;
export type StartupQueryResult = Apollo.QueryResult<StartupQuery, StartupQueryVariables>;
export const WorkspaceDocument = gql`
  query Workspace($workspaceId: String!) {
    workspace: getWorkspace(workspaceId: $workspaceId) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;

/**
 * __useWorkspaceQuery__
 *
 * To run a query within a React component, call `useWorkspaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkspaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkspaceQuery({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useWorkspaceQuery(baseOptions: Apollo.QueryHookOptions<WorkspaceQuery, WorkspaceQueryVariables>) {
  return Apollo.useQuery<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, baseOptions);
}
export function useWorkspaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkspaceQuery, WorkspaceQueryVariables>,
) {
  return Apollo.useLazyQuery<WorkspaceQuery, WorkspaceQueryVariables>(WorkspaceDocument, baseOptions);
}
export type WorkspaceQueryHookResult = ReturnType<typeof useWorkspaceQuery>;
export type WorkspaceLazyQueryHookResult = ReturnType<typeof useWorkspaceLazyQuery>;
export type WorkspaceQueryResult = Apollo.QueryResult<WorkspaceQuery, WorkspaceQueryVariables>;
export const CreateWorkspaceDocument = gql`
  mutation CreateWorkspace($workspaceSettings: WorkspaceSettingsInput!) {
    workspace: createWorkspace(workspaceSettings: $workspaceSettings) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;
export type CreateWorkspaceMutationFn = Apollo.MutationFunction<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;

/**
 * __useCreateWorkspaceMutation__
 *
 * To run a mutation, you first call `useCreateWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkspaceMutation, { data, loading, error }] = useCreateWorkspaceMutation({
 *   variables: {
 *      workspaceSettings: // value for 'workspaceSettings'
 *   },
 * });
 */
export function useCreateWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>,
) {
  return Apollo.useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(
    CreateWorkspaceDocument,
    baseOptions,
  );
}
export type CreateWorkspaceMutationHookResult = ReturnType<typeof useCreateWorkspaceMutation>;
export type CreateWorkspaceMutationResult = Apollo.MutationResult<CreateWorkspaceMutation>;
export type CreateWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  CreateWorkspaceMutation,
  CreateWorkspaceMutationVariables
>;
export const DeleteWorkspaceDocument = gql`
  mutation DeleteWorkspace($workspaceId: String!) {
    workspace: deleteWorkspace(workspaceId: $workspaceId) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;
export type DeleteWorkspaceMutationFn = Apollo.MutationFunction<
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables
>;

/**
 * __useDeleteWorkspaceMutation__
 *
 * To run a mutation, you first call `useDeleteWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkspaceMutation, { data, loading, error }] = useDeleteWorkspaceMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useDeleteWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>,
) {
  return Apollo.useMutation<DeleteWorkspaceMutation, DeleteWorkspaceMutationVariables>(
    DeleteWorkspaceDocument,
    baseOptions,
  );
}
export type DeleteWorkspaceMutationHookResult = ReturnType<typeof useDeleteWorkspaceMutation>;
export type DeleteWorkspaceMutationResult = Apollo.MutationResult<DeleteWorkspaceMutation>;
export type DeleteWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  DeleteWorkspaceMutation,
  DeleteWorkspaceMutationVariables
>;
export const WorkspaceChangeDocument = gql`
  subscription WorkspaceChange {
    workspace: onWorkspaceChange {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;

/**
 * __useWorkspaceChangeSubscription__
 *
 * To run a query within a React component, call `useWorkspaceChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWorkspaceChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkspaceChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useWorkspaceChangeSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<WorkspaceChangeSubscription, WorkspaceChangeSubscriptionVariables>,
) {
  return Apollo.useSubscription<WorkspaceChangeSubscription, WorkspaceChangeSubscriptionVariables>(
    WorkspaceChangeDocument,
    baseOptions,
  );
}
export type WorkspaceChangeSubscriptionHookResult = ReturnType<typeof useWorkspaceChangeSubscription>;
export type WorkspaceChangeSubscriptionResult = Apollo.SubscriptionResult<WorkspaceChangeSubscription>;
export const OpenWorkspaceDocument = gql`
  mutation OpenWorkspace($workspaceId: String!) {
    workspace: openWorkspace(workspaceId: $workspaceId) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;
export type OpenWorkspaceMutationFn = Apollo.MutationFunction<OpenWorkspaceMutation, OpenWorkspaceMutationVariables>;

/**
 * __useOpenWorkspaceMutation__
 *
 * To run a mutation, you first call `useOpenWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openWorkspaceMutation, { data, loading, error }] = useOpenWorkspaceMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useOpenWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<OpenWorkspaceMutation, OpenWorkspaceMutationVariables>,
) {
  return Apollo.useMutation<OpenWorkspaceMutation, OpenWorkspaceMutationVariables>(OpenWorkspaceDocument, baseOptions);
}
export type OpenWorkspaceMutationHookResult = ReturnType<typeof useOpenWorkspaceMutation>;
export type OpenWorkspaceMutationResult = Apollo.MutationResult<OpenWorkspaceMutation>;
export type OpenWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  OpenWorkspaceMutation,
  OpenWorkspaceMutationVariables
>;
export const CloseWorkspaceDocument = gql`
  mutation CloseWorkspace($workspaceId: String!) {
    workspace: closeWorkspace(workspaceId: $workspaceId) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;
export type CloseWorkspaceMutationFn = Apollo.MutationFunction<CloseWorkspaceMutation, CloseWorkspaceMutationVariables>;

/**
 * __useCloseWorkspaceMutation__
 *
 * To run a mutation, you first call `useCloseWorkspaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseWorkspaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeWorkspaceMutation, { data, loading, error }] = useCloseWorkspaceMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *   },
 * });
 */
export function useCloseWorkspaceMutation(
  baseOptions?: Apollo.MutationHookOptions<CloseWorkspaceMutation, CloseWorkspaceMutationVariables>,
) {
  return Apollo.useMutation<CloseWorkspaceMutation, CloseWorkspaceMutationVariables>(
    CloseWorkspaceDocument,
    baseOptions,
  );
}
export type CloseWorkspaceMutationHookResult = ReturnType<typeof useCloseWorkspaceMutation>;
export type CloseWorkspaceMutationResult = Apollo.MutationResult<CloseWorkspaceMutation>;
export type CloseWorkspaceMutationOptions = Apollo.BaseMutationOptions<
  CloseWorkspaceMutation,
  CloseWorkspaceMutationVariables
>;
export const ChangeWorkspacePortDocument = gql`
  mutation ChangeWorkspacePort($workspaceId: String!, $portName: String!) {
    workspace: changeWorkspacePort(workspaceId: $workspaceId, portName: $portName) {
      ...WorkspaceFull
    }
  }
  ${WorkspaceFullFragmentDoc}
`;
export type ChangeWorkspacePortMutationFn = Apollo.MutationFunction<
  ChangeWorkspacePortMutation,
  ChangeWorkspacePortMutationVariables
>;

/**
 * __useChangeWorkspacePortMutation__
 *
 * To run a mutation, you first call `useChangeWorkspacePortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeWorkspacePortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeWorkspacePortMutation, { data, loading, error }] = useChangeWorkspacePortMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useChangeWorkspacePortMutation(
  baseOptions?: Apollo.MutationHookOptions<ChangeWorkspacePortMutation, ChangeWorkspacePortMutationVariables>,
) {
  return Apollo.useMutation<ChangeWorkspacePortMutation, ChangeWorkspacePortMutationVariables>(
    ChangeWorkspacePortDocument,
    baseOptions,
  );
}
export type ChangeWorkspacePortMutationHookResult = ReturnType<typeof useChangeWorkspacePortMutation>;
export type ChangeWorkspacePortMutationResult = Apollo.MutationResult<ChangeWorkspacePortMutation>;
export type ChangeWorkspacePortMutationOptions = Apollo.BaseMutationOptions<
  ChangeWorkspacePortMutation,
  ChangeWorkspacePortMutationVariables
>;
