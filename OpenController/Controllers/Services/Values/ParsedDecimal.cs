using System.Globalization;
using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedDecimalType : ObjectType<ParsedDecimal> { }

  public class ParsedDecimal : ParsedValue {
    public decimal ValueDecimal { get; }

    public ParsedDecimal(decimal valueDecimal = 0) {
      ValueDecimal = valueDecimal;
    }

    public override object? ValueObject => ValueDecimal;

    public override string ValueString => ValueDecimal.ToString(CultureInfo.InvariantCulture);

    internal override ParsedValue Parse(string val) => new ParsedDecimal(decimal.Parse(val));
  }
}
