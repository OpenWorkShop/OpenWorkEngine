using OpenWorkEngine.OpenController.Lib.Filesystem;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramFileUpload : IClientSelectedFile {
    public string Name { get; set; } = default!;

    public long LastModified { get; set; } = 0;

    public int Size { get; set; } = 0;

    public string Type { get; set; } = default!;
  }
}
