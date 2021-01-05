namespace OpenWorkEngine.OpenController.Programs.GCode {
  /// <summary>
  /// Multiple chunks per GCode line. Represents one logical parseable unit.
  /// </summary>
  public class GCodeChunk {
    public string Value { get; set; }

    public bool IsComment { get; }

    public GCodeChunk(string value, bool isComment) {
      Value = value.Trim();
      IsComment = isComment;
    }

    public override string ToString() => IsComment ? $"({Value})" : Value;
  }
}
