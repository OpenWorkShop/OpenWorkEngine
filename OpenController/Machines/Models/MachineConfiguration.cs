using System.Collections.Generic;
using System.Linq;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///   Semi-persistent values, which change infrequently, such as modal groups. This class can grow as-needed.
  ///   C# 9.0 records are used to determine when configuration change occurs.
  ///   https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9
  /// </summary>
  public record MachineConfiguration {
    // n.b., the FirmwareRequirement is compared against this value.
    public MachineDetectedFirmware Firmware { get; } = new();

    // Mostly matches GCode Modal Groups.
    public MachineModals Modals { get; } = new();

    public MachinePosition WorkOffset { get; internal set; } = new();

    public MachineOptions? Options { get; internal set; } = null;

    public List<MachinePosition> WorkCoordinates { get; } = new(); // G54-G59

    public MachinePosition[] ReferencePosition { get; } = new[] {
      new MachinePosition(), // G28
      new MachinePosition(), // G30
    };

    internal void SetWorkCoordinatePosition(int idx, MachinePosition p) {
      Log.Debug("[SET] [WC] {i} to {p}", idx, p);
      while (WorkCoordinates.Count <= idx) WorkCoordinates.Add(new MachinePosition());
      WorkCoordinates[idx] = p;
    }

    public override int GetHashCode() {
      // ReSharper disable once NonReadonlyMemberInGetHashCode
      long hc = Firmware.GetHashCode() + Modals.GetHashCode() +
        (Options?.GetHashCode() ?? 0) + WorkOffset.GetHashCode() +
        WorkCoordinates.Sum(wc => (long)wc.GetHashCode()) + ReferencePosition.Sum(rp => (long)rp.GetHashCode());
      return (int) (hc % int.MaxValue);
    }
  }
}
