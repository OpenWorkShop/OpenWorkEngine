using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineMovement : MachinePosition {
    public CircleDirection? ArcDirection { get; set; } = null;

    public decimal? I { get; set; }

    public decimal? J { get; set; }

    public decimal? K { get; set; }

    public decimal? Dwell { get; set; }

    private List<decimal?> CoordinateValues => base.Values.Concat(new List<decimal?>() { I, J, K }).ToList();

    private bool HasCoordinate => CoordinateValues.Any(v => v.HasValue);

    protected override List<decimal?> Values => CoordinateValues.Concat(new List<decimal?>() { Dwell }).ToList();

    // If there is no ArcDirection, it's a pause/dwell. In that case, there should be no coord.
    internal override bool IsValid =>
      (ArcDirection == null && !HasCoordinate && Dwell.HasValue) ||
      (ArcDirection != null && HasCoordinate && !Dwell.HasValue);

    public override string ToString() =>
      string.Join(',', ValidValues.Select(v => v.ToString(CultureInfo.InvariantCulture)));
  }
}
