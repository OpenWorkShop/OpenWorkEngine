using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Services {
  public class ProgramFileManager {
    public ProgramFileManager(ILogger logger) => Log = logger.ForContext(typeof(ProgramFileManager));

    private ILogger Log { get; }

    public ProgramFileUpload Upload(ProgramFileUpload fileUpload) {
      Log.Debug("[UPLOAD] {@fileUpload}", fileUpload);
      return fileUpload;
    }
  }
}
