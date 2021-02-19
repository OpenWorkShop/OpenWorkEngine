using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using OpenWorkEngine.OpenController.Lib.Linq;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachinePosition {
    public decimal? X { get; set; }

    public decimal? Y { get; set; }

    public decimal? Z { get; set; }

    public decimal? U { get; set; }

    public decimal? V { get; set; }

    public decimal? W { get; set; }

    public decimal? A { get; set; }

    public decimal? B { get; set; }

    public decimal? C { get; set; }

    // public decimal? E { get; set; }

    // public bool IsValid => X != null || Y != null || Z != null;

    internal virtual bool IsValid => HasValue;

    protected virtual List<decimal?> Values => new List<decimal?>() { A, B, C, U, V, W, X, Y, Z };

    protected List<decimal> ValidValues => Values.Where(v => v.HasValue).Select(v => v!.Value).ToList();

    internal bool HasValue => Values.Any(v => v.HasValue);

    public override string ToString() =>
      string.Join(',', ValidValues.Select(v => v.ToString(CultureInfo.InvariantCulture)));
  }
}
