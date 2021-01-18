using System;
using System.Linq;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  /// <summary>
  ///   GCode words (G01, G20, M01, etc.) represent a "Type" of command.
  ///   They are part of a GCodeBlock that represents an instruction line.
  /// </summary>
  public class GCodeWord {
    public string Raw { get; }

    public GCodeLetter Letter { get; }

    public decimal Value { get; }

    public int Major { get; }

    public int Minor { get; }

    public GCodeWord(string wordStr) {
      Raw = wordStr;
      if (wordStr.Length < 2) throw new ArgumentException($"Invalid word length: {wordStr}");

      string lttr = wordStr.Substring(0, 1);
      if (!Enum.TryParse(lttr, out GCodeLetter letter)) throw new ArgumentException($"Invalid GCode '{lttr}' from word {wordStr}");

      string num = wordStr.Substring(1);
      if (!decimal.TryParse(num, out decimal val)) throw new ArgumentException($"Not a command number: {num} from word {wordStr}");

      Letter = letter;
      Value = val;
      Major = (int) Math.Floor(val);

      string[] parts = $"{val}".Split('.');
      if (parts.Length > 1 && int.TryParse(parts.Last(), out int minor))
        Minor = minor;
      else
        Minor = 0;
    }
  }
}
