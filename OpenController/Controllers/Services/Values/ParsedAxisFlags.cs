using HotChocolate.Types;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedAxisFlagsType : ObjectType<ParsedAxisFlags> { }

  public class ParsedAxisFlags : ParsedValue {

    public AxisFlags ValueAxisFlags { get; }

    public ParsedAxisFlags(AxisFlags? flags = null) {
      ValueAxisFlags = flags ?? new();
    }

    public override object? ValueObject => ValueAxisFlags;

    public override string ValueString => ValueAxisFlags.ToMask().ToString();

    internal override ParsedValue Parse(string val) {
      int iVal = int.Parse(val);
      AxisFlags flags = new AxisFlags() {
        X = (iVal & (1 << 0)) != 0,
        Y = (iVal & (1 << 1)) != 0,
        Z = (iVal & (1 << 2)) != 0,
      };
      return new ParsedAxisFlags(flags);
    }
  }
}
