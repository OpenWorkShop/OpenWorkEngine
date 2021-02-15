using System.Collections.Generic;
using System.Linq;

namespace OpenWorkEngine.OpenController.Syntax {
  /// <summary>
  ///   Multiple chunks per GCode line. Represents one logical parseable unit.
  /// </summary>
  public class SyntaxChunk {
    public SyntaxType Type { get; set; } = SyntaxType.Unknown;

    public string Value { get; set; } = "";

    public string Comment => string.Join(' ', Comments);

    public List<string> Comments { get; internal init; } = new();

    public bool IsCode => !string.IsNullOrWhiteSpace(Value);

    public bool IsValid => IsCode || Comments.Any();

    public override string ToString() => Value + (Comments.Any() ? $" ({string.Join(',', Comments)})" : "");
  }
}
