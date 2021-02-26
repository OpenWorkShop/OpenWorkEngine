using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Services {
  public class ProgramFileDirectory {
    public string Path { get; }

    public List<string> FileExtensions => new List<string>() {"gcode", "nc", "mpt", "mpf"};

    // List version of the programs (files) on disk, sorted.
    public List<ProgramFileMeta> ProgramFileMetas => allProgramFileMeta.Keys
                                                                  .ToImmutableSortedSet()
                                                                  .Select(s => allProgramFileMeta[s])
                                                                  .ToList();

    // Meta describing those files which exist on-disk.
    internal readonly Dictionary<string, ProgramFileMeta> allProgramFileMeta = new();

    private FileSystemWatcher? _watcher = null;

    private ILogger Log { get; }


    public ProgramFileDirectory(string directoryPath, ILogger logger) {
      Log = logger.ForContext("path", directoryPath);
      Path = directoryPath;
      if (TryEnsureDirectory()) {
        allProgramFileMeta = Directory.EnumerateFiles(directoryPath)
                                      .Where(f => !f.Split('/').Last().StartsWith(".") &&
                                         FileExtensions.Any(ext => f.EndsWith($".{ext}")))
                                      .Select(f => new ProgramFileMeta(f))
                                      .ToDictionary(m => m.Name, m => m);
        Log.Debug("[PGM] loaded all existing programs: {names}", ProgramFileMetas.Select(f => f.Name));
      }
    }

    internal ProgramFileMeta GetProgramMeta(string name) {
      string fp = System.IO.Path.Combine(Path, name);
      bool fileExists = File.Exists(fp);
      bool metaExists = allProgramFileMeta.ContainsKey(name);
      if (fileExists != metaExists) throw new ArgumentException($"Directory mismatch; {name} has been changed.");
      if (!metaExists) throw new ArgumentException($"Program {name} does not exist in {Path}");
      return allProgramFileMeta[name];
    }

    internal void EnsureDirectory() {
      if (!Directory.Exists(Path)) {
        Directory.CreateDirectory(Path);
      }

      _watcher = new FileSystemWatcher {
        Path = Path,
      };
      foreach (string ext in FileExtensions) {
        _watcher.Filters.Add($"*.{ext}");
      }

      // Add event handlers.
      _watcher.Changed += OnChanged;
      _watcher.Created += OnChanged;
      _watcher.Renamed += OnChanged;
      _watcher.Deleted += OnChanged;

      // Begin watching.
      _watcher.EnableRaisingEvents = true;
    }

    private void OnChanged(object source, FileSystemEventArgs e) {
      string name = e.Name ?? new FileInfo(e.FullPath).Name;
      bool metaExists = allProgramFileMeta.ContainsKey(name);
      if (File.Exists(e.FullPath)) {
        if (metaExists) {
          allProgramFileMeta[name].InspectFile();
        } else {
          allProgramFileMeta.Add(name, new ProgramFileMeta(e.FullPath));
        }
      } else if (metaExists) {
        allProgramFileMeta.Remove(name);
      }

      Log.Debug("[CHANGE] [{type}] {name} @ {path}; files: {files}", e.ChangeType, e.Name, e.FullPath, ProgramFileMetas);
    }

    internal bool TryEnsureDirectory() {
      try {
        EnsureDirectory();
        return true;
      } catch (Exception e) {
        Log.Error(e, "Failed to create or access upload directory: {directory}", Path);
        return false;
      }
    }
  }
}
