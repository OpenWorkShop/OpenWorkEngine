namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///   Semi-persistent values, which change infrequently, such as modal groups. This class can grow as-needed.
  ///   C# 9.0 records are used to determine when configuration change occurs.
  ///   https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9
  /// </summary>
  public record MachineConfiguration {
    // n.b., the FirmwareRequirement is compared against this value.
    public MachineDetectedFirmware Firmware { get; } = new();

    // n.b., the MachineApplicatorStsate reperesents *actual, current* sate. This is the "target" state.
    public ApplicatorConfig Applicator { get; } = new();

    // Mostly matches GCode Modal Groups.
    public MachineModals Modals { get; } = new();

    // public override string ToString() => $"{Firmware}";
  }
}
