using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Values;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {

  public record SelectOption(string ItemId, string Name);

  public class FirmwareSettingType : ObjectType<FirmwareSetting> {
    protected override void Configure(IObjectTypeDescriptor<FirmwareSetting> descriptor) {
      base.Configure(descriptor);
      descriptor.Field(m => m.CurrentValue).Type<FirmwareSettingValueType>();
      descriptor.Field(m => m.DefaultValue).Type<FirmwareSettingValueType>();
    }
  }

  /// <summary>
  /// Leaf node in the firmware settings tree. Maps to a single line of machine output.
  /// </summary>
  public abstract class FirmwareSetting : IMachineSetting {
    public string Id { get; internal set; } = "";
    public string? Title { get; internal set; }
    public MachineSettingType SettingType => MachineSettingType.Grbl;
    public MachineSettingUnits Units { get; internal init; }
    public bool HasBeenRead => _value != null;

    internal bool IsDirty { get; set; }

    internal virtual string GetValueKey(string value) => Key;

    public int Index {
      get => _index;
      internal set {
        if (_index != value) IsDirty = true;
        _index = value;
      }
    }
    private int _index = 0;

    // Comment reported by status line
    public string? Comment {
      get => _comment;
      set {
        if (_comment == null || !_comment.Equals(value)) IsDirty = true;
        _comment = value;
      }
    }

    private string? _comment;

    public IParsedValue? CurrentValue { get; private set; }

    internal ParsedValue DefaultValue { get; private init; } = null!;

    public object? Object => CurrentValue?.ValueObject ?? DefaultValue.ValueObject;

    internal ParsedValue ParseValue(string value) => DefaultValue.Parse(value);

    /// <summary>
    /// Throws parsing exceptions!
    /// Subclass must implement the SetValue abstract so that this method may convert the raw string type.
    /// </summary>
    public string Value {
      get => _value ?? "";
      internal set {
        CurrentValue = ParseValue(value);
        // Don't assign the string directly. Rather, let the parser interpret the shape of the string
        // so that it may be correctly written to the serial port later, if needed.
        if (_value == null || !_value.Equals(CurrentValue.ValueString)) IsDirty = true;
        _value = CurrentValue.ValueString;
      }
    }

    public string ValueCode => CurrentValue?.ValueCode ?? "";

    // Must always return non-null, so before it's loaded, returns empty.
    public string Key {
      get => _key ?? "";
      internal set {
        if (_key == null || !_key.Equals(value)) IsDirty = true;
        _key = value;
      }
    }

    private string? _key = null;
    private string? _value = null;

    public override string ToString() => $"{Key}={ValueCode}";

    internal static FirmwareSetting<TData> Define<TData>(
      TData defaultValue, MachineSettingUnits units = MachineSettingUnits.Unknown
    ) {
      ParsedValue? val = null;
      if (defaultValue is decimal d) val = new ParsedDecimal(d);
      else if (defaultValue is bool b) val = new ParsedBool(b);
      else if (defaultValue is int i) val = new ParsedInt(i);
      else if (defaultValue is string s) val = new ParsedString(s);
      else if (defaultValue is AxisFlags f) val = new ParsedAxisFlags(f);
      else if (defaultValue is StatusReportType srt) val = new ParsedEnum<StatusReportType>(srt);
      else if (defaultValue is KinematicsMode km) val = new ParsedEnum<KinematicsMode>(km);
      else if (defaultValue is MachineMotionType mmt) val = new ParsedEnum<MachineMotionType>(mmt);
      else if (defaultValue is MovementDistanceType mdt) val = new ParsedEnum<MovementDistanceType>(mdt);
      else if (defaultValue is AxisPlane ap) val = new ParsedEnum<AxisPlane>(ap);
      else if (defaultValue is FeedRateMode fr) val = new ParsedEnum<FeedRateMode>(fr);
      else if (defaultValue is UnitType ut) val = new ParsedEnum<UnitType>(ut);
      else if (defaultValue is TimingMode tm) val = new ParsedEnum<TimingMode>(tm);
      else if (defaultValue is PathControlMode pcm) val = new ParsedEnum<PathControlMode>(pcm);
      else if (defaultValue is SpindleSpeedMode spm) val = new ParsedEnum<SpindleSpeedMode>(spm);
      else if (defaultValue is EnabledType et) val = new ParsedEnum<EnabledType>(et);
      else if (defaultValue is MachineProgramState mps) val = new ParsedEnum<MachineProgramState>(mps);
      else if (defaultValue is ApplicatorRadiusCompensation a) val = new ParsedEnum<ApplicatorRadiusCompensation>(a);
      else if (defaultValue is ApplicatorSpinDirection spn) val = new ParsedEnum<ApplicatorSpinDirection>(spn);
      else if (defaultValue is FactorType ft) val = new ParsedEnum<FactorType>(ft);
      else if (defaultValue is MachineCoolantState cool) val = new ParsedEnum<MachineCoolantState>(cool);
      else if (defaultValue is MachineOverridesMode orm) val = new ParsedEnum<MachineOverridesMode>(orm);
      else {
        Log.Error("Invalid FirmwareSetting {type} {value}", defaultValue?.GetType(), defaultValue);
      }
      return new () {
        DefaultValue = val ?? new ParsedString(defaultValue?.ToString() ?? ""),
        Units = units,
      };
    }

    internal static ModalSetting<TData> Modal<TData>(
      TData defaultValue, MachineSettingUnits units = MachineSettingUnits.Unknown
    ) {
      FirmwareSetting setting = Define(defaultValue, units);
      return new ModalSetting<TData>() {DefaultValue = setting.DefaultValue, Units = setting.Units};
    }
  }

  public class FirmwareSettingValueType : UnionType<IParsedValue> {
    protected override void Configure(IUnionTypeDescriptor descriptor) {
      base.Configure(descriptor);
      descriptor.Type<ParsedDecimalType>();
      descriptor.Type<ParsedStringType>();
      descriptor.Type<ParsedBoolType>();
      descriptor.Type<ParsedAxisFlagsType>();
      descriptor.Type<ParsedEnumType<StatusReportType>>();
      descriptor.Type<ParsedEnumType<KinematicsMode>>();
      descriptor.Type<ParsedEnumType<MachineMotionType>>();
      descriptor.Type<ParsedEnumType<MovementDistanceType>>();
      descriptor.Type<ParsedEnumType<AxisPlane>>();
      descriptor.Type<ParsedEnumType<FeedRateMode>>();
      descriptor.Type<ParsedEnumType<UnitType>>();
      descriptor.Type<ParsedEnumType<TimingMode>>();
      descriptor.Type<ParsedEnumType<PathControlMode>>();
      descriptor.Type<ParsedEnumType<SpindleSpeedMode>>();
      descriptor.Type<ParsedEnumType<EnabledType>>();
      descriptor.Type<ParsedEnumType<MachineProgramState>>();
      descriptor.Type<ParsedEnumType<ApplicatorRadiusCompensation>>();
      descriptor.Type<ParsedEnumType<ApplicatorSpinDirection>>();
      descriptor.Type<ParsedEnumType<FactorType>>();
      descriptor.Type<ParsedEnumType<MachineCoolantState>>();
      descriptor.Type<ParsedEnumType<MachineOverridesMode>>();
    }
  }

  public class FirmwareSetting<TData> : FirmwareSetting {
    public TData Data {
      get => Object is TData data ? data : default!;
      set => Value = value?.ToString() ?? throw new ArgumentException("Cannot un-set.");
    }

    public InstructionStep GetMutation(TData value) {
      // if (value == null) return null;
      // if (Data != null && value.Equals(Data)) return null;
      return new InstructionStep(this, value?.ToString() ?? "");
    }
  }

  //
  //
  // public class ModalOption<TData> {
  //   public TData Data { get; internal set; }
  //
  //   public string Code { get; }
  //
  //   public string Name { get; }
  // }

  public record ModalOption<TData>(string Code, TData Data) {
    public string Value => Data?.ToString() ?? "";

    internal FirmwareSettingDefinition SettingDefinition { get; init; }
  }

  public class ModalSetting<TData> : FirmwareSetting<TData> {
    public List<ModalOption<TData>> Options { get; internal set; } = new();

    internal override string GetValueKey(string value) => Options.First(o => o.Value.Equals(value)).Code;
  }
}
