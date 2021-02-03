namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineOverrides {
    public decimal Feed { get; internal set; } = 100;

    public decimal Rapids { get; internal set; } = 100;

    public decimal Spindle { get; internal set; } = 100;

    public override string ToString() => $"<OV:F{Feed}:R{Rapids}:S{Spindle}>";
  }
}
