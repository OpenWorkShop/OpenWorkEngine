using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Services {
  public class ProgramFileManager : SubscriptionManager<ProgramTopic, ProgramFileMeta> {
    public override ILogger Log { get; }

    internal ProgramFileDirectory ProgramDirectory =>
      _programDirectory ??= new ProgramFileDirectory(this, Config.Settings.FileSystem.ProgramsDirectory);
    private ProgramFileDirectory? _programDirectory = null;

    private ConfigFile Config { get; }

    private readonly ConcurrentDictionary<string, ProgramFile> _loadedProgramFiles = new();

    public ProgramFileManager(ConfigFile config, ILogger logger) {
      Log = logger.ForContext(typeof(ProgramFileManager));
      Config = config;
      Task.Run(DoWorkAsync);
    }

    // A quick "test" function for getting metadata about a client-selected file.
    public ProgramFileMeta SelectFile(ClientFileUpload fileUpload) => new (fileUpload, ProgramDirectory);

    // The real upload function, which adds the Text (body) into the equation.
    public async Task<ProgramFile> UploadFile(OpenControllerUser user, ProgramFileUpload fileUpload) {
      try {
        Log.Debug("[UPLOAD] {filename} from {username}", fileUpload.Name, user.Username);
        ProgramDirectory.EnsureDirectory();
        ProgramFileMeta meta = new (fileUpload, ProgramDirectory);
        if (meta.Name.StartsWith(".")) throw new ArgumentException("File names may not begin with a dot.");
        DateTime mTime = (new DateTime(1970, 1, 1)).AddMilliseconds(fileUpload.LastModified);
        await meta.CreateRevision(user, fileUpload.Text, mTime);
        return await LoadFile(meta);
      } catch (Exception e) {
        Log.Error(e, "Failed to upload file.");
        throw;
      }
    }

    public Task<ProgramFile> Load(string name) {
      try {
        return LoadFile(ProgramDirectory.GetProgramMeta(name));
      } catch (Exception e) {
        Log.Error(e, "Failed to load file.");
        throw;
      }
    }

    private async Task<ProgramFile> LoadFile(ProgramFileMeta meta) {
      ProgramFile programFile = _loadedProgramFiles.GetOrAdd(meta.Name, (s) => new ProgramFile(meta, Log));
      await programFile.ReadFile();
      return programFile;
    }

    private async Task DoWorkAsync() {
      await Task.Delay(50);
    }
  }
}
