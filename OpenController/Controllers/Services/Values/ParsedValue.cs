using System;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public interface IParsedValue {
    public object? ValueObject { get; }

    // Might be enum name instead of the numeric value
    public string ValueString { get; }

    // Appropriate for setting the value.
    public string ValueCode { get; }
  }

  /// <summary>
  /// Interface makes firmware settings values generic.
  /// </summary>
  public abstract class ParsedValue : IParsedValue, IEquatable<ParsedValue> {
    public abstract object? ValueObject { get; }

    public abstract string ValueString { get; }

    public virtual string ValueCode => ValueString;

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
}
