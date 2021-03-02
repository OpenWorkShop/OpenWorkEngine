/* eslint-disable */
import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql';
import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

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
  | ParsedEnumOfApplicatorRadiusCompensation
  | ParsedEnumOfAxisPlane
  | ParsedEnumOfCircleDirection
  | ParsedEnumOfEnabledType
  | ParsedEnumOfFactorType
  | ParsedEnumOfFeedRateMode
  | ParsedEnumOfKinematicsMode
  | ParsedEnumOfMachineCoolantState
  | ParsedEnumOfMachineMotionType
  | ParsedEnumOfMachineOverridesMode
  | ParsedEnumOfMachineProgramState
  | ParsedEnumOfMovementDistanceType
  | ParsedEnumOfPathControlMode
  | ParsedEnumOfSpindleSpeedMode
  | ParsedEnumOfStatusReportType
  | ParsedEnumOfTimingMode
  | ParsedEnumOfUnitType
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
  line: SyntaxLine;
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
  program: Maybe<ProgramExecutor>;
  settings: FirmwareSettings;
  status: MachineStatus;
  timeline: Maybe<MachineTimelineNodeConnection>;
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

export type ControlledMachineTimelineArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
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
  setModal: MachineExecutionResult;
  settings: MachineExecutionResult;
  startTask: Controller;
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

export type ControllerSetModalArgs = {
  change: ModalChangeInput;
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
  programsDirectory: Scalars['String'];
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
  valueCode: Scalars['String'];
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
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfAxisFlagsMutationArgs = {
  value: AxisFlagsInput;
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
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfBooleanMutationArgs = {
  value: Scalars['Boolean'];
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
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfDecimalMutationArgs = {
  value: Scalars['Decimal'];
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
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfKinematicsModeMutationArgs = {
  value: KinematicsMode;
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
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfStatusReportTypeMutationArgs = {
  value: StatusReportType;
};

export type FirmwareSettingOfString = {
  __typename?: 'FirmwareSettingOfString';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: Scalars['String'];
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type FirmwareSettingOfStringMutationArgs = {
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

export type InstructionStep = {
  __typename?: 'InstructionStep';
  movement: Maybe<MachineMovement>;
  name: Scalars['String'];
  settingId: Scalars['String'];
  settingValue: Scalars['String'];
  value: Maybe<Scalars['Decimal']>;
  willChangeSetting: Scalars['Boolean'];
};

export type KeyValuePairOfApplicatorRadiusCompensationAndInt32 = {
  __typename?: 'KeyValuePairOfApplicatorRadiusCompensationAndInt32';
  key: ApplicatorRadiusCompensation;
  value: Scalars['Int'];
};

export type KeyValuePairOfAxisPlaneAndInt32 = {
  __typename?: 'KeyValuePairOfAxisPlaneAndInt32';
  key: AxisPlane;
  value: Scalars['Int'];
};

export type KeyValuePairOfCircleDirectionAndInt32 = {
  __typename?: 'KeyValuePairOfCircleDirectionAndInt32';
  key: CircleDirection;
  value: Scalars['Int'];
};

export type KeyValuePairOfEnabledTypeAndInt32 = {
  __typename?: 'KeyValuePairOfEnabledTypeAndInt32';
  key: EnabledType;
  value: Scalars['Int'];
};

export type KeyValuePairOfFactorTypeAndInt32 = {
  __typename?: 'KeyValuePairOfFactorTypeAndInt32';
  key: FactorType;
  value: Scalars['Int'];
};

export type KeyValuePairOfFeedRateModeAndInt32 = {
  __typename?: 'KeyValuePairOfFeedRateModeAndInt32';
  key: FeedRateMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfKinematicsModeAndInt32 = {
  __typename?: 'KeyValuePairOfKinematicsModeAndInt32';
  key: KinematicsMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfMachineCoolantStateAndInt32 = {
  __typename?: 'KeyValuePairOfMachineCoolantStateAndInt32';
  key: MachineCoolantState;
  value: Scalars['Int'];
};

export type KeyValuePairOfMachineMotionTypeAndInt32 = {
  __typename?: 'KeyValuePairOfMachineMotionTypeAndInt32';
  key: MachineMotionType;
  value: Scalars['Int'];
};

export type KeyValuePairOfMachineOverridesModeAndInt32 = {
  __typename?: 'KeyValuePairOfMachineOverridesModeAndInt32';
  key: MachineOverridesMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfMachineProgramStateAndInt32 = {
  __typename?: 'KeyValuePairOfMachineProgramStateAndInt32';
  key: MachineProgramState;
  value: Scalars['Int'];
};

export type KeyValuePairOfMovementDistanceTypeAndInt32 = {
  __typename?: 'KeyValuePairOfMovementDistanceTypeAndInt32';
  key: MovementDistanceType;
  value: Scalars['Int'];
};

export type KeyValuePairOfPathControlModeAndInt32 = {
  __typename?: 'KeyValuePairOfPathControlModeAndInt32';
  key: PathControlMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfSpindleSpeedModeAndInt32 = {
  __typename?: 'KeyValuePairOfSpindleSpeedModeAndInt32';
  key: SpindleSpeedMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfStatusReportTypeAndInt32 = {
  __typename?: 'KeyValuePairOfStatusReportTypeAndInt32';
  key: StatusReportType;
  value: Scalars['Int'];
};

export type KeyValuePairOfTimingModeAndInt32 = {
  __typename?: 'KeyValuePairOfTimingModeAndInt32';
  key: TimingMode;
  value: Scalars['Int'];
};

export type KeyValuePairOfUnitTypeAndInt32 = {
  __typename?: 'KeyValuePairOfUnitTypeAndInt32';
  key: UnitType;
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
  coolant: ModalSettingOfMachineCoolantState;
  feedRate: FirmwareSettingOfDecimal;
  isOn: Scalars['Boolean'];
  lengthOffset: Maybe<MachinePosition>;
  lengthOffsetFactorType: ModalSettingOfFactorType;
  probePosition: Maybe<MachinePosition>;
  radiusCompensation: ModalSettingOfApplicatorRadiusCompensation;
  spinDirection: ModalSettingOfCircleDirection;
  spinSpeed: FirmwareSettingOfDecimal;
  temperature: FirmwareSettingOfDecimal;
  toolId: FirmwareSettingOfString;
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
  canReceive: Scalars['Boolean'];
  lastInstructionResult: Maybe<MachineInstructionResult>;
  lineNumber: Scalars['Int'];
  pendingInstructionResults: Array<MachineInstructionResult>;
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
  apply: Array<InstructionStep>;
  instruction: CompiledInstruction;
  machine: ControlledMachine;
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

export type MachineModals = {
  __typename?: 'MachineModals';
  arcDistance: ModalSettingOfMovementDistanceType;
  cannedCycleReturnMode: ModalSettingOfTimingMode;
  cylindricalInterpolation: ModalSettingOfEnabledType;
  distance: ModalSettingOfMovementDistanceType;
  feedRate: ModalSettingOfFeedRateMode;
  motion: ModalSettingOfMachineMotionType;
  pathControlMode: ModalSettingOfPathControlMode;
  plane: ModalSettingOfAxisPlane;
  programState: ModalSettingOfMachineProgramState;
  settings: Array<FirmwareSetting>;
  spindleSpeed: ModalSettingOfSpindleSpeedMode;
  units: ModalSettingOfUnitType;
  userDefined: ModalSettingOfDecimal;
  workCoordinateSystem: ModalSettingOfDecimal;
};

export type MachineMovement = {
  __typename?: 'MachineMovement';
  a: Maybe<Scalars['Decimal']>;
  arcDirection: Maybe<CircleDirection>;
  b: Maybe<Scalars['Decimal']>;
  c: Maybe<Scalars['Decimal']>;
  dwell: Maybe<Scalars['Decimal']>;
  i: Maybe<Scalars['Decimal']>;
  j: Maybe<Scalars['Decimal']>;
  k: Maybe<Scalars['Decimal']>;
  u: Maybe<Scalars['Decimal']>;
  v: Maybe<Scalars['Decimal']>;
  w: Maybe<Scalars['Decimal']>;
  x: Maybe<Scalars['Decimal']>;
  y: Maybe<Scalars['Decimal']>;
  z: Maybe<Scalars['Decimal']>;
};

export type MachineOptions = {
  __typename?: 'MachineOptions';
  raw: Scalars['String'];
};

export type MachineOverrides = {
  __typename?: 'MachineOverrides';
  feed: FirmwareSettingOfDecimal;
  mode: ModalSettingOfMachineOverridesMode;
  rapids: FirmwareSettingOfDecimal;
  speed: FirmwareSettingOfDecimal;
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
  u: Maybe<Scalars['Decimal']>;
  v: Maybe<Scalars['Decimal']>;
  w: Maybe<Scalars['Decimal']>;
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
  overrides: MachineOverrides;
  workCoordinateOffset: Maybe<MachinePosition>;
  workPosition: Maybe<MachinePosition>;
};

export type MachineTimelineNode = {
  __typename?: 'MachineTimelineNode';
  logEntries: Array<MachineLogEntry>;
  logLevel: MachineLogLevel;
};

/** A connection to a list of items. */
export type MachineTimelineNodeConnection = {
  __typename?: 'MachineTimelineNodeConnection';
  /** A list of edges. */
  edges: Maybe<Array<MachineTimelineNodeEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<MachineTimelineNode>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MachineTimelineNodeEdge = {
  __typename?: 'MachineTimelineNodeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: MachineTimelineNode;
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

export type ModalOptionOfApplicatorRadiusCompensation = {
  __typename?: 'ModalOptionOfApplicatorRadiusCompensation';
  code: Scalars['String'];
  data: ApplicatorRadiusCompensation;
  value: Scalars['String'];
};

export type ModalOptionOfAxisPlane = {
  __typename?: 'ModalOptionOfAxisPlane';
  code: Scalars['String'];
  data: AxisPlane;
  value: Scalars['String'];
};

export type ModalOptionOfCircleDirection = {
  __typename?: 'ModalOptionOfCircleDirection';
  code: Scalars['String'];
  data: CircleDirection;
  value: Scalars['String'];
};

export type ModalOptionOfDecimal = {
  __typename?: 'ModalOptionOfDecimal';
  code: Scalars['String'];
  data: Scalars['Decimal'];
  value: Scalars['String'];
};

export type ModalOptionOfEnabledType = {
  __typename?: 'ModalOptionOfEnabledType';
  code: Scalars['String'];
  data: EnabledType;
  value: Scalars['String'];
};

export type ModalOptionOfFactorType = {
  __typename?: 'ModalOptionOfFactorType';
  code: Scalars['String'];
  data: FactorType;
  value: Scalars['String'];
};

export type ModalOptionOfFeedRateMode = {
  __typename?: 'ModalOptionOfFeedRateMode';
  code: Scalars['String'];
  data: FeedRateMode;
  value: Scalars['String'];
};

export type ModalOptionOfMachineCoolantState = {
  __typename?: 'ModalOptionOfMachineCoolantState';
  code: Scalars['String'];
  data: MachineCoolantState;
  value: Scalars['String'];
};

export type ModalOptionOfMachineMotionType = {
  __typename?: 'ModalOptionOfMachineMotionType';
  code: Scalars['String'];
  data: MachineMotionType;
  value: Scalars['String'];
};

export type ModalOptionOfMachineOverridesMode = {
  __typename?: 'ModalOptionOfMachineOverridesMode';
  code: Scalars['String'];
  data: MachineOverridesMode;
  value: Scalars['String'];
};

export type ModalOptionOfMachineProgramState = {
  __typename?: 'ModalOptionOfMachineProgramState';
  code: Scalars['String'];
  data: MachineProgramState;
  value: Scalars['String'];
};

export type ModalOptionOfMovementDistanceType = {
  __typename?: 'ModalOptionOfMovementDistanceType';
  code: Scalars['String'];
  data: MovementDistanceType;
  value: Scalars['String'];
};

export type ModalOptionOfPathControlMode = {
  __typename?: 'ModalOptionOfPathControlMode';
  code: Scalars['String'];
  data: PathControlMode;
  value: Scalars['String'];
};

export type ModalOptionOfSpindleSpeedMode = {
  __typename?: 'ModalOptionOfSpindleSpeedMode';
  code: Scalars['String'];
  data: SpindleSpeedMode;
  value: Scalars['String'];
};

export type ModalOptionOfTimingMode = {
  __typename?: 'ModalOptionOfTimingMode';
  code: Scalars['String'];
  data: TimingMode;
  value: Scalars['String'];
};

export type ModalOptionOfUnitType = {
  __typename?: 'ModalOptionOfUnitType';
  code: Scalars['String'];
  data: UnitType;
  value: Scalars['String'];
};

export type ModalSettingOfApplicatorRadiusCompensation = {
  __typename?: 'ModalSettingOfApplicatorRadiusCompensation';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: ApplicatorRadiusCompensation;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfApplicatorRadiusCompensation>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfApplicatorRadiusCompensationMutationArgs = {
  value: ApplicatorRadiusCompensation;
};

export type ModalSettingOfAxisPlane = {
  __typename?: 'ModalSettingOfAxisPlane';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: AxisPlane;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfAxisPlane>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfAxisPlaneMutationArgs = {
  value: AxisPlane;
};

export type ModalSettingOfCircleDirection = {
  __typename?: 'ModalSettingOfCircleDirection';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: CircleDirection;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfCircleDirection>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfCircleDirectionMutationArgs = {
  value: CircleDirection;
};

export type ModalSettingOfDecimal = {
  __typename?: 'ModalSettingOfDecimal';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: Scalars['Decimal'];
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfDecimal>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfDecimalMutationArgs = {
  value: Scalars['Decimal'];
};

export type ModalSettingOfEnabledType = {
  __typename?: 'ModalSettingOfEnabledType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: EnabledType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfEnabledType>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfEnabledTypeMutationArgs = {
  value: EnabledType;
};

export type ModalSettingOfFactorType = {
  __typename?: 'ModalSettingOfFactorType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: FactorType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfFactorType>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfFactorTypeMutationArgs = {
  value: FactorType;
};

export type ModalSettingOfFeedRateMode = {
  __typename?: 'ModalSettingOfFeedRateMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: FeedRateMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfFeedRateMode>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfFeedRateModeMutationArgs = {
  value: FeedRateMode;
};

export type ModalSettingOfMachineCoolantState = {
  __typename?: 'ModalSettingOfMachineCoolantState';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: MachineCoolantState;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfMachineCoolantState>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfMachineCoolantStateMutationArgs = {
  value: MachineCoolantState;
};

export type ModalSettingOfMachineMotionType = {
  __typename?: 'ModalSettingOfMachineMotionType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: MachineMotionType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfMachineMotionType>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfMachineMotionTypeMutationArgs = {
  value: MachineMotionType;
};

export type ModalSettingOfMachineOverridesMode = {
  __typename?: 'ModalSettingOfMachineOverridesMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: MachineOverridesMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfMachineOverridesMode>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfMachineOverridesModeMutationArgs = {
  value: MachineOverridesMode;
};

export type ModalSettingOfMachineProgramState = {
  __typename?: 'ModalSettingOfMachineProgramState';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: MachineProgramState;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfMachineProgramState>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfMachineProgramStateMutationArgs = {
  value: MachineProgramState;
};

export type ModalSettingOfMovementDistanceType = {
  __typename?: 'ModalSettingOfMovementDistanceType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: MovementDistanceType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfMovementDistanceType>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfMovementDistanceTypeMutationArgs = {
  value: MovementDistanceType;
};

export type ModalSettingOfPathControlMode = {
  __typename?: 'ModalSettingOfPathControlMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: PathControlMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfPathControlMode>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfPathControlModeMutationArgs = {
  value: PathControlMode;
};

export type ModalSettingOfSpindleSpeedMode = {
  __typename?: 'ModalSettingOfSpindleSpeedMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: SpindleSpeedMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfSpindleSpeedMode>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfSpindleSpeedModeMutationArgs = {
  value: SpindleSpeedMode;
};

export type ModalSettingOfTimingMode = {
  __typename?: 'ModalSettingOfTimingMode';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: TimingMode;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfTimingMode>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfTimingModeMutationArgs = {
  value: TimingMode;
};

export type ModalSettingOfUnitType = {
  __typename?: 'ModalSettingOfUnitType';
  comment: Maybe<Scalars['String']>;
  currentValue: Maybe<IParsedValue>;
  data: UnitType;
  hasBeenRead: Scalars['Boolean'];
  id: Scalars['String'];
  index: Scalars['Int'];
  key: Scalars['String'];
  mutation: InstructionStep;
  options: Array<ModalOptionOfUnitType>;
  settingType: MachineSettingType;
  title: Maybe<Scalars['String']>;
  units: MachineSettingUnits;
  value: Scalars['String'];
  valueCode: Scalars['String'];
};

export type ModalSettingOfUnitTypeMutationArgs = {
  value: UnitType;
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
  /** Open a program file by its name, parsing the contents. */
  loadProgram: ProgramFile;
  openPort: SystemPort;
  openWorkspace: Workspace;
  /** Create a metadata object to represent a file selection before uploading. */
  selectProgramFile: ProgramFileMeta;
  updateWorkspace: Workspace;
  /** Accept the text (body) of a file and (over)write the file on the server. */
  uploadProgramFile: ProgramFile;
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

export type MutationLoadProgramArgs = {
  name: Scalars['String'];
};

export type MutationOpenPortArgs = {
  firmware: FirmwareRequirementInput;
  options: SerialPortOptionsInput;
  portName: Scalars['String'];
};

export type MutationOpenWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type MutationSelectProgramFileArgs = {
  fileUpload: ClientFileUploadInput;
};

export type MutationUpdateWorkspaceArgs = {
  workspaceSettings: WorkspaceSettingsInput;
};

export type MutationUploadProgramFileArgs = {
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
  valueCode: Scalars['String'];
  valueString: Scalars['String'];
};

export type ParsedBool = {
  __typename?: 'ParsedBool';
  valueBool: Scalars['Boolean'];
  valueCode: Scalars['String'];
  valueString: Scalars['String'];
};

export type ParsedDecimal = {
  __typename?: 'ParsedDecimal';
  valueCode: Scalars['String'];
  valueDecimal: Scalars['Decimal'];
  valueString: Scalars['String'];
};

export type ParsedEnumOfApplicatorRadiusCompensation = {
  __typename?: 'ParsedEnumOfApplicatorRadiusCompensation';
  valueCode: Scalars['String'];
  valueEnum: ApplicatorRadiusCompensation;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfApplicatorRadiusCompensationAndInt32>;
};

export type ParsedEnumOfAxisPlane = {
  __typename?: 'ParsedEnumOfAxisPlane';
  valueCode: Scalars['String'];
  valueEnum: AxisPlane;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfAxisPlaneAndInt32>;
};

export type ParsedEnumOfCircleDirection = {
  __typename?: 'ParsedEnumOfCircleDirection';
  valueCode: Scalars['String'];
  valueEnum: CircleDirection;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfCircleDirectionAndInt32>;
};

export type ParsedEnumOfEnabledType = {
  __typename?: 'ParsedEnumOfEnabledType';
  valueCode: Scalars['String'];
  valueEnum: EnabledType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfEnabledTypeAndInt32>;
};

export type ParsedEnumOfFactorType = {
  __typename?: 'ParsedEnumOfFactorType';
  valueCode: Scalars['String'];
  valueEnum: FactorType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfFactorTypeAndInt32>;
};

export type ParsedEnumOfFeedRateMode = {
  __typename?: 'ParsedEnumOfFeedRateMode';
  valueCode: Scalars['String'];
  valueEnum: FeedRateMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfFeedRateModeAndInt32>;
};

export type ParsedEnumOfKinematicsMode = {
  __typename?: 'ParsedEnumOfKinematicsMode';
  valueCode: Scalars['String'];
  valueEnum: KinematicsMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfKinematicsModeAndInt32>;
};

export type ParsedEnumOfMachineCoolantState = {
  __typename?: 'ParsedEnumOfMachineCoolantState';
  valueCode: Scalars['String'];
  valueEnum: MachineCoolantState;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfMachineCoolantStateAndInt32>;
};

export type ParsedEnumOfMachineMotionType = {
  __typename?: 'ParsedEnumOfMachineMotionType';
  valueCode: Scalars['String'];
  valueEnum: MachineMotionType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfMachineMotionTypeAndInt32>;
};

export type ParsedEnumOfMachineOverridesMode = {
  __typename?: 'ParsedEnumOfMachineOverridesMode';
  valueCode: Scalars['String'];
  valueEnum: MachineOverridesMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfMachineOverridesModeAndInt32>;
};

export type ParsedEnumOfMachineProgramState = {
  __typename?: 'ParsedEnumOfMachineProgramState';
  valueCode: Scalars['String'];
  valueEnum: MachineProgramState;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfMachineProgramStateAndInt32>;
};

export type ParsedEnumOfMovementDistanceType = {
  __typename?: 'ParsedEnumOfMovementDistanceType';
  valueCode: Scalars['String'];
  valueEnum: MovementDistanceType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfMovementDistanceTypeAndInt32>;
};

export type ParsedEnumOfPathControlMode = {
  __typename?: 'ParsedEnumOfPathControlMode';
  valueCode: Scalars['String'];
  valueEnum: PathControlMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfPathControlModeAndInt32>;
};

export type ParsedEnumOfSpindleSpeedMode = {
  __typename?: 'ParsedEnumOfSpindleSpeedMode';
  valueCode: Scalars['String'];
  valueEnum: SpindleSpeedMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfSpindleSpeedModeAndInt32>;
};

export type ParsedEnumOfStatusReportType = {
  __typename?: 'ParsedEnumOfStatusReportType';
  valueCode: Scalars['String'];
  valueEnum: StatusReportType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfStatusReportTypeAndInt32>;
};

export type ParsedEnumOfTimingMode = {
  __typename?: 'ParsedEnumOfTimingMode';
  valueCode: Scalars['String'];
  valueEnum: TimingMode;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfTimingModeAndInt32>;
};

export type ParsedEnumOfUnitType = {
  __typename?: 'ParsedEnumOfUnitType';
  valueCode: Scalars['String'];
  valueEnum: UnitType;
  valueString: Scalars['String'];
  values: Array<KeyValuePairOfUnitTypeAndInt32>;
};

export type ParsedString = {
  __typename?: 'ParsedString';
  valueCode: Scalars['String'];
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

export type ProgramExecutor = {
  __typename?: 'ProgramExecutor';
  currentInstruction: Maybe<ProgramInstruction>;
  id: Scalars['String'];
  instructionCount: Scalars['Int'];
  instructionIndex: Scalars['Int'];
  instructions: Maybe<ProgramInstructionConnection>;
  programFile: ProgramFile;
  state: ExecutionState;
};

export type ProgramExecutorInstructionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  order: Maybe<Array<ProgramInstructionSortInput>>;
  where: Maybe<MachineLogEntryFilterInput>;
};

export type ProgramFile = {
  __typename?: 'ProgramFile';
  id: Scalars['String'];
  instructionCount: Scalars['Int'];
  instructions: Array<CompiledInstruction>;
  lineCount: Scalars['Int'];
  lines: Array<CompiledInstruction>;
  meta: ProgramFileMeta;
};

export type ProgramFileDirectory = {
  __typename?: 'ProgramFileDirectory';
  fileExtensions: Array<Scalars['String']>;
  path: Scalars['String'];
  programFileMetas: Array<ProgramFileMeta>;
};

export type ProgramFileMeta = {
  __typename?: 'ProgramFileMeta';
  data: Maybe<ProgramFileMetaData>;
  directory: Scalars['String'];
  fileExists: Scalars['Boolean'];
  filePath: Scalars['String'];
  lastModified: Scalars['Long'];
  name: Scalars['String'];
  size: Scalars['Long'];
  syntax: ProgramSyntax;
  type: Scalars['String'];
};

export type ProgramFileMetaData = {
  __typename?: 'ProgramFileMetaData';
  revisions: Array<ProgramFileRevision>;
  tags: Array<Scalars['String']>;
};

export type ProgramFileRevision = {
  __typename?: 'ProgramFileRevision';
  checksum: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type ProgramInstruction = {
  __typename?: 'ProgramInstruction';
  compiledInstruction: CompiledInstruction;
  index: Scalars['Int'];
  steps: Array<InstructionStep>;
};

/** A connection to a list of items. */
export type ProgramInstructionConnection = {
  __typename?: 'ProgramInstructionConnection';
  /** A list of edges. */
  edges: Maybe<Array<ProgramInstructionEdge>>;
  /** A flattened list of the nodes. */
  nodes: Maybe<Array<ProgramInstruction>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProgramInstructionEdge = {
  __typename?: 'ProgramInstructionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProgramInstruction;
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
  /** List all of the programs which exist in the program directory. */
  programDirectory: ProgramFileDirectory;
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
  onMachineProgram: ControlledMachine;
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

export type SubscriptionOnMachineProgramArgs = {
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

export type SyntaxLine = {
  __typename?: 'SyntaxLine';
  chunks: Array<SyntaxChunk>;
  hasCode: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  raw: Scalars['String'];
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

export enum ApplicatorRadiusCompensation {
  DynamicLeft = 'DYNAMIC_LEFT',
  DynamicRight = 'DYNAMIC_RIGHT',
  Left = 'LEFT',
  None = 'NONE',
  Right = 'RIGHT',
}

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export enum AxisName {
  A = 'A',
  B = 'B',
  C = 'C',
  U = 'U',
  V = 'V',
  W = 'W',
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

export enum CircleDirection {
  Ccw = 'CCW',
  Cw = 'CW',
  None = 'NONE',
}

export enum EnabledType {
  Disabled = 'DISABLED',
  Enabled = 'ENABLED',
}

export enum ExecutionState {
  Complete = 'COMPLETE',
  Paused = 'PAUSED',
  Ready = 'READY',
  Running = 'RUNNING',
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

export enum MachineCoolantState {
  All = 'ALL',
  Flood = 'FLOOD',
  Mist = 'MIST',
  None = 'NONE',
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

export enum MachineOverridesMode {
  All = 'ALL',
  Feeds = 'FEEDS',
  None = 'NONE',
  Speeds = 'SPEEDS',
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
  ManualChange = 'MANUAL_CHANGE',
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
  PerMinute = 'PER_MINUTE',
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

export type AxisFlagsInput = {
  x: Scalars['Boolean'];
  y: Scalars['Boolean'];
  z: Scalars['Boolean'];
};

export type BooleanOperationFilterInput = {
  eq: Maybe<Scalars['Boolean']>;
  neq: Maybe<Scalars['Boolean']>;
};

export type ClientFileUploadInput = {
  lastModified: Scalars['Long'];
  name: Scalars['String'];
  size: Scalars['Long'];
  type: Scalars['String'];
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

export type CompiledInstructionSortInput = {
  line: Maybe<SyntaxLineSortInput>;
  source: Maybe<SortEnumType>;
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

export type ModalChangeInput = {
  code: Maybe<Scalars['String']>;
  id: Scalars['String'];
  value: Scalars['String'];
};

export type MoveCommandInput = {
  a: Maybe<Scalars['Decimal']>;
  b: Maybe<Scalars['Decimal']>;
  c: Maybe<Scalars['Decimal']>;
  distanceType: MovementDistanceType;
  motionType: Maybe<MachineMotionType>;
  u: Maybe<Scalars['Decimal']>;
  v: Maybe<Scalars['Decimal']>;
  w: Maybe<Scalars['Decimal']>;
  x: Maybe<Scalars['Decimal']>;
  y: Maybe<Scalars['Decimal']>;
  z: Maybe<Scalars['Decimal']>;
};

export type ProgramFileUploadInput = {
  lastModified: Scalars['Long'];
  name: Scalars['String'];
  size: Scalars['Long'];
  text: Scalars['String'];
  type: Scalars['String'];
};

export type ProgramInstructionSortInput = {
  compiledInstruction: Maybe<CompiledInstructionSortInput>;
  index: Maybe<SortEnumType>;
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

export type SyntaxLineSortInput = {
  hasCode: Maybe<SortEnumType>;
  isValid: Maybe<SortEnumType>;
  raw: Maybe<SortEnumType>;
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
    | ResolversTypes['ParsedEnumOfApplicatorRadiusCompensation']
    | ResolversTypes['ParsedEnumOfAxisPlane']
    | ResolversTypes['ParsedEnumOfCircleDirection']
    | ResolversTypes['ParsedEnumOfEnabledType']
    | ResolversTypes['ParsedEnumOfFactorType']
    | ResolversTypes['ParsedEnumOfFeedRateMode']
    | ResolversTypes['ParsedEnumOfKinematicsMode']
    | ResolversTypes['ParsedEnumOfMachineCoolantState']
    | ResolversTypes['ParsedEnumOfMachineMotionType']
    | ResolversTypes['ParsedEnumOfMachineOverridesMode']
    | ResolversTypes['ParsedEnumOfMachineProgramState']
    | ResolversTypes['ParsedEnumOfMovementDistanceType']
    | ResolversTypes['ParsedEnumOfPathControlMode']
    | ResolversTypes['ParsedEnumOfSpindleSpeedMode']
    | ResolversTypes['ParsedEnumOfStatusReportType']
    | ResolversTypes['ParsedEnumOfTimingMode']
    | ResolversTypes['ParsedEnumOfUnitType']
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
  FirmwareSettingOfString: ResolverTypeWrapper<
    Omit<FirmwareSettingOfString, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  FirmwareSettings: ResolverTypeWrapper<FirmwareSettings>;
  InstructionStep: ResolverTypeWrapper<InstructionStep>;
  KeyValuePairOfApplicatorRadiusCompensationAndInt32: ResolverTypeWrapper<KeyValuePairOfApplicatorRadiusCompensationAndInt32>;
  KeyValuePairOfAxisPlaneAndInt32: ResolverTypeWrapper<KeyValuePairOfAxisPlaneAndInt32>;
  KeyValuePairOfCircleDirectionAndInt32: ResolverTypeWrapper<KeyValuePairOfCircleDirectionAndInt32>;
  KeyValuePairOfEnabledTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfEnabledTypeAndInt32>;
  KeyValuePairOfFactorTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfFactorTypeAndInt32>;
  KeyValuePairOfFeedRateModeAndInt32: ResolverTypeWrapper<KeyValuePairOfFeedRateModeAndInt32>;
  KeyValuePairOfKinematicsModeAndInt32: ResolverTypeWrapper<KeyValuePairOfKinematicsModeAndInt32>;
  KeyValuePairOfMachineCoolantStateAndInt32: ResolverTypeWrapper<KeyValuePairOfMachineCoolantStateAndInt32>;
  KeyValuePairOfMachineMotionTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfMachineMotionTypeAndInt32>;
  KeyValuePairOfMachineOverridesModeAndInt32: ResolverTypeWrapper<KeyValuePairOfMachineOverridesModeAndInt32>;
  KeyValuePairOfMachineProgramStateAndInt32: ResolverTypeWrapper<KeyValuePairOfMachineProgramStateAndInt32>;
  KeyValuePairOfMovementDistanceTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfMovementDistanceTypeAndInt32>;
  KeyValuePairOfPathControlModeAndInt32: ResolverTypeWrapper<KeyValuePairOfPathControlModeAndInt32>;
  KeyValuePairOfSpindleSpeedModeAndInt32: ResolverTypeWrapper<KeyValuePairOfSpindleSpeedModeAndInt32>;
  KeyValuePairOfStatusReportTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfStatusReportTypeAndInt32>;
  KeyValuePairOfTimingModeAndInt32: ResolverTypeWrapper<KeyValuePairOfTimingModeAndInt32>;
  KeyValuePairOfUnitTypeAndInt32: ResolverTypeWrapper<KeyValuePairOfUnitTypeAndInt32>;
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
  MachineModals: ResolverTypeWrapper<MachineModals>;
  MachineMovement: ResolverTypeWrapper<MachineMovement>;
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
  MachineTimelineNode: ResolverTypeWrapper<MachineTimelineNode>;
  MachineTimelineNodeConnection: ResolverTypeWrapper<MachineTimelineNodeConnection>;
  MachineTimelineNodeEdge: ResolverTypeWrapper<MachineTimelineNodeEdge>;
  MacroSettings: ResolverTypeWrapper<MacroSettings>;
  MakerHubSettings: ResolverTypeWrapper<MakerHubSettings>;
  ModalOptionOfApplicatorRadiusCompensation: ResolverTypeWrapper<ModalOptionOfApplicatorRadiusCompensation>;
  ModalOptionOfAxisPlane: ResolverTypeWrapper<ModalOptionOfAxisPlane>;
  ModalOptionOfCircleDirection: ResolverTypeWrapper<ModalOptionOfCircleDirection>;
  ModalOptionOfDecimal: ResolverTypeWrapper<ModalOptionOfDecimal>;
  ModalOptionOfEnabledType: ResolverTypeWrapper<ModalOptionOfEnabledType>;
  ModalOptionOfFactorType: ResolverTypeWrapper<ModalOptionOfFactorType>;
  ModalOptionOfFeedRateMode: ResolverTypeWrapper<ModalOptionOfFeedRateMode>;
  ModalOptionOfMachineCoolantState: ResolverTypeWrapper<ModalOptionOfMachineCoolantState>;
  ModalOptionOfMachineMotionType: ResolverTypeWrapper<ModalOptionOfMachineMotionType>;
  ModalOptionOfMachineOverridesMode: ResolverTypeWrapper<ModalOptionOfMachineOverridesMode>;
  ModalOptionOfMachineProgramState: ResolverTypeWrapper<ModalOptionOfMachineProgramState>;
  ModalOptionOfMovementDistanceType: ResolverTypeWrapper<ModalOptionOfMovementDistanceType>;
  ModalOptionOfPathControlMode: ResolverTypeWrapper<ModalOptionOfPathControlMode>;
  ModalOptionOfSpindleSpeedMode: ResolverTypeWrapper<ModalOptionOfSpindleSpeedMode>;
  ModalOptionOfTimingMode: ResolverTypeWrapper<ModalOptionOfTimingMode>;
  ModalOptionOfUnitType: ResolverTypeWrapper<ModalOptionOfUnitType>;
  ModalSettingOfApplicatorRadiusCompensation: ResolverTypeWrapper<
    Omit<ModalSettingOfApplicatorRadiusCompensation, 'currentValue'> & {
      currentValue: Maybe<ResolversTypes['IParsedValue']>;
    }
  >;
  ModalSettingOfAxisPlane: ResolverTypeWrapper<
    Omit<ModalSettingOfAxisPlane, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfCircleDirection: ResolverTypeWrapper<
    Omit<ModalSettingOfCircleDirection, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfDecimal: ResolverTypeWrapper<
    Omit<ModalSettingOfDecimal, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfEnabledType: ResolverTypeWrapper<
    Omit<ModalSettingOfEnabledType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfFactorType: ResolverTypeWrapper<
    Omit<ModalSettingOfFactorType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfFeedRateMode: ResolverTypeWrapper<
    Omit<ModalSettingOfFeedRateMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfMachineCoolantState: ResolverTypeWrapper<
    Omit<ModalSettingOfMachineCoolantState, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfMachineMotionType: ResolverTypeWrapper<
    Omit<ModalSettingOfMachineMotionType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfMachineOverridesMode: ResolverTypeWrapper<
    Omit<ModalSettingOfMachineOverridesMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfMachineProgramState: ResolverTypeWrapper<
    Omit<ModalSettingOfMachineProgramState, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfMovementDistanceType: ResolverTypeWrapper<
    Omit<ModalSettingOfMovementDistanceType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfPathControlMode: ResolverTypeWrapper<
    Omit<ModalSettingOfPathControlMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfSpindleSpeedMode: ResolverTypeWrapper<
    Omit<ModalSettingOfSpindleSpeedMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfTimingMode: ResolverTypeWrapper<
    Omit<ModalSettingOfTimingMode, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  ModalSettingOfUnitType: ResolverTypeWrapper<
    Omit<ModalSettingOfUnitType, 'currentValue'> & { currentValue: Maybe<ResolversTypes['IParsedValue']> }
  >;
  MountPointSettings: ResolverTypeWrapper<MountPointSettings>;
  Mutation: ResolverTypeWrapper<{}>;
  OpenControllerSession: ResolverTypeWrapper<OpenControllerSession>;
  OpenControllerSettings: ResolverTypeWrapper<OpenControllerSettings>;
  OpenControllerUser: ResolverTypeWrapper<OpenControllerUser>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  ParsedAxisFlags: ResolverTypeWrapper<ParsedAxisFlags>;
  ParsedBool: ResolverTypeWrapper<ParsedBool>;
  ParsedDecimal: ResolverTypeWrapper<ParsedDecimal>;
  ParsedEnumOfApplicatorRadiusCompensation: ResolverTypeWrapper<ParsedEnumOfApplicatorRadiusCompensation>;
  ParsedEnumOfAxisPlane: ResolverTypeWrapper<ParsedEnumOfAxisPlane>;
  ParsedEnumOfCircleDirection: ResolverTypeWrapper<ParsedEnumOfCircleDirection>;
  ParsedEnumOfEnabledType: ResolverTypeWrapper<ParsedEnumOfEnabledType>;
  ParsedEnumOfFactorType: ResolverTypeWrapper<ParsedEnumOfFactorType>;
  ParsedEnumOfFeedRateMode: ResolverTypeWrapper<ParsedEnumOfFeedRateMode>;
  ParsedEnumOfKinematicsMode: ResolverTypeWrapper<ParsedEnumOfKinematicsMode>;
  ParsedEnumOfMachineCoolantState: ResolverTypeWrapper<ParsedEnumOfMachineCoolantState>;
  ParsedEnumOfMachineMotionType: ResolverTypeWrapper<ParsedEnumOfMachineMotionType>;
  ParsedEnumOfMachineOverridesMode: ResolverTypeWrapper<ParsedEnumOfMachineOverridesMode>;
  ParsedEnumOfMachineProgramState: ResolverTypeWrapper<ParsedEnumOfMachineProgramState>;
  ParsedEnumOfMovementDistanceType: ResolverTypeWrapper<ParsedEnumOfMovementDistanceType>;
  ParsedEnumOfPathControlMode: ResolverTypeWrapper<ParsedEnumOfPathControlMode>;
  ParsedEnumOfSpindleSpeedMode: ResolverTypeWrapper<ParsedEnumOfSpindleSpeedMode>;
  ParsedEnumOfStatusReportType: ResolverTypeWrapper<ParsedEnumOfStatusReportType>;
  ParsedEnumOfTimingMode: ResolverTypeWrapper<ParsedEnumOfTimingMode>;
  ParsedEnumOfUnitType: ResolverTypeWrapper<ParsedEnumOfUnitType>;
  ParsedString: ResolverTypeWrapper<ParsedString>;
  PortOptions: ResolverTypeWrapper<PortOptions>;
  PortStatus: ResolverTypeWrapper<PortStatus>;
  ProgramExecutor: ResolverTypeWrapper<ProgramExecutor>;
  ProgramFile: ResolverTypeWrapper<ProgramFile>;
  ProgramFileDirectory: ResolverTypeWrapper<ProgramFileDirectory>;
  ProgramFileMeta: ResolverTypeWrapper<ProgramFileMeta>;
  ProgramFileMetaData: ResolverTypeWrapper<ProgramFileMetaData>;
  ProgramFileRevision: ResolverTypeWrapper<ProgramFileRevision>;
  ProgramInstruction: ResolverTypeWrapper<ProgramInstruction>;
  ProgramInstructionConnection: ResolverTypeWrapper<ProgramInstructionConnection>;
  ProgramInstructionEdge: ResolverTypeWrapper<ProgramInstructionEdge>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  SyntaxChunk: ResolverTypeWrapper<SyntaxChunk>;
  SyntaxLine: ResolverTypeWrapper<SyntaxLine>;
  SystemPort: ResolverTypeWrapper<SystemPort>;
  UserProfile: ResolverTypeWrapper<UserProfile>;
  Workspace: ResolverTypeWrapper<Workspace>;
  WorkspaceSettings: ResolverTypeWrapper<WorkspaceSettings>;
  ActiveState: ActiveState;
  ApplicatorRadiusCompensation: ApplicatorRadiusCompensation;
  ApplyPolicy: ApplyPolicy;
  AxisName: AxisName;
  AxisPlane: AxisPlane;
  BaudRate: BaudRate;
  CircleDirection: CircleDirection;
  EnabledType: EnabledType;
  ExecutionState: ExecutionState;
  FactorType: FactorType;
  FeedRateMode: FeedRateMode;
  Handshake: Handshake;
  KinematicsMode: KinematicsMode;
  MachineAlertType: MachineAlertType;
  MachineCategory: MachineCategory;
  MachineControllerType: MachineControllerType;
  MachineCoolantState: MachineCoolantState;
  MachineLogLevel: MachineLogLevel;
  MachineLogSource: MachineLogSource;
  MachineMotionType: MachineMotionType;
  MachineOverridesMode: MachineOverridesMode;
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
  SerialWriteState: SerialWriteState;
  SortEnumType: SortEnumType;
  SpindleSpeedMode: SpindleSpeedMode;
  StatusReportType: StatusReportType;
  StopBits: StopBits;
  SyntaxType: SyntaxType;
  TimingMode: TimingMode;
  UnitType: UnitType;
  WorkspaceState: WorkspaceState;
  AxisFlagsInput: AxisFlagsInput;
  BooleanOperationFilterInput: BooleanOperationFilterInput;
  ClientFileUploadInput: ClientFileUploadInput;
  ComparableDateTimeOperationFilterInput: ComparableDateTimeOperationFilterInput;
  ComparableInt32OperationFilterInput: ComparableInt32OperationFilterInput;
  CompiledInstructionSortInput: CompiledInstructionSortInput;
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
  ModalChangeInput: ModalChangeInput;
  MoveCommandInput: MoveCommandInput;
  ProgramFileUploadInput: ProgramFileUploadInput;
  ProgramInstructionSortInput: ProgramInstructionSortInput;
  SerialPortOptionsInput: SerialPortOptionsInput;
  SerialWriteStateOperationFilterInput: SerialWriteStateOperationFilterInput;
  StringOperationFilterInput: StringOperationFilterInput;
  SyntaxChunkFilterInput: SyntaxChunkFilterInput;
  SyntaxLineSortInput: SyntaxLineSortInput;
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
    | ResolversParentTypes['ParsedEnumOfApplicatorRadiusCompensation']
    | ResolversParentTypes['ParsedEnumOfAxisPlane']
    | ResolversParentTypes['ParsedEnumOfCircleDirection']
    | ResolversParentTypes['ParsedEnumOfEnabledType']
    | ResolversParentTypes['ParsedEnumOfFactorType']
    | ResolversParentTypes['ParsedEnumOfFeedRateMode']
    | ResolversParentTypes['ParsedEnumOfKinematicsMode']
    | ResolversParentTypes['ParsedEnumOfMachineCoolantState']
    | ResolversParentTypes['ParsedEnumOfMachineMotionType']
    | ResolversParentTypes['ParsedEnumOfMachineOverridesMode']
    | ResolversParentTypes['ParsedEnumOfMachineProgramState']
    | ResolversParentTypes['ParsedEnumOfMovementDistanceType']
    | ResolversParentTypes['ParsedEnumOfPathControlMode']
    | ResolversParentTypes['ParsedEnumOfSpindleSpeedMode']
    | ResolversParentTypes['ParsedEnumOfStatusReportType']
    | ResolversParentTypes['ParsedEnumOfTimingMode']
    | ResolversParentTypes['ParsedEnumOfUnitType']
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
  FirmwareSettingOfString: Omit<FirmwareSettingOfString, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  FirmwareSettings: FirmwareSettings;
  InstructionStep: InstructionStep;
  KeyValuePairOfApplicatorRadiusCompensationAndInt32: KeyValuePairOfApplicatorRadiusCompensationAndInt32;
  KeyValuePairOfAxisPlaneAndInt32: KeyValuePairOfAxisPlaneAndInt32;
  KeyValuePairOfCircleDirectionAndInt32: KeyValuePairOfCircleDirectionAndInt32;
  KeyValuePairOfEnabledTypeAndInt32: KeyValuePairOfEnabledTypeAndInt32;
  KeyValuePairOfFactorTypeAndInt32: KeyValuePairOfFactorTypeAndInt32;
  KeyValuePairOfFeedRateModeAndInt32: KeyValuePairOfFeedRateModeAndInt32;
  KeyValuePairOfKinematicsModeAndInt32: KeyValuePairOfKinematicsModeAndInt32;
  KeyValuePairOfMachineCoolantStateAndInt32: KeyValuePairOfMachineCoolantStateAndInt32;
  KeyValuePairOfMachineMotionTypeAndInt32: KeyValuePairOfMachineMotionTypeAndInt32;
  KeyValuePairOfMachineOverridesModeAndInt32: KeyValuePairOfMachineOverridesModeAndInt32;
  KeyValuePairOfMachineProgramStateAndInt32: KeyValuePairOfMachineProgramStateAndInt32;
  KeyValuePairOfMovementDistanceTypeAndInt32: KeyValuePairOfMovementDistanceTypeAndInt32;
  KeyValuePairOfPathControlModeAndInt32: KeyValuePairOfPathControlModeAndInt32;
  KeyValuePairOfSpindleSpeedModeAndInt32: KeyValuePairOfSpindleSpeedModeAndInt32;
  KeyValuePairOfStatusReportTypeAndInt32: KeyValuePairOfStatusReportTypeAndInt32;
  KeyValuePairOfTimingModeAndInt32: KeyValuePairOfTimingModeAndInt32;
  KeyValuePairOfUnitTypeAndInt32: KeyValuePairOfUnitTypeAndInt32;
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
  MachineModals: MachineModals;
  MachineMovement: MachineMovement;
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
  MachineTimelineNode: MachineTimelineNode;
  MachineTimelineNodeConnection: MachineTimelineNodeConnection;
  MachineTimelineNodeEdge: MachineTimelineNodeEdge;
  MacroSettings: MacroSettings;
  MakerHubSettings: MakerHubSettings;
  ModalOptionOfApplicatorRadiusCompensation: ModalOptionOfApplicatorRadiusCompensation;
  ModalOptionOfAxisPlane: ModalOptionOfAxisPlane;
  ModalOptionOfCircleDirection: ModalOptionOfCircleDirection;
  ModalOptionOfDecimal: ModalOptionOfDecimal;
  ModalOptionOfEnabledType: ModalOptionOfEnabledType;
  ModalOptionOfFactorType: ModalOptionOfFactorType;
  ModalOptionOfFeedRateMode: ModalOptionOfFeedRateMode;
  ModalOptionOfMachineCoolantState: ModalOptionOfMachineCoolantState;
  ModalOptionOfMachineMotionType: ModalOptionOfMachineMotionType;
  ModalOptionOfMachineOverridesMode: ModalOptionOfMachineOverridesMode;
  ModalOptionOfMachineProgramState: ModalOptionOfMachineProgramState;
  ModalOptionOfMovementDistanceType: ModalOptionOfMovementDistanceType;
  ModalOptionOfPathControlMode: ModalOptionOfPathControlMode;
  ModalOptionOfSpindleSpeedMode: ModalOptionOfSpindleSpeedMode;
  ModalOptionOfTimingMode: ModalOptionOfTimingMode;
  ModalOptionOfUnitType: ModalOptionOfUnitType;
  ModalSettingOfApplicatorRadiusCompensation: Omit<ModalSettingOfApplicatorRadiusCompensation, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfAxisPlane: Omit<ModalSettingOfAxisPlane, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfCircleDirection: Omit<ModalSettingOfCircleDirection, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfDecimal: Omit<ModalSettingOfDecimal, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfEnabledType: Omit<ModalSettingOfEnabledType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfFactorType: Omit<ModalSettingOfFactorType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfFeedRateMode: Omit<ModalSettingOfFeedRateMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfMachineCoolantState: Omit<ModalSettingOfMachineCoolantState, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfMachineMotionType: Omit<ModalSettingOfMachineMotionType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfMachineOverridesMode: Omit<ModalSettingOfMachineOverridesMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfMachineProgramState: Omit<ModalSettingOfMachineProgramState, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfMovementDistanceType: Omit<ModalSettingOfMovementDistanceType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfPathControlMode: Omit<ModalSettingOfPathControlMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfSpindleSpeedMode: Omit<ModalSettingOfSpindleSpeedMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfTimingMode: Omit<ModalSettingOfTimingMode, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  ModalSettingOfUnitType: Omit<ModalSettingOfUnitType, 'currentValue'> & {
    currentValue: Maybe<ResolversParentTypes['IParsedValue']>;
  };
  MountPointSettings: MountPointSettings;
  Mutation: {};
  OpenControllerSession: OpenControllerSession;
  OpenControllerSettings: OpenControllerSettings;
  OpenControllerUser: OpenControllerUser;
  PageInfo: PageInfo;
  ParsedAxisFlags: ParsedAxisFlags;
  ParsedBool: ParsedBool;
  ParsedDecimal: ParsedDecimal;
  ParsedEnumOfApplicatorRadiusCompensation: ParsedEnumOfApplicatorRadiusCompensation;
  ParsedEnumOfAxisPlane: ParsedEnumOfAxisPlane;
  ParsedEnumOfCircleDirection: ParsedEnumOfCircleDirection;
  ParsedEnumOfEnabledType: ParsedEnumOfEnabledType;
  ParsedEnumOfFactorType: ParsedEnumOfFactorType;
  ParsedEnumOfFeedRateMode: ParsedEnumOfFeedRateMode;
  ParsedEnumOfKinematicsMode: ParsedEnumOfKinematicsMode;
  ParsedEnumOfMachineCoolantState: ParsedEnumOfMachineCoolantState;
  ParsedEnumOfMachineMotionType: ParsedEnumOfMachineMotionType;
  ParsedEnumOfMachineOverridesMode: ParsedEnumOfMachineOverridesMode;
  ParsedEnumOfMachineProgramState: ParsedEnumOfMachineProgramState;
  ParsedEnumOfMovementDistanceType: ParsedEnumOfMovementDistanceType;
  ParsedEnumOfPathControlMode: ParsedEnumOfPathControlMode;
  ParsedEnumOfSpindleSpeedMode: ParsedEnumOfSpindleSpeedMode;
  ParsedEnumOfStatusReportType: ParsedEnumOfStatusReportType;
  ParsedEnumOfTimingMode: ParsedEnumOfTimingMode;
  ParsedEnumOfUnitType: ParsedEnumOfUnitType;
  ParsedString: ParsedString;
  PortOptions: PortOptions;
  PortStatus: PortStatus;
  ProgramExecutor: ProgramExecutor;
  ProgramFile: ProgramFile;
  ProgramFileDirectory: ProgramFileDirectory;
  ProgramFileMeta: ProgramFileMeta;
  ProgramFileMetaData: ProgramFileMetaData;
  ProgramFileRevision: ProgramFileRevision;
  ProgramInstruction: ProgramInstruction;
  ProgramInstructionConnection: ProgramInstructionConnection;
  ProgramInstructionEdge: ProgramInstructionEdge;
  Query: {};
  Subscription: {};
  SyntaxChunk: SyntaxChunk;
  SyntaxLine: SyntaxLine;
  SystemPort: SystemPort;
  UserProfile: UserProfile;
  Workspace: Workspace;
  WorkspaceSettings: WorkspaceSettings;
  AxisFlagsInput: AxisFlagsInput;
  BooleanOperationFilterInput: BooleanOperationFilterInput;
  ClientFileUploadInput: ClientFileUploadInput;
  ComparableDateTimeOperationFilterInput: ComparableDateTimeOperationFilterInput;
  ComparableInt32OperationFilterInput: ComparableInt32OperationFilterInput;
  CompiledInstructionSortInput: CompiledInstructionSortInput;
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
  ModalChangeInput: ModalChangeInput;
  MoveCommandInput: MoveCommandInput;
  ProgramFileUploadInput: ProgramFileUploadInput;
  ProgramInstructionSortInput: ProgramInstructionSortInput;
  SerialPortOptionsInput: SerialPortOptionsInput;
  SerialWriteStateOperationFilterInput: SerialWriteStateOperationFilterInput;
  StringOperationFilterInput: StringOperationFilterInput;
  SyntaxChunkFilterInput: SyntaxChunkFilterInput;
  SyntaxLineSortInput: SyntaxLineSortInput;
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
    | 'ParsedEnumOfApplicatorRadiusCompensation'
    | 'ParsedEnumOfAxisPlane'
    | 'ParsedEnumOfCircleDirection'
    | 'ParsedEnumOfEnabledType'
    | 'ParsedEnumOfFactorType'
    | 'ParsedEnumOfFeedRateMode'
    | 'ParsedEnumOfKinematicsMode'
    | 'ParsedEnumOfMachineCoolantState'
    | 'ParsedEnumOfMachineMotionType'
    | 'ParsedEnumOfMachineOverridesMode'
    | 'ParsedEnumOfMachineProgramState'
    | 'ParsedEnumOfMovementDistanceType'
    | 'ParsedEnumOfPathControlMode'
    | 'ParsedEnumOfSpindleSpeedMode'
    | 'ParsedEnumOfStatusReportType'
    | 'ParsedEnumOfTimingMode'
    | 'ParsedEnumOfUnitType'
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
  line: Resolver<ResolversTypes['SyntaxLine'], ParentType, ContextType>;
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
  program: Resolver<Maybe<ResolversTypes['ProgramExecutor']>, ParentType, ContextType>;
  settings: Resolver<ResolversTypes['FirmwareSettings'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['MachineStatus'], ParentType, ContextType>;
  timeline: Resolver<
    Maybe<ResolversTypes['MachineTimelineNodeConnection']>,
    ParentType,
    ContextType,
    RequireFields<ControlledMachineTimelineArgs, never>
  >;
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
  setModal: Resolver<
    ResolversTypes['MachineExecutionResult'],
    ParentType,
    ContextType,
    RequireFields<ControllerSetModalArgs, 'change'>
  >;
  settings: Resolver<ResolversTypes['MachineExecutionResult'], ParentType, ContextType>;
  startTask: Resolver<ResolversTypes['Controller'], ParentType, ContextType>;
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
  programsDirectory: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfAxisFlagsMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfBooleanMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfDecimalMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfKinematicsModeMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfStatusReportTypeMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FirmwareSettingOfStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FirmwareSettingOfString'] = ResolversParentTypes['FirmwareSettingOfString']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<FirmwareSettingOfStringMutationArgs, 'value'>
  >;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type InstructionStepResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['InstructionStep'] = ResolversParentTypes['InstructionStep']
> = {
  movement: Resolver<Maybe<ResolversTypes['MachineMovement']>, ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settingValue: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  willChangeSetting: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfApplicatorRadiusCompensationAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfApplicatorRadiusCompensationAndInt32'] = ResolversParentTypes['KeyValuePairOfApplicatorRadiusCompensationAndInt32']
> = {
  key: Resolver<ResolversTypes['ApplicatorRadiusCompensation'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfAxisPlaneAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfAxisPlaneAndInt32'] = ResolversParentTypes['KeyValuePairOfAxisPlaneAndInt32']
> = {
  key: Resolver<ResolversTypes['AxisPlane'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfCircleDirectionAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfCircleDirectionAndInt32'] = ResolversParentTypes['KeyValuePairOfCircleDirectionAndInt32']
> = {
  key: Resolver<ResolversTypes['CircleDirection'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfEnabledTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfEnabledTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfEnabledTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['EnabledType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfFactorTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfFactorTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfFactorTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['FactorType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfFeedRateModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfFeedRateModeAndInt32'] = ResolversParentTypes['KeyValuePairOfFeedRateModeAndInt32']
> = {
  key: Resolver<ResolversTypes['FeedRateMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type KeyValuePairOfMachineCoolantStateAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfMachineCoolantStateAndInt32'] = ResolversParentTypes['KeyValuePairOfMachineCoolantStateAndInt32']
> = {
  key: Resolver<ResolversTypes['MachineCoolantState'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfMachineMotionTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfMachineMotionTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfMachineMotionTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['MachineMotionType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfMachineOverridesModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfMachineOverridesModeAndInt32'] = ResolversParentTypes['KeyValuePairOfMachineOverridesModeAndInt32']
> = {
  key: Resolver<ResolversTypes['MachineOverridesMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfMachineProgramStateAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfMachineProgramStateAndInt32'] = ResolversParentTypes['KeyValuePairOfMachineProgramStateAndInt32']
> = {
  key: Resolver<ResolversTypes['MachineProgramState'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfMovementDistanceTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfMovementDistanceTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfMovementDistanceTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['MovementDistanceType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfPathControlModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfPathControlModeAndInt32'] = ResolversParentTypes['KeyValuePairOfPathControlModeAndInt32']
> = {
  key: Resolver<ResolversTypes['PathControlMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfSpindleSpeedModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfSpindleSpeedModeAndInt32'] = ResolversParentTypes['KeyValuePairOfSpindleSpeedModeAndInt32']
> = {
  key: Resolver<ResolversTypes['SpindleSpeedMode'], ParentType, ContextType>;
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

export type KeyValuePairOfTimingModeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfTimingModeAndInt32'] = ResolversParentTypes['KeyValuePairOfTimingModeAndInt32']
> = {
  key: Resolver<ResolversTypes['TimingMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyValuePairOfUnitTypeAndInt32Resolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['KeyValuePairOfUnitTypeAndInt32'] = ResolversParentTypes['KeyValuePairOfUnitTypeAndInt32']
> = {
  key: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
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
  coolant: Resolver<ResolversTypes['ModalSettingOfMachineCoolantState'], ParentType, ContextType>;
  feedRate: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  isOn: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lengthOffset: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  lengthOffsetFactorType: Resolver<ResolversTypes['ModalSettingOfFactorType'], ParentType, ContextType>;
  probePosition: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  radiusCompensation: Resolver<ResolversTypes['ModalSettingOfApplicatorRadiusCompensation'], ParentType, ContextType>;
  spinDirection: Resolver<ResolversTypes['ModalSettingOfCircleDirection'], ParentType, ContextType>;
  spinSpeed: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  temperature: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  toolId: Resolver<ResolversTypes['FirmwareSettingOfString'], ParentType, ContextType>;
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
  canReceive: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastInstructionResult: Resolver<Maybe<ResolversTypes['MachineInstructionResult']>, ParentType, ContextType>;
  lineNumber: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pendingInstructionResults: Resolver<Array<ResolversTypes['MachineInstructionResult']>, ParentType, ContextType>;
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
  apply: Resolver<Array<ResolversTypes['InstructionStep']>, ParentType, ContextType>;
  instruction: Resolver<ResolversTypes['CompiledInstruction'], ParentType, ContextType>;
  machine: Resolver<ResolversTypes['ControlledMachine'], ParentType, ContextType>;
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

export type MachineModalsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineModals'] = ResolversParentTypes['MachineModals']
> = {
  arcDistance: Resolver<ResolversTypes['ModalSettingOfMovementDistanceType'], ParentType, ContextType>;
  cannedCycleReturnMode: Resolver<ResolversTypes['ModalSettingOfTimingMode'], ParentType, ContextType>;
  cylindricalInterpolation: Resolver<ResolversTypes['ModalSettingOfEnabledType'], ParentType, ContextType>;
  distance: Resolver<ResolversTypes['ModalSettingOfMovementDistanceType'], ParentType, ContextType>;
  feedRate: Resolver<ResolversTypes['ModalSettingOfFeedRateMode'], ParentType, ContextType>;
  motion: Resolver<ResolversTypes['ModalSettingOfMachineMotionType'], ParentType, ContextType>;
  pathControlMode: Resolver<ResolversTypes['ModalSettingOfPathControlMode'], ParentType, ContextType>;
  plane: Resolver<ResolversTypes['ModalSettingOfAxisPlane'], ParentType, ContextType>;
  programState: Resolver<ResolversTypes['ModalSettingOfMachineProgramState'], ParentType, ContextType>;
  settings: Resolver<Array<ResolversTypes['FirmwareSetting']>, ParentType, ContextType>;
  spindleSpeed: Resolver<ResolversTypes['ModalSettingOfSpindleSpeedMode'], ParentType, ContextType>;
  units: Resolver<ResolversTypes['ModalSettingOfUnitType'], ParentType, ContextType>;
  userDefined: Resolver<ResolversTypes['ModalSettingOfDecimal'], ParentType, ContextType>;
  workCoordinateSystem: Resolver<ResolversTypes['ModalSettingOfDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineMovementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineMovement'] = ResolversParentTypes['MachineMovement']
> = {
  a: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  arcDirection: Resolver<Maybe<ResolversTypes['CircleDirection']>, ParentType, ContextType>;
  b: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  c: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  dwell: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  i: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  j: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  k: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  u: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  v: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  w: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  x: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  y: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  z: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
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
  feed: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  mode: Resolver<ResolversTypes['ModalSettingOfMachineOverridesMode'], ParentType, ContextType>;
  rapids: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
  speed: Resolver<ResolversTypes['FirmwareSettingOfDecimal'], ParentType, ContextType>;
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
  u: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  v: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  w: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
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
  overrides: Resolver<ResolversTypes['MachineOverrides'], ParentType, ContextType>;
  workCoordinateOffset: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  workPosition: Resolver<Maybe<ResolversTypes['MachinePosition']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineTimelineNodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineTimelineNode'] = ResolversParentTypes['MachineTimelineNode']
> = {
  logEntries: Resolver<Array<ResolversTypes['MachineLogEntry']>, ParentType, ContextType>;
  logLevel: Resolver<ResolversTypes['MachineLogLevel'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineTimelineNodeConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineTimelineNodeConnection'] = ResolversParentTypes['MachineTimelineNodeConnection']
> = {
  edges: Resolver<Maybe<Array<ResolversTypes['MachineTimelineNodeEdge']>>, ParentType, ContextType>;
  nodes: Resolver<Maybe<Array<ResolversTypes['MachineTimelineNode']>>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MachineTimelineNodeEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MachineTimelineNodeEdge'] = ResolversParentTypes['MachineTimelineNodeEdge']
> = {
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['MachineTimelineNode'], ParentType, ContextType>;
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

export type ModalOptionOfApplicatorRadiusCompensationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfApplicatorRadiusCompensation'] = ResolversParentTypes['ModalOptionOfApplicatorRadiusCompensation']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['ApplicatorRadiusCompensation'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfAxisPlaneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfAxisPlane'] = ResolversParentTypes['ModalOptionOfAxisPlane']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['AxisPlane'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfCircleDirectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfCircleDirection'] = ResolversParentTypes['ModalOptionOfCircleDirection']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['CircleDirection'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfDecimal'] = ResolversParentTypes['ModalOptionOfDecimal']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfEnabledTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfEnabledType'] = ResolversParentTypes['ModalOptionOfEnabledType']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['EnabledType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfFactorTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfFactorType'] = ResolversParentTypes['ModalOptionOfFactorType']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['FactorType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfFeedRateModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfFeedRateMode'] = ResolversParentTypes['ModalOptionOfFeedRateMode']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['FeedRateMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfMachineCoolantStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfMachineCoolantState'] = ResolversParentTypes['ModalOptionOfMachineCoolantState']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineCoolantState'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfMachineMotionTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfMachineMotionType'] = ResolversParentTypes['ModalOptionOfMachineMotionType']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineMotionType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfMachineOverridesModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfMachineOverridesMode'] = ResolversParentTypes['ModalOptionOfMachineOverridesMode']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineOverridesMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfMachineProgramStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfMachineProgramState'] = ResolversParentTypes['ModalOptionOfMachineProgramState']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineProgramState'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfMovementDistanceTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfMovementDistanceType'] = ResolversParentTypes['ModalOptionOfMovementDistanceType']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['MovementDistanceType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfPathControlModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfPathControlMode'] = ResolversParentTypes['ModalOptionOfPathControlMode']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['PathControlMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfSpindleSpeedModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfSpindleSpeedMode'] = ResolversParentTypes['ModalOptionOfSpindleSpeedMode']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['SpindleSpeedMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfTimingModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfTimingMode'] = ResolversParentTypes['ModalOptionOfTimingMode']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['TimingMode'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalOptionOfUnitTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalOptionOfUnitType'] = ResolversParentTypes['ModalOptionOfUnitType']
> = {
  code: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfApplicatorRadiusCompensationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfApplicatorRadiusCompensation'] = ResolversParentTypes['ModalSettingOfApplicatorRadiusCompensation']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['ApplicatorRadiusCompensation'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfApplicatorRadiusCompensationMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfApplicatorRadiusCompensation']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfAxisPlaneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfAxisPlane'] = ResolversParentTypes['ModalSettingOfAxisPlane']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['AxisPlane'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfAxisPlaneMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfAxisPlane']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfCircleDirectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfCircleDirection'] = ResolversParentTypes['ModalSettingOfCircleDirection']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['CircleDirection'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfCircleDirectionMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfCircleDirection']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfDecimal'] = ResolversParentTypes['ModalSettingOfDecimal']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfDecimalMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfDecimal']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfEnabledTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfEnabledType'] = ResolversParentTypes['ModalSettingOfEnabledType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['EnabledType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfEnabledTypeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfEnabledType']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfFactorTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfFactorType'] = ResolversParentTypes['ModalSettingOfFactorType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['FactorType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfFactorTypeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfFactorType']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfFeedRateModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfFeedRateMode'] = ResolversParentTypes['ModalSettingOfFeedRateMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['FeedRateMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfFeedRateModeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfFeedRateMode']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfMachineCoolantStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfMachineCoolantState'] = ResolversParentTypes['ModalSettingOfMachineCoolantState']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineCoolantState'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfMachineCoolantStateMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfMachineCoolantState']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfMachineMotionTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfMachineMotionType'] = ResolversParentTypes['ModalSettingOfMachineMotionType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineMotionType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfMachineMotionTypeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfMachineMotionType']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfMachineOverridesModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfMachineOverridesMode'] = ResolversParentTypes['ModalSettingOfMachineOverridesMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineOverridesMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfMachineOverridesModeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfMachineOverridesMode']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfMachineProgramStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfMachineProgramState'] = ResolversParentTypes['ModalSettingOfMachineProgramState']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['MachineProgramState'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfMachineProgramStateMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfMachineProgramState']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfMovementDistanceTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfMovementDistanceType'] = ResolversParentTypes['ModalSettingOfMovementDistanceType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['MovementDistanceType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfMovementDistanceTypeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfMovementDistanceType']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfPathControlModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfPathControlMode'] = ResolversParentTypes['ModalSettingOfPathControlMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['PathControlMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfPathControlModeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfPathControlMode']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfSpindleSpeedModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfSpindleSpeedMode'] = ResolversParentTypes['ModalSettingOfSpindleSpeedMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['SpindleSpeedMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfSpindleSpeedModeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfSpindleSpeedMode']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfTimingModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfTimingMode'] = ResolversParentTypes['ModalSettingOfTimingMode']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['TimingMode'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfTimingModeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfTimingMode']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ModalSettingOfUnitTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ModalSettingOfUnitType'] = ResolversParentTypes['ModalSettingOfUnitType']
> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentValue: Resolver<Maybe<ResolversTypes['IParsedValue']>, ParentType, ContextType>;
  data: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
  hasBeenRead: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  key: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutation: Resolver<
    ResolversTypes['InstructionStep'],
    ParentType,
    ContextType,
    RequireFields<ModalSettingOfUnitTypeMutationArgs, 'value'>
  >;
  options: Resolver<Array<ResolversTypes['ModalOptionOfUnitType']>, ParentType, ContextType>;
  settingType: Resolver<ResolversTypes['MachineSettingType'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  units: Resolver<ResolversTypes['MachineSettingUnits'], ParentType, ContextType>;
  value: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  loadProgram: Resolver<
    ResolversTypes['ProgramFile'],
    ParentType,
    ContextType,
    RequireFields<MutationLoadProgramArgs, 'name'>
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
  selectProgramFile: Resolver<
    ResolversTypes['ProgramFileMeta'],
    ParentType,
    ContextType,
    RequireFields<MutationSelectProgramFileArgs, 'fileUpload'>
  >;
  updateWorkspace: Resolver<
    ResolversTypes['Workspace'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateWorkspaceArgs, 'workspaceSettings'>
  >;
  uploadProgramFile: Resolver<
    ResolversTypes['ProgramFile'],
    ParentType,
    ContextType,
    RequireFields<MutationUploadProgramFileArgs, 'fileUpload'>
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
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedBoolResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedBool'] = ResolversParentTypes['ParsedBool']
> = {
  valueBool: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedDecimalResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedDecimal'] = ResolversParentTypes['ParsedDecimal']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueDecimal: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfApplicatorRadiusCompensationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfApplicatorRadiusCompensation'] = ResolversParentTypes['ParsedEnumOfApplicatorRadiusCompensation']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['ApplicatorRadiusCompensation'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<
    Array<ResolversTypes['KeyValuePairOfApplicatorRadiusCompensationAndInt32']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfAxisPlaneResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfAxisPlane'] = ResolversParentTypes['ParsedEnumOfAxisPlane']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['AxisPlane'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfAxisPlaneAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfCircleDirectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfCircleDirection'] = ResolversParentTypes['ParsedEnumOfCircleDirection']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['CircleDirection'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfCircleDirectionAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfEnabledTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfEnabledType'] = ResolversParentTypes['ParsedEnumOfEnabledType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['EnabledType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfEnabledTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfFactorTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfFactorType'] = ResolversParentTypes['ParsedEnumOfFactorType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['FactorType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfFactorTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfFeedRateModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfFeedRateMode'] = ResolversParentTypes['ParsedEnumOfFeedRateMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['FeedRateMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfFeedRateModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfKinematicsModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfKinematicsMode'] = ResolversParentTypes['ParsedEnumOfKinematicsMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['KinematicsMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfKinematicsModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfMachineCoolantStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfMachineCoolantState'] = ResolversParentTypes['ParsedEnumOfMachineCoolantState']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['MachineCoolantState'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfMachineCoolantStateAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfMachineMotionTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfMachineMotionType'] = ResolversParentTypes['ParsedEnumOfMachineMotionType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['MachineMotionType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfMachineMotionTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfMachineOverridesModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfMachineOverridesMode'] = ResolversParentTypes['ParsedEnumOfMachineOverridesMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['MachineOverridesMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfMachineOverridesModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfMachineProgramStateResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfMachineProgramState'] = ResolversParentTypes['ParsedEnumOfMachineProgramState']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['MachineProgramState'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfMachineProgramStateAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfMovementDistanceTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfMovementDistanceType'] = ResolversParentTypes['ParsedEnumOfMovementDistanceType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['MovementDistanceType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfMovementDistanceTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfPathControlModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfPathControlMode'] = ResolversParentTypes['ParsedEnumOfPathControlMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['PathControlMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfPathControlModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfSpindleSpeedModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfSpindleSpeedMode'] = ResolversParentTypes['ParsedEnumOfSpindleSpeedMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['SpindleSpeedMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfSpindleSpeedModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfStatusReportTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfStatusReportType'] = ResolversParentTypes['ParsedEnumOfStatusReportType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['StatusReportType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfStatusReportTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfTimingModeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfTimingMode'] = ResolversParentTypes['ParsedEnumOfTimingMode']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['TimingMode'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfTimingModeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedEnumOfUnitTypeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedEnumOfUnitType'] = ResolversParentTypes['ParsedEnumOfUnitType']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  valueEnum: Resolver<ResolversTypes['UnitType'], ParentType, ContextType>;
  valueString: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Array<ResolversTypes['KeyValuePairOfUnitTypeAndInt32']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParsedStringResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ParsedString'] = ResolversParentTypes['ParsedString']
> = {
  valueCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type ProgramExecutorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramExecutor'] = ResolversParentTypes['ProgramExecutor']
> = {
  currentInstruction: Resolver<Maybe<ResolversTypes['ProgramInstruction']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instructionCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instructionIndex: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instructions: Resolver<
    Maybe<ResolversTypes['ProgramInstructionConnection']>,
    ParentType,
    ContextType,
    RequireFields<ProgramExecutorInstructionsArgs, never>
  >;
  programFile: Resolver<ResolversTypes['ProgramFile'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['ExecutionState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFile'] = ResolversParentTypes['ProgramFile']
> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instructionCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  instructions: Resolver<Array<ResolversTypes['CompiledInstruction']>, ParentType, ContextType>;
  lineCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lines: Resolver<Array<ResolversTypes['CompiledInstruction']>, ParentType, ContextType>;
  meta: Resolver<ResolversTypes['ProgramFileMeta'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileDirectoryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFileDirectory'] = ResolversParentTypes['ProgramFileDirectory']
> = {
  fileExtensions: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  programFileMetas: Resolver<Array<ResolversTypes['ProgramFileMeta']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileMetaResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFileMeta'] = ResolversParentTypes['ProgramFileMeta']
> = {
  data: Resolver<Maybe<ResolversTypes['ProgramFileMetaData']>, ParentType, ContextType>;
  directory: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fileExists: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  filePath: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModified: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size: Resolver<ResolversTypes['Long'], ParentType, ContextType>;
  syntax: Resolver<ResolversTypes['ProgramSyntax'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileMetaDataResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFileMetaData'] = ResolversParentTypes['ProgramFileMetaData']
> = {
  revisions: Resolver<Array<ResolversTypes['ProgramFileRevision']>, ParentType, ContextType>;
  tags: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramFileRevisionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramFileRevision'] = ResolversParentTypes['ProgramFileRevision']
> = {
  checksum: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramInstructionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramInstruction'] = ResolversParentTypes['ProgramInstruction']
> = {
  compiledInstruction: Resolver<ResolversTypes['CompiledInstruction'], ParentType, ContextType>;
  index: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  steps: Resolver<Array<ResolversTypes['InstructionStep']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramInstructionConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramInstructionConnection'] = ResolversParentTypes['ProgramInstructionConnection']
> = {
  edges: Resolver<Maybe<Array<ResolversTypes['ProgramInstructionEdge']>>, ParentType, ContextType>;
  nodes: Resolver<Maybe<Array<ResolversTypes['ProgramInstruction']>>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgramInstructionEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ProgramInstructionEdge'] = ResolversParentTypes['ProgramInstructionEdge']
> = {
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['ProgramInstruction'], ParentType, ContextType>;
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
  programDirectory: Resolver<ResolversTypes['ProgramFileDirectory'], ParentType, ContextType>;
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
  onMachineProgram: SubscriptionResolver<
    ResolversTypes['ControlledMachine'],
    'onMachineProgram',
    ParentType,
    ContextType,
    RequireFields<SubscriptionOnMachineProgramArgs, 'portName'>
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

export type SyntaxLineResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SyntaxLine'] = ResolversParentTypes['SyntaxLine']
> = {
  chunks: Resolver<Array<ResolversTypes['SyntaxChunk']>, ParentType, ContextType>;
  hasCode: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isValid: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  raw: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  FirmwareSettingOfString: FirmwareSettingOfStringResolvers<ContextType>;
  FirmwareSettings: FirmwareSettingsResolvers<ContextType>;
  InstructionStep: InstructionStepResolvers<ContextType>;
  KeyValuePairOfApplicatorRadiusCompensationAndInt32: KeyValuePairOfApplicatorRadiusCompensationAndInt32Resolvers<ContextType>;
  KeyValuePairOfAxisPlaneAndInt32: KeyValuePairOfAxisPlaneAndInt32Resolvers<ContextType>;
  KeyValuePairOfCircleDirectionAndInt32: KeyValuePairOfCircleDirectionAndInt32Resolvers<ContextType>;
  KeyValuePairOfEnabledTypeAndInt32: KeyValuePairOfEnabledTypeAndInt32Resolvers<ContextType>;
  KeyValuePairOfFactorTypeAndInt32: KeyValuePairOfFactorTypeAndInt32Resolvers<ContextType>;
  KeyValuePairOfFeedRateModeAndInt32: KeyValuePairOfFeedRateModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfKinematicsModeAndInt32: KeyValuePairOfKinematicsModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfMachineCoolantStateAndInt32: KeyValuePairOfMachineCoolantStateAndInt32Resolvers<ContextType>;
  KeyValuePairOfMachineMotionTypeAndInt32: KeyValuePairOfMachineMotionTypeAndInt32Resolvers<ContextType>;
  KeyValuePairOfMachineOverridesModeAndInt32: KeyValuePairOfMachineOverridesModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfMachineProgramStateAndInt32: KeyValuePairOfMachineProgramStateAndInt32Resolvers<ContextType>;
  KeyValuePairOfMovementDistanceTypeAndInt32: KeyValuePairOfMovementDistanceTypeAndInt32Resolvers<ContextType>;
  KeyValuePairOfPathControlModeAndInt32: KeyValuePairOfPathControlModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfSpindleSpeedModeAndInt32: KeyValuePairOfSpindleSpeedModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfStatusReportTypeAndInt32: KeyValuePairOfStatusReportTypeAndInt32Resolvers<ContextType>;
  KeyValuePairOfTimingModeAndInt32: KeyValuePairOfTimingModeAndInt32Resolvers<ContextType>;
  KeyValuePairOfUnitTypeAndInt32: KeyValuePairOfUnitTypeAndInt32Resolvers<ContextType>;
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
  MachineModals: MachineModalsResolvers<ContextType>;
  MachineMovement: MachineMovementResolvers<ContextType>;
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
  MachineTimelineNode: MachineTimelineNodeResolvers<ContextType>;
  MachineTimelineNodeConnection: MachineTimelineNodeConnectionResolvers<ContextType>;
  MachineTimelineNodeEdge: MachineTimelineNodeEdgeResolvers<ContextType>;
  MacroSettings: MacroSettingsResolvers<ContextType>;
  MakerHubSettings: MakerHubSettingsResolvers<ContextType>;
  ModalOptionOfApplicatorRadiusCompensation: ModalOptionOfApplicatorRadiusCompensationResolvers<ContextType>;
  ModalOptionOfAxisPlane: ModalOptionOfAxisPlaneResolvers<ContextType>;
  ModalOptionOfCircleDirection: ModalOptionOfCircleDirectionResolvers<ContextType>;
  ModalOptionOfDecimal: ModalOptionOfDecimalResolvers<ContextType>;
  ModalOptionOfEnabledType: ModalOptionOfEnabledTypeResolvers<ContextType>;
  ModalOptionOfFactorType: ModalOptionOfFactorTypeResolvers<ContextType>;
  ModalOptionOfFeedRateMode: ModalOptionOfFeedRateModeResolvers<ContextType>;
  ModalOptionOfMachineCoolantState: ModalOptionOfMachineCoolantStateResolvers<ContextType>;
  ModalOptionOfMachineMotionType: ModalOptionOfMachineMotionTypeResolvers<ContextType>;
  ModalOptionOfMachineOverridesMode: ModalOptionOfMachineOverridesModeResolvers<ContextType>;
  ModalOptionOfMachineProgramState: ModalOptionOfMachineProgramStateResolvers<ContextType>;
  ModalOptionOfMovementDistanceType: ModalOptionOfMovementDistanceTypeResolvers<ContextType>;
  ModalOptionOfPathControlMode: ModalOptionOfPathControlModeResolvers<ContextType>;
  ModalOptionOfSpindleSpeedMode: ModalOptionOfSpindleSpeedModeResolvers<ContextType>;
  ModalOptionOfTimingMode: ModalOptionOfTimingModeResolvers<ContextType>;
  ModalOptionOfUnitType: ModalOptionOfUnitTypeResolvers<ContextType>;
  ModalSettingOfApplicatorRadiusCompensation: ModalSettingOfApplicatorRadiusCompensationResolvers<ContextType>;
  ModalSettingOfAxisPlane: ModalSettingOfAxisPlaneResolvers<ContextType>;
  ModalSettingOfCircleDirection: ModalSettingOfCircleDirectionResolvers<ContextType>;
  ModalSettingOfDecimal: ModalSettingOfDecimalResolvers<ContextType>;
  ModalSettingOfEnabledType: ModalSettingOfEnabledTypeResolvers<ContextType>;
  ModalSettingOfFactorType: ModalSettingOfFactorTypeResolvers<ContextType>;
  ModalSettingOfFeedRateMode: ModalSettingOfFeedRateModeResolvers<ContextType>;
  ModalSettingOfMachineCoolantState: ModalSettingOfMachineCoolantStateResolvers<ContextType>;
  ModalSettingOfMachineMotionType: ModalSettingOfMachineMotionTypeResolvers<ContextType>;
  ModalSettingOfMachineOverridesMode: ModalSettingOfMachineOverridesModeResolvers<ContextType>;
  ModalSettingOfMachineProgramState: ModalSettingOfMachineProgramStateResolvers<ContextType>;
  ModalSettingOfMovementDistanceType: ModalSettingOfMovementDistanceTypeResolvers<ContextType>;
  ModalSettingOfPathControlMode: ModalSettingOfPathControlModeResolvers<ContextType>;
  ModalSettingOfSpindleSpeedMode: ModalSettingOfSpindleSpeedModeResolvers<ContextType>;
  ModalSettingOfTimingMode: ModalSettingOfTimingModeResolvers<ContextType>;
  ModalSettingOfUnitType: ModalSettingOfUnitTypeResolvers<ContextType>;
  MountPointSettings: MountPointSettingsResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  OpenControllerSession: OpenControllerSessionResolvers<ContextType>;
  OpenControllerSettings: OpenControllerSettingsResolvers<ContextType>;
  OpenControllerUser: OpenControllerUserResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  ParsedAxisFlags: ParsedAxisFlagsResolvers<ContextType>;
  ParsedBool: ParsedBoolResolvers<ContextType>;
  ParsedDecimal: ParsedDecimalResolvers<ContextType>;
  ParsedEnumOfApplicatorRadiusCompensation: ParsedEnumOfApplicatorRadiusCompensationResolvers<ContextType>;
  ParsedEnumOfAxisPlane: ParsedEnumOfAxisPlaneResolvers<ContextType>;
  ParsedEnumOfCircleDirection: ParsedEnumOfCircleDirectionResolvers<ContextType>;
  ParsedEnumOfEnabledType: ParsedEnumOfEnabledTypeResolvers<ContextType>;
  ParsedEnumOfFactorType: ParsedEnumOfFactorTypeResolvers<ContextType>;
  ParsedEnumOfFeedRateMode: ParsedEnumOfFeedRateModeResolvers<ContextType>;
  ParsedEnumOfKinematicsMode: ParsedEnumOfKinematicsModeResolvers<ContextType>;
  ParsedEnumOfMachineCoolantState: ParsedEnumOfMachineCoolantStateResolvers<ContextType>;
  ParsedEnumOfMachineMotionType: ParsedEnumOfMachineMotionTypeResolvers<ContextType>;
  ParsedEnumOfMachineOverridesMode: ParsedEnumOfMachineOverridesModeResolvers<ContextType>;
  ParsedEnumOfMachineProgramState: ParsedEnumOfMachineProgramStateResolvers<ContextType>;
  ParsedEnumOfMovementDistanceType: ParsedEnumOfMovementDistanceTypeResolvers<ContextType>;
  ParsedEnumOfPathControlMode: ParsedEnumOfPathControlModeResolvers<ContextType>;
  ParsedEnumOfSpindleSpeedMode: ParsedEnumOfSpindleSpeedModeResolvers<ContextType>;
  ParsedEnumOfStatusReportType: ParsedEnumOfStatusReportTypeResolvers<ContextType>;
  ParsedEnumOfTimingMode: ParsedEnumOfTimingModeResolvers<ContextType>;
  ParsedEnumOfUnitType: ParsedEnumOfUnitTypeResolvers<ContextType>;
  ParsedString: ParsedStringResolvers<ContextType>;
  PortOptions: PortOptionsResolvers<ContextType>;
  PortStatus: PortStatusResolvers<ContextType>;
  ProgramExecutor: ProgramExecutorResolvers<ContextType>;
  ProgramFile: ProgramFileResolvers<ContextType>;
  ProgramFileDirectory: ProgramFileDirectoryResolvers<ContextType>;
  ProgramFileMeta: ProgramFileMetaResolvers<ContextType>;
  ProgramFileMetaData: ProgramFileMetaDataResolvers<ContextType>;
  ProgramFileRevision: ProgramFileRevisionResolvers<ContextType>;
  ProgramInstruction: ProgramInstructionResolvers<ContextType>;
  ProgramInstructionConnection: ProgramInstructionConnectionResolvers<ContextType>;
  ProgramInstructionEdge: ProgramInstructionEdgeResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  SyntaxChunk: SyntaxChunkResolvers<ContextType>;
  SyntaxLine: SyntaxLineResolvers<ContextType>;
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

export type SetModalSettingsMutationVariables = Exact<{
  workspaceId: Scalars['String'];
  change: ModalChangeInput;
}>;

export type SetModalSettingsMutation = { __typename?: 'Mutation' } & {
  controller: { __typename?: 'Controller' } & Pick<Controller, 'id'> & {
      result: { __typename?: 'MachineExecutionResult' } & MachineExecutionResultFragment;
    };
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
    program: Maybe<{ __typename?: 'ProgramExecutor' } & ProgramExecutorFragment>;
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
  'x' | 'y' | 'z' | 'a' | 'b' | 'c' | 'u' | 'v' | 'w'
>;

export type MachineAxisPropsFragment = { __typename?: 'MachineAxis' } & Pick<
  MachineAxis,
  'id' | 'name' | 'min' | 'max' | 'accuracy' | 'precision'
>;

export type MachineCommandPropsFragment = { __typename?: 'MachineCommand' } & Pick<
  MachineCommand,
  'id' | 'name' | 'value'
>;

export type MachineModalsFragment = { __typename?: 'MachineModals' } & {
  motion: { __typename?: 'ModalSettingOfMachineMotionType' } & Pick<
    ModalSettingOfMachineMotionType,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfMachineMotionType' } & Pick<ModalOptionOfMachineMotionType, 'code' | 'value'>
      >;
    };
  plane: { __typename?: 'ModalSettingOfAxisPlane' } & Pick<
    ModalSettingOfAxisPlane,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & { options: Array<{ __typename?: 'ModalOptionOfAxisPlane' } & Pick<ModalOptionOfAxisPlane, 'code' | 'value'>> };
  distance: { __typename?: 'ModalSettingOfMovementDistanceType' } & Pick<
    ModalSettingOfMovementDistanceType,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfMovementDistanceType' } & Pick<ModalOptionOfMovementDistanceType, 'code' | 'value'>
      >;
    };
  arcDistance: { __typename?: 'ModalSettingOfMovementDistanceType' } & Pick<
    ModalSettingOfMovementDistanceType,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfMovementDistanceType' } & Pick<ModalOptionOfMovementDistanceType, 'code' | 'value'>
      >;
    };
  feedRate: { __typename?: 'ModalSettingOfFeedRateMode' } & Pick<
    ModalSettingOfFeedRateMode,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<{ __typename?: 'ModalOptionOfFeedRateMode' } & Pick<ModalOptionOfFeedRateMode, 'code' | 'value'>>;
    };
  units: { __typename?: 'ModalSettingOfUnitType' } & Pick<
    ModalSettingOfUnitType,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & { options: Array<{ __typename?: 'ModalOptionOfUnitType' } & Pick<ModalOptionOfUnitType, 'code' | 'value'>> };
  cannedCycleReturnMode: { __typename?: 'ModalSettingOfTimingMode' } & Pick<
    ModalSettingOfTimingMode,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & { options: Array<{ __typename?: 'ModalOptionOfTimingMode' } & Pick<ModalOptionOfTimingMode, 'code' | 'value'>> };
  pathControlMode: { __typename?: 'ModalSettingOfPathControlMode' } & Pick<
    ModalSettingOfPathControlMode,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfPathControlMode' } & Pick<ModalOptionOfPathControlMode, 'code' | 'value'>
      >;
    };
  spindleSpeed: { __typename?: 'ModalSettingOfSpindleSpeedMode' } & Pick<
    ModalSettingOfSpindleSpeedMode,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfSpindleSpeedMode' } & Pick<ModalOptionOfSpindleSpeedMode, 'code' | 'value'>
      >;
    };
  cylindricalInterpolation: { __typename?: 'ModalSettingOfEnabledType' } & Pick<
    ModalSettingOfEnabledType,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<{ __typename?: 'ModalOptionOfEnabledType' } & Pick<ModalOptionOfEnabledType, 'code' | 'value'>>;
    };
  programState: { __typename?: 'ModalSettingOfMachineProgramState' } & Pick<
    ModalSettingOfMachineProgramState,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfMachineProgramState' } & Pick<ModalOptionOfMachineProgramState, 'code' | 'value'>
      >;
    };
  userDefined: { __typename?: 'ModalSettingOfDecimal' } & Pick<
    ModalSettingOfDecimal,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & { options: Array<{ __typename?: 'ModalOptionOfDecimal' } & Pick<ModalOptionOfDecimal, 'code' | 'value'>> };
  workCoordinateSystem: { __typename?: 'ModalSettingOfDecimal' } & Pick<
    ModalSettingOfDecimal,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & { options: Array<{ __typename?: 'ModalOptionOfDecimal' } & Pick<ModalOptionOfDecimal, 'code' | 'value'>> };
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

export type MachineTimelineNodeConnectionFragment = { __typename?: 'MachineTimelineNodeConnection' } & {
  edges: Maybe<
    Array<
      { __typename?: 'MachineTimelineNodeEdge' } & Pick<MachineTimelineNodeEdge, 'cursor'> & {
          node: { __typename?: 'MachineTimelineNode' } & MachineTimelineNodeFragment;
        }
    >
  >;
  nodes: Maybe<Array<{ __typename?: 'MachineTimelineNode' } & MachineTimelineNodeFragment>>;
  pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment;
};

export type PageInfoFragment = { __typename?: 'PageInfo' } & Pick<
  PageInfo,
  'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
>;

export type MachineTimelineNodeFragment = { __typename?: 'MachineTimelineNode' } & Pick<
  MachineTimelineNode,
  'logLevel'
> & { logEntries: Array<{ __typename?: 'MachineLogEntry' } & MachineLogEntryFragment> };

export type MachineLogEntryFragment = { __typename?: 'MachineLogEntry' } & Pick<
  MachineLogEntry,
  'id' | 'timestamp' | 'count' | 'message' | 'logLevel' | 'source' | 'writeState'
> & {
    error: Maybe<{ __typename?: 'MachineAlert' } & MachineAlertFragment>;
    code: Array<{ __typename?: 'SyntaxChunk' } & SyntaxChunkFragment>;
  };

export type MachineLogsFragment = { __typename?: 'ControlledMachine' } & {
  logs: Maybe<{ __typename?: 'MachineLogEntryConnection' } & MachineLogEntryConnectionFragment>;
  timeline: Maybe<{ __typename?: 'MachineTimelineNodeConnection' } & MachineTimelineNodeConnectionFragment>;
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
      | { __typename?: 'ParsedEnumOfApplicatorRadiusCompensation' }
      | { __typename?: 'ParsedEnumOfAxisPlane' }
      | { __typename?: 'ParsedEnumOfCircleDirection' }
      | { __typename?: 'ParsedEnumOfEnabledType' }
      | { __typename?: 'ParsedEnumOfFactorType' }
      | { __typename?: 'ParsedEnumOfFeedRateMode' }
      | ({ __typename?: 'ParsedEnumOfKinematicsMode' } & {
          valueKinematicsMode: ParsedEnumOfKinematicsMode['valueEnum'];
        })
      | { __typename?: 'ParsedEnumOfMachineCoolantState' }
      | { __typename?: 'ParsedEnumOfMachineMotionType' }
      | { __typename?: 'ParsedEnumOfMachineOverridesMode' }
      | { __typename?: 'ParsedEnumOfMachineProgramState' }
      | { __typename?: 'ParsedEnumOfMovementDistanceType' }
      | { __typename?: 'ParsedEnumOfPathControlMode' }
      | { __typename?: 'ParsedEnumOfSpindleSpeedMode' }
      | ({ __typename?: 'ParsedEnumOfStatusReportType' } & {
          valueStatusReportType: ParsedEnumOfStatusReportType['valueEnum'];
        })
      | { __typename?: 'ParsedEnumOfTimingMode' }
      | { __typename?: 'ParsedEnumOfUnitType' }
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
> & {
    lastInstructionResult: Maybe<{ __typename?: 'MachineInstructionResult' } & MachineInstructionResultFragment>;
    pendingInstructionResults: Array<{ __typename?: 'MachineInstructionResult' } & MachineInstructionResultFragment>;
  };

export type ApplicatorStateFragment = { __typename?: 'MachineApplicatorState' } & Pick<
  MachineApplicatorState,
  'isOn'
> & {
    toolId: { __typename?: 'FirmwareSettingOfString' } & Pick<
      FirmwareSettingOfString,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    >;
    spinDirection: { __typename?: 'ModalSettingOfCircleDirection' } & Pick<
      ModalSettingOfCircleDirection,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    >;
    spinSpeed: { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
      FirmwareSettingOfDecimal,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    >;
    feedRate: { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
      FirmwareSettingOfDecimal,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    >;
    lengthOffset: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
    lengthOffsetFactorType: { __typename?: 'ModalSettingOfFactorType' } & Pick<
      ModalSettingOfFactorType,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    > & {
        options: Array<{ __typename?: 'ModalOptionOfFactorType' } & Pick<ModalOptionOfFactorType, 'code' | 'value'>>;
      };
    radiusCompensation: { __typename?: 'ModalSettingOfApplicatorRadiusCompensation' } & Pick<
      ModalSettingOfApplicatorRadiusCompensation,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    > & {
        options: Array<
          { __typename?: 'ModalOptionOfApplicatorRadiusCompensation' } & Pick<
            ModalOptionOfApplicatorRadiusCompensation,
            'code' | 'value'
          >
        >;
      };
    probePosition: Maybe<{ __typename?: 'MachinePosition' } & MachinePositionFragment>;
    coolant: { __typename?: 'ModalSettingOfMachineCoolantState' } & Pick<
      ModalSettingOfMachineCoolantState,
      'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
    > & {
        options: Array<
          { __typename?: 'ModalOptionOfMachineCoolantState' } & Pick<ModalOptionOfMachineCoolantState, 'code' | 'value'>
        >;
      };
  };

export type MachineOverridesFragment = { __typename?: 'MachineOverrides' } & {
  feed: { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
    FirmwareSettingOfDecimal,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  >;
  mode: { __typename?: 'ModalSettingOfMachineOverridesMode' } & Pick<
    ModalSettingOfMachineOverridesMode,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  > & {
      options: Array<
        { __typename?: 'ModalOptionOfMachineOverridesMode' } & Pick<ModalOptionOfMachineOverridesMode, 'code' | 'value'>
      >;
    };
  rapids: { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
    FirmwareSettingOfDecimal,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  >;
  speed: { __typename?: 'FirmwareSettingOfDecimal' } & Pick<
    FirmwareSettingOfDecimal,
    'id' | 'title' | 'value' | 'data' | 'hasBeenRead'
  >;
};

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
    overrides: { __typename?: 'MachineOverrides' } & MachineOverridesFragment;
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

export type MachineMovementFragment = { __typename?: 'MachineMovement' } & Pick<
  MachineMovement,
  'x' | 'y' | 'z' | 'a' | 'b' | 'c' | 'u' | 'v' | 'w' | 'i' | 'j' | 'k' | 'dwell'
>;

export type InstructionStepFragment = { __typename?: 'InstructionStep' } & Pick<
  InstructionStep,
  'name' | 'settingValue'
> & { movement: Maybe<{ __typename?: 'MachineMovement' } & MachineMovementFragment> };

export type ProgramInstructionFragment = { __typename?: 'ProgramInstruction' } & {
  steps: Array<{ __typename?: 'InstructionStep' } & InstructionStepFragment>;
};

export type ProgramFileRevisionFragment = { __typename?: 'ProgramFileRevision' } & Pick<
  ProgramFileRevision,
  'id' | 'username' | 'createdAt'
>;

export type ProgramFileMetaDataFragment = { __typename?: 'ProgramFileMetaData' } & Pick<ProgramFileMetaData, 'tags'> & {
    revisions: Array<{ __typename?: 'ProgramFileRevision' } & ProgramFileRevisionFragment>;
  };

export type ProgramFileMetaFragment = { __typename?: 'ProgramFileMeta' } & Pick<
  ProgramFileMeta,
  'name' | 'lastModified' | 'size' | 'type' | 'directory' | 'syntax' | 'fileExists' | 'filePath'
> & { data: Maybe<{ __typename?: 'ProgramFileMetaData' } & ProgramFileMetaDataFragment> };

export type ProgramFileFragment = { __typename?: 'ProgramFile' } & Pick<
  ProgramFile,
  'id' | 'instructionCount' | 'lineCount'
> & { meta: { __typename?: 'ProgramFileMeta' } & ProgramFileMetaFragment };

export type ProgramExecutorFragment = { __typename?: 'ProgramExecutor' } & Pick<
  ProgramExecutor,
  'id' | 'state' | 'instructionIndex' | 'instructionCount'
> & {
    instructions: Maybe<
      { __typename?: 'ProgramInstructionConnection' } & {
        pageInfo: { __typename?: 'PageInfo' } & PageInfoFragment;
        nodes: Maybe<Array<{ __typename?: 'ProgramInstruction' } & ProgramInstructionFragment>>;
      }
    >;
    programFile: { __typename?: 'ProgramFile' } & ProgramFileFragment;
  };

export type ProgramFileDirectoryFragment = { __typename?: 'ProgramFileDirectory' } & Pick<
  ProgramFileDirectory,
  'path' | 'fileExtensions'
> & { programFileMetas: Array<{ __typename?: 'ProgramFileMeta' } & ProgramFileMetaFragment> };

export type SelectProgramFileMutationVariables = Exact<{
  fileUpload: ClientFileUploadInput;
}>;

export type SelectProgramFileMutation = { __typename?: 'Mutation' } & {
  programFileMeta: { __typename?: 'ProgramFileMeta' } & ProgramFileMetaFragment;
};

export type UploadProgramFileMutationVariables = Exact<{
  fileUpload: ProgramFileUploadInput;
}>;

export type UploadProgramFileMutation = { __typename?: 'Mutation' } & {
  programFile: { __typename?: 'ProgramFile' } & ProgramFileFragment;
};

export type ProgramDirectoryQueryVariables = Exact<{ [key: string]: never }>;

export type ProgramDirectoryQuery = { __typename?: 'Query' } & {
  programFileDirectory: { __typename?: 'ProgramFileDirectory' } & ProgramFileDirectoryFragment;
};

export type LoadProgramMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type LoadProgramMutation = { __typename?: 'Mutation' } & {
  programFile: { __typename?: 'ProgramFile' } & ProgramFileFragment;
};

export type MachineProgramSubscriptionVariables = Exact<{
  portName: Scalars['String'];
}>;

export type MachineProgramSubscription = { __typename?: 'Subscription' } & {
  machine: { __typename?: 'ControlledMachine' } & Pick<ControlledMachine, 'topicId'> & {
      program: Maybe<{ __typename?: 'ProgramExecutor' } & ProgramExecutorFragment>;
    };
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

export type WorkspaceFullFragment = { __typename?: 'Workspace' } & Pick<Workspace, 'id' | 'portName' | 'state'> & {
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
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    plane {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    distance {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    arcDistance {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    feedRate {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    units {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    cannedCycleReturnMode {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    pathControlMode {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    spindleSpeed {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    cylindricalInterpolation {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    programState {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    userDefined {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    workCoordinateSystem {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
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
    u
    v
    w
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
    lastInstructionResult {
      ...MachineInstructionResult
    }
    pendingInstructionResults {
      ...MachineInstructionResult
    }
  }
  ${MachineInstructionResultFragmentDoc}
`;
export const ApplicatorStateFragmentDoc = gql`
  fragment ApplicatorState on MachineApplicatorState {
    isOn
    toolId {
      id
      title
      value
      data
      hasBeenRead
    }
    spinDirection {
      id
      title
      value
      data
      hasBeenRead
    }
    spinSpeed {
      id
      title
      value
      data
      hasBeenRead
    }
    feedRate {
      id
      title
      value
      data
      hasBeenRead
    }
    lengthOffset {
      ...MachinePosition
    }
    lengthOffsetFactorType {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    radiusCompensation {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    probePosition {
      ...MachinePosition
    }
    coolant {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
  }
  ${MachinePositionFragmentDoc}
`;
export const MachineOverridesFragmentDoc = gql`
  fragment MachineOverrides on MachineOverrides {
    feed {
      id
      title
      value
      data
      hasBeenRead
    }
    mode {
      id
      title
      value
      data
      hasBeenRead
      options {
        code
        value
      }
    }
    rapids {
      id
      title
      value
      data
      hasBeenRead
    }
    speed {
      id
      title
      value
      data
      hasBeenRead
    }
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
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`;
export const MachineMovementFragmentDoc = gql`
  fragment MachineMovement on MachineMovement {
    x
    y
    z
    a
    b
    c
    u
    v
    w
    i
    j
    k
    dwell
  }
`;
export const InstructionStepFragmentDoc = gql`
  fragment InstructionStep on InstructionStep {
    name
    settingValue
    movement {
      ...MachineMovement
    }
  }
  ${MachineMovementFragmentDoc}
`;
export const ProgramInstructionFragmentDoc = gql`
  fragment ProgramInstruction on ProgramInstruction {
    steps {
      ...InstructionStep
    }
  }
  ${InstructionStepFragmentDoc}
`;
export const ProgramFileRevisionFragmentDoc = gql`
  fragment ProgramFileRevision on ProgramFileRevision {
    id
    username
    createdAt
  }
`;
export const ProgramFileMetaDataFragmentDoc = gql`
  fragment ProgramFileMetaData on ProgramFileMetaData {
    tags
    revisions {
      ...ProgramFileRevision
    }
  }
  ${ProgramFileRevisionFragmentDoc}
`;
export const ProgramFileMetaFragmentDoc = gql`
  fragment ProgramFileMeta on ProgramFileMeta {
    name
    lastModified
    size
    type
    directory
    syntax
    fileExists
    filePath
    data {
      ...ProgramFileMetaData
    }
  }
  ${ProgramFileMetaDataFragmentDoc}
`;
export const ProgramFileFragmentDoc = gql`
  fragment ProgramFile on ProgramFile {
    id
    instructionCount
    lineCount
    meta {
      ...ProgramFileMeta
    }
  }
  ${ProgramFileMetaFragmentDoc}
`;
export const ProgramExecutorFragmentDoc = gql`
  fragment ProgramExecutor on ProgramExecutor {
    id
    state
    instructionIndex
    instructionCount
    instructions(first: 50) {
      pageInfo {
        ...PageInfo
      }
      nodes {
        ...ProgramInstruction
      }
    }
    programFile {
      ...ProgramFile
    }
  }
  ${PageInfoFragmentDoc}
  ${ProgramInstructionFragmentDoc}
  ${ProgramFileFragmentDoc}
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
export const MachineTimelineNodeFragmentDoc = gql`
  fragment MachineTimelineNode on MachineTimelineNode {
    logLevel
    logEntries {
      ...MachineLogEntry
    }
  }
  ${MachineLogEntryFragmentDoc}
`;
export const MachineTimelineNodeConnectionFragmentDoc = gql`
  fragment MachineTimelineNodeConnection on MachineTimelineNodeConnection {
    edges {
      cursor
      node {
        ...MachineTimelineNode
      }
    }
    nodes {
      ...MachineTimelineNode
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${MachineTimelineNodeFragmentDoc}
  ${PageInfoFragmentDoc}
`;
export const MachineLogsFragmentDoc = gql`
  fragment MachineLogs on ControlledMachine {
    logs(first: 50, order: { timestamp: DESC }) {
      ...MachineLogEntryConnection
    }
    timeline(first: 50) {
      ...MachineTimelineNodeConnection
    }
  }
  ${MachineLogEntryConnectionFragmentDoc}
  ${MachineTimelineNodeConnectionFragmentDoc}
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
    program {
      ...ProgramExecutor
    }
    ...MachineLogs
  }
  ${MachineConfigFragmentDoc}
  ${MachineStatusFragmentDoc}
  ${FirmwareSettingsTypedFragmentDoc}
  ${ProgramExecutorFragmentDoc}
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
export const ProgramFileDirectoryFragmentDoc = gql`
  fragment ProgramFileDirectory on ProgramFileDirectory {
    path
    fileExtensions
    programFileMetas {
      ...ProgramFileMeta
    }
  }
  ${ProgramFileMetaFragmentDoc}
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
export const SetModalSettingsDocument = gql`
  mutation SetModalSettings($workspaceId: String!, $change: ModalChangeInput!) {
    controller: controlMachine(workspaceId: $workspaceId) {
      id
      result: setModal(change: $change) {
        ...MachineExecutionResult
      }
    }
  }
  ${MachineExecutionResultFragmentDoc}
`;
export type SetModalSettingsMutationFn = Apollo.MutationFunction<
  SetModalSettingsMutation,
  SetModalSettingsMutationVariables
>;

/**
 * __useSetModalSettingsMutation__
 *
 * To run a mutation, you first call `useSetModalSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetModalSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setModalSettingsMutation, { data, loading, error }] = useSetModalSettingsMutation({
 *   variables: {
 *      workspaceId: // value for 'workspaceId'
 *      change: // value for 'change'
 *   },
 * });
 */
export function useSetModalSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<SetModalSettingsMutation, SetModalSettingsMutationVariables>,
) {
  return Apollo.useMutation<SetModalSettingsMutation, SetModalSettingsMutationVariables>(
    SetModalSettingsDocument,
    baseOptions,
  );
}
export type SetModalSettingsMutationHookResult = ReturnType<typeof useSetModalSettingsMutation>;
export type SetModalSettingsMutationResult = Apollo.MutationResult<SetModalSettingsMutation>;
export type SetModalSettingsMutationOptions = Apollo.BaseMutationOptions<
  SetModalSettingsMutation,
  SetModalSettingsMutationVariables
>;
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
export const SelectProgramFileDocument = gql`
  mutation SelectProgramFile($fileUpload: ClientFileUploadInput!) {
    programFileMeta: selectProgramFile(fileUpload: $fileUpload) {
      ...ProgramFileMeta
    }
  }
  ${ProgramFileMetaFragmentDoc}
`;
export type SelectProgramFileMutationFn = Apollo.MutationFunction<
  SelectProgramFileMutation,
  SelectProgramFileMutationVariables
>;

/**
 * __useSelectProgramFileMutation__
 *
 * To run a mutation, you first call `useSelectProgramFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectProgramFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectProgramFileMutation, { data, loading, error }] = useSelectProgramFileMutation({
 *   variables: {
 *      fileUpload: // value for 'fileUpload'
 *   },
 * });
 */
export function useSelectProgramFileMutation(
  baseOptions?: Apollo.MutationHookOptions<SelectProgramFileMutation, SelectProgramFileMutationVariables>,
) {
  return Apollo.useMutation<SelectProgramFileMutation, SelectProgramFileMutationVariables>(
    SelectProgramFileDocument,
    baseOptions,
  );
}
export type SelectProgramFileMutationHookResult = ReturnType<typeof useSelectProgramFileMutation>;
export type SelectProgramFileMutationResult = Apollo.MutationResult<SelectProgramFileMutation>;
export type SelectProgramFileMutationOptions = Apollo.BaseMutationOptions<
  SelectProgramFileMutation,
  SelectProgramFileMutationVariables
>;
export const UploadProgramFileDocument = gql`
  mutation UploadProgramFile($fileUpload: ProgramFileUploadInput!) {
    programFile: uploadProgramFile(fileUpload: $fileUpload) {
      ...ProgramFile
    }
  }
  ${ProgramFileFragmentDoc}
`;
export type UploadProgramFileMutationFn = Apollo.MutationFunction<
  UploadProgramFileMutation,
  UploadProgramFileMutationVariables
>;

/**
 * __useUploadProgramFileMutation__
 *
 * To run a mutation, you first call `useUploadProgramFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProgramFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProgramFileMutation, { data, loading, error }] = useUploadProgramFileMutation({
 *   variables: {
 *      fileUpload: // value for 'fileUpload'
 *   },
 * });
 */
export function useUploadProgramFileMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadProgramFileMutation, UploadProgramFileMutationVariables>,
) {
  return Apollo.useMutation<UploadProgramFileMutation, UploadProgramFileMutationVariables>(
    UploadProgramFileDocument,
    baseOptions,
  );
}
export type UploadProgramFileMutationHookResult = ReturnType<typeof useUploadProgramFileMutation>;
export type UploadProgramFileMutationResult = Apollo.MutationResult<UploadProgramFileMutation>;
export type UploadProgramFileMutationOptions = Apollo.BaseMutationOptions<
  UploadProgramFileMutation,
  UploadProgramFileMutationVariables
>;
export const ProgramDirectoryDocument = gql`
  query ProgramDirectory {
    programFileDirectory: programDirectory {
      ...ProgramFileDirectory
    }
  }
  ${ProgramFileDirectoryFragmentDoc}
`;

/**
 * __useProgramDirectoryQuery__
 *
 * To run a query within a React component, call `useProgramDirectoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramDirectoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramDirectoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useProgramDirectoryQuery(
  baseOptions?: Apollo.QueryHookOptions<ProgramDirectoryQuery, ProgramDirectoryQueryVariables>,
) {
  return Apollo.useQuery<ProgramDirectoryQuery, ProgramDirectoryQueryVariables>(ProgramDirectoryDocument, baseOptions);
}
export function useProgramDirectoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProgramDirectoryQuery, ProgramDirectoryQueryVariables>,
) {
  return Apollo.useLazyQuery<ProgramDirectoryQuery, ProgramDirectoryQueryVariables>(
    ProgramDirectoryDocument,
    baseOptions,
  );
}
export type ProgramDirectoryQueryHookResult = ReturnType<typeof useProgramDirectoryQuery>;
export type ProgramDirectoryLazyQueryHookResult = ReturnType<typeof useProgramDirectoryLazyQuery>;
export type ProgramDirectoryQueryResult = Apollo.QueryResult<ProgramDirectoryQuery, ProgramDirectoryQueryVariables>;
export const LoadProgramDocument = gql`
  mutation LoadProgram($name: String!) {
    programFile: loadProgram(name: $name) {
      ...ProgramFile
    }
  }
  ${ProgramFileFragmentDoc}
`;
export type LoadProgramMutationFn = Apollo.MutationFunction<LoadProgramMutation, LoadProgramMutationVariables>;

/**
 * __useLoadProgramMutation__
 *
 * To run a mutation, you first call `useLoadProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoadProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loadProgramMutation, { data, loading, error }] = useLoadProgramMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLoadProgramMutation(
  baseOptions?: Apollo.MutationHookOptions<LoadProgramMutation, LoadProgramMutationVariables>,
) {
  return Apollo.useMutation<LoadProgramMutation, LoadProgramMutationVariables>(LoadProgramDocument, baseOptions);
}
export type LoadProgramMutationHookResult = ReturnType<typeof useLoadProgramMutation>;
export type LoadProgramMutationResult = Apollo.MutationResult<LoadProgramMutation>;
export type LoadProgramMutationOptions = Apollo.BaseMutationOptions<LoadProgramMutation, LoadProgramMutationVariables>;
export const MachineProgramDocument = gql`
  subscription MachineProgram($portName: String!) {
    machine: onMachineProgram(portName: $portName) {
      topicId
      program {
        ...ProgramExecutor
      }
    }
  }
  ${ProgramExecutorFragmentDoc}
`;

/**
 * __useMachineProgramSubscription__
 *
 * To run a query within a React component, call `useMachineProgramSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMachineProgramSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMachineProgramSubscription({
 *   variables: {
 *      portName: // value for 'portName'
 *   },
 * });
 */
export function useMachineProgramSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<MachineProgramSubscription, MachineProgramSubscriptionVariables>,
) {
  return Apollo.useSubscription<MachineProgramSubscription, MachineProgramSubscriptionVariables>(
    MachineProgramDocument,
    baseOptions,
  );
}
export type MachineProgramSubscriptionHookResult = ReturnType<typeof useMachineProgramSubscription>;
export type MachineProgramSubscriptionResult = Apollo.SubscriptionResult<MachineProgramSubscription>;
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
