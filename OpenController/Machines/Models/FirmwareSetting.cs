using System;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Services.Values;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {
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

    public override string ToString() => $"{Key}={Value}";

    internal static FirmwareSetting<TData> Define<TData>(
      TData defaultValue, MachineSettingUnits units = MachineSettingUnits.Unknown
    ) {
      ParsedValue? val = null;
      if (defaultValue is decimal d) val = new ParsedDecimal(d);
      else if (defaultValue is bool b) val = new ParsedBool(b);
      else if (defaultValue is string s) val = new ParsedString(s);
      else if (defaultValue is AxisFlags f) val = new ParsedAxisFlags(f);
      else if (defaultValue is StatusReportType srt) val = new ParsedEnum<StatusReportType>(srt);
      else if (defaultValue is KinematicsMode km) val = new ParsedEnum<KinematicsMode>(km);
      else {
        Log.Error("Invalid FirmwareSetting {type} {value}", defaultValue?.GetType(), defaultValue);
      }
      return new () {
        DefaultValue = val ?? new ParsedString(defaultValue?.ToString() ?? ""),
        Units = units,
      };
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
    }
  }


  public class FirmwareSetting<TData> : FirmwareSetting {
    public TData Data => Object is TData data ? data :
      throw new ArgumentException($"Invalid setting value: '{Object?.GetType()}' is not a '{typeof(TData)}'");
  }
}
