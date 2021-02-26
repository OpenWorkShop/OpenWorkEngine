using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DiffMatchPatch;
using DiffPlex.DiffBuilder;
using DiffPlex.DiffBuilder.Model;
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

    private string GetPatchPath(int id) => Path.Combine(Directory, $".{SpliceName($"-{id}")}");

    internal FileInfo LocalFile => _fileInfo ??= new FileInfo(FilePath);
    private FileInfo? _fileInfo;

    internal string SpliceName(string part) {
      return Name.Substring(0, Name.Length - LocalFile.Extension.Length) +
        part +
        Name.Substring(Name.Length - LocalFile.Extension.Length);
    }

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

    internal string ComputeChecksum() {
      using (FileStream fs = new FileStream(FilePath, FileMode.Open)) {
        using (BufferedStream bs = new BufferedStream(fs)) {
          using (SHA1Managed sha1 = new SHA1Managed()) {
            byte[] hash = sha1.ComputeHash(bs);
            StringBuilder formatted = new StringBuilder(2 * hash.Length);
            foreach (byte b in hash) {
              formatted.AppendFormat("{0:X2}", b);
            }
            return formatted.ToString();
          }
        }
      }
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

    private diff_match_patch Patcher => _patcher ??= new diff_match_patch();
    private diff_match_patch? _patcher;

    // Create a patch set going from the new text back to the old text (revert).
    internal async Task<List<Patch>> CreateRevertPatch(string text) {
      if (!FileExists) return new List<Patch>() { };
      string oldText = await File.ReadAllTextAsync(FilePath);
      return Patcher.patch_make(text, oldText);
    }

    internal async Task CreateRevision(OpenControllerUser user, string text, DateTime mTime) {
      List<Patch> patches = await CreateRevertPatch(text);
      await Write(text, mTime);
      if (Data == null) {
        Data = new ProgramFileMetaData() {CreatorUsername = user.Username};
      }
      if (patches.Any()) {
        ProgramFileRevision rev = new ProgramFileRevision() {
          Id = Data.Revisions.Count, Checksum = ComputeChecksum(), Username = user.Username, CreatedAt = mTime
        };
        Data.Revisions.Push(rev);
        await File.WriteAllTextAsync(GetPatchPath(rev.Id), Patcher.patch_toText(patches));
      }
      await File.WriteAllTextAsync(MetaDataPath, JsonConvert.SerializeObject(Data));
      InspectFile();
    }
  }
}
