using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Services {
  public class ProgramFileManager {
    private ILogger Log { get; }

    private readonly ConcurrentDictionary<string, ProgramFile> _programFiles = new();

    public ProgramFileManager(ILogger logger) {
      Log = logger.ForContext(typeof(ProgramFileManager));
      Task.Run(DoWorkAsync);
    }

    public ProgramFile Upload(ProgramFileUpload fileUpload) {
      return Create(new ProgramFileMeta(fileUpload));
    }

    public ProgramFile Open(string filePath) {
      return Create(new ProgramFileMeta(filePath));
    }

    private ProgramFile Create(ProgramFileMeta meta) {
      return _programFiles.GetOrAdd(meta.Name, s => new ProgramFile(meta, Log));
    }

    private async Task DoWorkAsync() {
      foreach (ProgramFile programFile in _programFiles.Values) {
        programFile.Process();
      }
      await Task.Delay(50);
    }
  }
}
