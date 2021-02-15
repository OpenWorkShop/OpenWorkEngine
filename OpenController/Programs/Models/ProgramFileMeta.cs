using System;
using System.Collections.Concurrent;
using System.IO;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramFileMeta : ProgramFileUpload, IProgramSource {
    public string? Directory { get; }

    public ProgramSyntax Syntax => ProgramSyntax.GCode;

    public bool IsUpload => Upload != null;

    internal FileInfo? LocalFile { get; }

    internal ProgramFileUpload? Upload { get; }

    internal string GetId() => Directory == null ? Name : Path.Join(Directory, Name);

    public ProgramFileMeta(string filePath) {
      LocalFile = new FileInfo(filePath);
      if (!LocalFile.Exists) {
        throw new ArgumentException($"Invalid file path: {filePath}");
      }
      Log.Warning("INFO {info}", LocalFile);

      Name = LocalFile.Name;
      Directory = LocalFile.Directory?.FullName;
      Size = LocalFile.Length;
      Type = LocalFile.Extension;
      LastModified = File.GetLastWriteTime(filePath).Ticks;
    }

    public ProgramFileMeta(ProgramFileUpload upload) {
      Upload = upload;
      Name = upload.Name;
      LastModified = upload.LastModified;
      Size = upload.Size;
      Type = upload.Type;
    }
  }
}
