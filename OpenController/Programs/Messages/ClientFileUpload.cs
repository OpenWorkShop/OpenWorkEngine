using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Programs.Models;

namespace OpenWorkEngine.OpenController.Programs.Messages {
  public abstract class ClientFileUpload : IClientSelectedFile {
    public string Name { get; set; } = default!;

    public long LastModified { get; set; } = 0;

    public long Size { get; set; } = 0;

    public string Type { get; set; } = default!;
  }
}
