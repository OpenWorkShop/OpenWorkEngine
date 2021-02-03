using System;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public interface IParsedValue {
    public object? ValueObject { get; }

    // Appropriate for setting the value.
    public string ValueString { get; }
  }

  /// <summary>
  /// Interface makes firmware settings values generic.
  /// </summary>
  public abstract class ParsedValue : IParsedValue, IEquatable<ParsedValue> {
    public abstract object? ValueObject { get; }

    public abstract string ValueString { get; }

    internal abstract ParsedValue Parse(string val);

    public override string ToString() => ValueObject?.ToString() ?? "null";

    // public TRes Get<TRes>() where TRes : class;
    public bool Equals(ParsedValue? other) {
      if (ReferenceEquals(null, other)) return false;
      if (ReferenceEquals(this, other)) return true;
      return Equals(ValueObject, other.ValueObject);
    }

    public override bool Equals(object? obj) {
      if (ReferenceEquals(null, obj)) return false;
      if (ReferenceEquals(this, obj)) return true;
      if (obj.GetType() != this.GetType()) return false;
      return Equals((ParsedValue) obj);
    }

    public override int GetHashCode() => (ValueObject != null ? ValueObject.GetHashCode() : 0);
  }

  /// <summary>
  /// Contains data read from the SerialPort pertaining to a specific setting.
  /// Wrapped by FirmwareSetting, which bridges the MachineSetting to this "current" value.
  /// </summary>
  // public class FirmwareSettingValue<TData> : FirmwareSettingValue {
  //   public TData Value { get; } = default!;
  //
  //   public override object? ValueObject => Value;
  //
  //   public FirmwareSettingValue(TData value) {
  //     Value = value;
  //   }
  //
  //   public override IFirmwareSettingValue Parse(string value) {
  //     return new FirmwareSettingValue<TData>(ParseValue(value));
  //   }
  //
  //   public override TRes Get<TRes>() where TRes : class => Value is TRes res ? res : default!;
  //
  //   internal TData ParseValue(string value) {
  //     Type t = typeof(TData);
  //     decimal.TryParse(value, out decimal dVal);
  //     int iVal = (int) dVal;
  //     object obj = value;
  //     if (t == typeof(KinematicsMode)) {
  //       obj = (KinematicsMode) iVal;
  //     }
  //     if (t == typeof(bool)) {
  //       obj = iVal == 0 ? "false" : "true";
  //     }
  //     if (t == typeof(StatusReportType)) {
  //       obj = (StatusReportType) iVal;
  //     }
  //     if (t == typeof(FirmwareAxisFlags)) {
  //       // Bit-flag mask.
  //       obj = new FirmwareAxisFlags() {
  //         X = (iVal & (1 << 0)) != 0,
  //         Y = (iVal & (1 << 1)) != 0,
  //         Z = (iVal & (1 << 2)) != 0,
  //       };
  //     }
  //     return (TData) Convert.ChangeType(obj, typeof(TData));;
  //   }
  // }
}
