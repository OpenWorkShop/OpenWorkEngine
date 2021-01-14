namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineOverrides {
    public decimal Feed { get; internal set; } = 100;

    public decimal Rapids { get; internal set; } = 100;

    public decimal Spindle { get; internal set; } = 100;
  }
}
