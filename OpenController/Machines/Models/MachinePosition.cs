namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachinePosition {
    public decimal? X { get; internal set; }

    public decimal? Y { get; internal set; }

    public decimal? Z { get; internal set; }

    public decimal? A { get; internal set; }

    public decimal? B { get; internal set; }

    public decimal? C { get; internal set; }

    public decimal? E { get; internal set; }

    public bool IsValid => X != null || Y != null || Z != null;
  }
}
