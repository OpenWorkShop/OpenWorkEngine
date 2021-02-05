using System;
using System.Collections.Generic;
using System.Globalization;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class FirmwareComparisonNode<TData> : IEquatable<FirmwareComparisonNode<TData>> {
    public TData? RequiredValue { get; }

    public TData? DetectedValue { get; internal set; }

    public bool HasDetectedValue => DetectedValue != null;

    public bool MeetsRequirement => HasDetectedValue && CheckRequirement();

    private bool CheckRequirement() {
      Type t = typeof(TData);
      if (t == typeof(string)) {
        return !(RequiredValue is string rs) || (DetectedValue is string dv && dv.EqualsInvariantIgnoreCase(rs));
      } else if (t == typeof(decimal)) {
        return !(RequiredValue is decimal rdv) || (DetectedValue is decimal dv && dv >= rdv);
      } else {
        throw new ArgumentException($"Invalid comparison node type {t}");
      }
    }

    public bool Equals(FirmwareComparisonNode<TData>? other) {
      if (ReferenceEquals(null, other)) return false;
      if (ReferenceEquals(this, other)) return true;
      return EqualityComparer<TData?>.Default.Equals(DetectedValue, other.DetectedValue);
    }

    public override bool Equals(object? obj) {
      if (ReferenceEquals(null, obj)) return false;
      if (ReferenceEquals(this, obj)) return true;
      if (obj.GetType() != this.GetType()) return false;
      return Equals((FirmwareComparisonNode<TData>) obj);
    }

    public override int GetHashCode() => EqualityComparer<TData?>.Default.GetHashCode(DetectedValue);

    public override string ToString() => $"[REQ] {RequiredValue} => {DetectedValue} [{MeetsRequirement}]";
  }
}
