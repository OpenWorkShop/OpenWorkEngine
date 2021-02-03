using System.Collections.Generic;
using OpenWorkEngine.OpenController.Lib.Linq;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachinePosition {
    public decimal? X { get; set; }

    public decimal? Y { get; set; }

    public decimal? Z { get; set; }

    public decimal? A { get; set; }

    public decimal? B { get; set; }

    public decimal? C { get; set; }

    // public decimal? E { get; set; }

    // public bool IsValid => X != null || Y != null || Z != null;

    public override string ToString() => string.Join(',', (new List<string?>() {
      X?.ToString(), Y?.ToString(), Z?.ToString(), A?.ToString(), B?.ToString(), C?.ToString()
    }).SelectNonNull());
  }
}
