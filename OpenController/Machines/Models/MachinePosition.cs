namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachinePosition {
    // All machines must have an X axis (?)
    public decimal X { get; internal set; } = 0;

    public decimal? Y { get; internal set; }

    public decimal? Z { get; internal set; }

    public decimal? E { get; internal set; }
  }
}
