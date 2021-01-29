using System;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  /// <summary>
  /// Leaf node in the firmware settings tree. Maps to a single line of machine output.
  /// </summary>
  public abstract class FirmwareSetting : MachineSetting {
    internal bool HasValue => _value != null;

    // Comment reported by status line
    public string? Comment { get; internal set; }

    /// <summary>
    /// Throws parsing exceptions!
    /// Subclass must implement the SetValue abstract so that this method may convert the raw string type.
    /// </summary>
    public override string Value {
      get => _value ?? "";
      internal set {
        SetCurrentValue(value);
        _value = value;
      }
    }

    // Must always return non-null, so before it's loaded, returns empty.
    public override string Key {
      get => _key ?? "";
      internal set => _key = value;
    }

    protected abstract void SetCurrentValue(string value);

    private string? _key = null;
    private string? _value = null;

    public override string ToString() => $"{Key}={Value}";
  }

  /// <summary>
  /// Generic implementation of the base class. Converts Value (string) into `TData CurrentValue` property.
  /// </summary>
  /// <typeparam name="TData">Data type of the underlying property.</typeparam>
  public class FirmwareSetting<TData> : FirmwareSetting {
    public TData CurrentValue { get; internal set; }

    // Used before the setting is parsed from the controller.
    public TData DefaultVaule { get; }

    public FirmwareSetting(TData defaultValue) {
      DefaultVaule = defaultValue;
      CurrentValue = defaultValue;
    }

    protected override void SetCurrentValue(string value) {
      CurrentValue = ParseValue(value);
    }

    private TData ParseValue(string value) {
      Type t = typeof(TData);
      decimal.TryParse(value, out decimal dVal);
      int iVal = (int) dVal;
      object obj = value;
      if (t == typeof(KinematicsMode)) {
        obj = (KinematicsMode) iVal;
      }
      if (t == typeof(bool)) {
        obj = iVal == 0 ? "false" : "true";
      }
      if (t == typeof(StatusReportType)) {
        obj = (StatusReportType) iVal;
      }
      if (t == typeof(FirmwareAxisFlags)) {
        // Bit-flag mask.
        obj = new FirmwareAxisFlags() {
          X = (iVal & (1 << 0)) != 0,
          Y = (iVal & (1 << 1)) != 0,
          Z = (iVal & (1 << 2)) != 0,
        };
      }
      return (TData) Convert.ChangeType(obj, typeof(TData));;
    }
  }
}
