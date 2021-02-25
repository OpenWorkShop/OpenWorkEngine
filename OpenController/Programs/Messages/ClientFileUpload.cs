using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Programs.Models;

namespace OpenWorkEngine.OpenController.Programs.Messages {
  public class ClientFileUpload : IClientSelectedFile {
    public string Name { get; protected init; } = default!;

    public long LastModified { get; protected init; } = 0;

    public long Size { get; protected init; } = 0;

    public string Type { get;protected init; } = default!;
  }
}
