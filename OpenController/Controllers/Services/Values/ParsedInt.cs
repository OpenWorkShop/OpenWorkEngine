using System.Globalization;
using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedIntType : ObjectType<ParsedInt> { }

  public class ParsedInt : ParsedValue {
    public decimal ValueInt { get; }

    public ParsedInt(int valueInt = 0) {
      ValueInt = valueInt;
    }

    public override object? ValueObject => ValueInt;

    public override string ValueString => ValueInt.ToString(CultureInfo.InvariantCulture);

    internal override ParsedValue Parse(string val) => new ParsedDecimal(decimal.Parse(val));
  }
}
