using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading.Tasks;
using HotChocolate.Language;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Programs.Services;
using OpenWorkEngine.OpenController.Settings.Models;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramFileMeta : ClientFileUpload, IProgramSource {
    public string Directory { get; }

    public ProgramSyntax Syntax => ProgramSyntax.GCode;

    public string FilePath => Path.GetFullPath(Path.Combine(Directory, Name));

    public bool FileExists => LocalFile.Exists;

    public ProgramFileMetaData? Data { get; private set; }

    private string MetaDataPath => Path.Combine(Directory, $".{Name}.json");

    internal FileInfo LocalFile => _fileInfo ??= new FileInfo(FilePath);
    private FileInfo? _fileInfo;

    public ProgramFileMeta(string filePath) {
      _fileInfo = new FileInfo(filePath);
      if (!LocalFile.Exists) {
        throw new ArgumentException($"Invalid file path: {filePath}");
      }
      Name = LocalFile.Name;
      Directory = LocalFile.Directory?.FullName ?? "";
      Size = LocalFile.Length;
      Type = LocalFile.Extension;
      LastModified = File.GetLastWriteTime(filePath).Ticks;
      Data = LoadMetaData();
    }

    public ProgramFileMeta(ClientFileUpload upload, ProgramFileDirectory directory) {
      Name = upload.Name;
      Directory = directory.Path;
      LastModified = upload.LastModified;
      Size = upload.Size;
      Type = upload.Type;
      Data = LoadMetaData();
    }

    // When a file change is detected...
    internal void InspectFile() {
      _fileInfo = new FileInfo(FilePath);
    }

    internal ProgramFileMetaData? LoadMetaData() {
      if (!File.Exists(MetaDataPath)) return Data = null;
      return Data = JsonConvert.DeserializeObject<ProgramFileMetaData>(File.ReadAllText(MetaDataPath));
    }

    private async Task Write(string text, DateTime mTime) {
      bool existed = File.Exists(FilePath);
      await File.WriteAllTextAsync(FilePath, text);
      if (!existed) {
        File.SetCreationTime(FilePath, mTime);
      }
      File.SetLastWriteTime(FilePath, mTime);
    }

    internal async Task CreateRevision(OpenControllerUser user, string text, DateTime mTime) {
      await Write(text, mTime);
      if (Data == null) {
        Data = new ProgramFileMetaData() {CreatorUsername = user.Username};
      }
      Data.Revisions.Push(new ProgramFileRevision() { Username = user.Username, CreatedAt = mTime });
      await File.WriteAllTextAsync(MetaDataPath, JsonConvert.SerializeObject(Data));
      InspectFile();
    }
  }
}
