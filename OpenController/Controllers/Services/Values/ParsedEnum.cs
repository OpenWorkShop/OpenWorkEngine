using System;
using System.Collections.Generic;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Services.Values {
  public class ParsedEnum<TEnum> : ParsedValue where TEnum : struct, IComparable {

    public TEnum ValueEnum { get;  }

    public override object? ValueObject => ValueEnum;

    public override string ValueString => ValueEnum.ToString() ?? "";

    public override string ValueCode => Values[ValueEnum].ToString();

    public Dictionary<TEnum, int> Values => _values ??= LoadValues();

    private Dictionary<TEnum, int>? _values;

    public ParsedEnum(TEnum? val) {
      if (!typeof(TEnum).IsEnum) throw new ArgumentException($"Not an enum: {typeof(TEnum)}");
      if (val.HasValue) ValueEnum = val.Value;
    }

    private Dictionary<TEnum, int> LoadValues() {
      Dictionary<TEnum, int> ret = new Dictionary<TEnum, int>();
      foreach (TEnum obj in Enum.GetValues(typeof(TEnum))) {
        string? val = obj.ToString();
        if (val == null) continue;
        Enum? test = Enum.Parse(typeof(TEnum), val) as Enum;
        if (test == null) continue;
        int x = Convert.ToInt32(test); // x is the integer value of enum
        ret.Add(obj, x);
      }
      return ret;
    }

    internal override ParsedValue Parse(string val) {
      return new ParsedEnum<TEnum>((TEnum)Enum.Parse(typeof(TEnum), val));
    }
  }

  public class ParsedEnumType<TEnum> : ObjectType<ParsedEnum<TEnum>> where TEnum : struct, IComparable { }
}
