using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedStringType : ObjectType<ParsedString> { }

  public class ParsedString : ParsedValue {
    public override string ValueString { get; }

    public ParsedString(string valueString = "") {
      ValueString = valueString;
    }

    public override object? ValueObject => ValueString;

    internal override ParsedValue Parse(string val) => new ParsedString(val);
  }
}
