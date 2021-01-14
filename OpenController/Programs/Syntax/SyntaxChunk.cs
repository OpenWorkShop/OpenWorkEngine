using System.Collections.Generic;
using System.Linq;

namespace OpenWorkEngine.OpenController.Programs.Syntax {
  /// <summary>
  ///   Multiple chunks per GCode line. Represents one logical parseable unit.
  /// </summary>
  public class SyntaxChunk {
    public string Value { get; set; } = "";

    public List<string> Comments { get; } = new();

    public bool IsCommand => !string.IsNullOrWhiteSpace(Value);

    public bool IsValid => IsCommand || Comments.Any();

    public override string ToString() => Value + (Comments.Any() ? $" ({string.Join(',', Comments)})" : "");
  }
}
