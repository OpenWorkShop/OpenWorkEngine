using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineMovement : MachinePosition {
    public decimal? I { get; set; }

    public decimal? J { get; set; }

    public decimal? K { get; set; }

    public decimal? Dwell { get; set; }

    protected override List<decimal?> Values => base.Values.Concat(new List<decimal?>() { I, J, K, Dwell }).ToList();

    public override string ToString() =>
      string.Join(',', ValidValues.Select(v => v.ToString(CultureInfo.InvariantCulture)));
  }
}
