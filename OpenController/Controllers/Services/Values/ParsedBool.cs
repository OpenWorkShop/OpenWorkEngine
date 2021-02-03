using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedBoolType : ObjectType<ParsedBool> { }

  public class ParsedBool : ParsedValue {

    public bool ValueBool { get; }

    public ParsedBool(bool valueBool = false) {
      ValueBool = valueBool;
    }

    public override object? ValueObject => ValueBool;

    public override string ValueString => ValueBool ? "1" : "0";

    internal override ParsedValue Parse(string val) {
      ParsedBool? pb = null;
      if (int.TryParse(val, out int iVal)) {
        pb = new ParsedBool(iVal != 0);
      } else {
        pb = new ParsedBool(bool.Parse(val));
      }
      return pb;
    }
  }
}
