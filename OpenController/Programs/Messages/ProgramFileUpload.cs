namespace OpenWorkEngine.OpenController.Programs.Messages {
  public class ProgramFileUpload : ClientFileUpload {
    public string Text { get; protected init; } = default!;
  }
}