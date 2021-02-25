using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Data;
using HotChocolate.Language;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Ports.Messages;
using OpenWorkEngine.OpenController.Programs.Models;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {
  internal record ControlledMachineHash(int StatusHash, int ConfigHash, int SettingsHash, int ProgramHash);

  /// <summary>
  /// </summary>
  public class ControlledMachine : ITopicMessage {
    public string Id => PortName;

    public string TopicId => Id;

    public string? MachineProfileId { get; }

    public MachineStatus Status { get; } = new();

    public MachineConfiguration Configuration { get; } = new();

    public FirmwareSettings Settings { get; } = new();

    public ProgramExecutor? Program { get; internal set; }

    [UsePaging]
    [UseFiltering(typeof(MachineLogEntryFilterInputType))]
    [UseSorting]
    public IQueryable<MachineLogEntry> Logs() => LogEntries.AsQueryable();

    [UsePaging]
    public IQueryable<MachineTimelineNode> Timeline() => MachineTimelineNode.GroupLogEntries(LogEntries).AsQueryable();

    public ControlledMachine(string portName, IMachineConnectionSettings? opts, ILogger log) {
      PortName = portName;
      if (opts != null) {
        IMachineFirmwareRequirement req = opts.GetFirmwareRequirement();
        Configuration.Firmware.Requirement = new FirmwareRequirement {
          ControllerType = req.ControllerType,
          Name = req.Name,
          Edition = req.Edition,
          HelpUrl = req.HelpUrl,
          DownloadUrl = req.DownloadUrl,
          SuggestedVersion = req.SuggestedVersion,
          RequiredVersion = req.RequiredVersion
        };
        MachineProfileId = opts.MachineProfileId;
      }
      Log = log.ForContext("portName", portName)
               .ForContext("machineProfileId", MachineProfileId);
    }

    internal ILogger Log { get; }

    // Used for keying of messages related to this machine.
    internal string PortName { get; }

    internal List<MachineLogEntry> LogEntries { get; } = new();
    //
    // internal bool SetSetting(MachineSetting setting) {
    //   int i = Settings.FindIndex(s => s.Key.Equals(setting.Key));
    //   if (i >= 0) {
    //     if (setting.GetHashCode() == Settings[i].GetHashCode()) {
    //       return false;
    //     }
    //     Settings.RemoveAt(i);
    //   }
    //   Settings.Push(setting);
    //   Settings.Sort((a, b) => String.Compare(a.Key, b.Key, StringComparison.Ordinal));
    //   return true;
    // }

    internal ControlledMachineHash SnapshotHash() {
      return new (Status.GetHashCode(), Configuration.GetHashCode(), Settings.GetHashCode(), Program?.GetHashCode()??0);
    }

    internal HashSet<MachineTopic> GetMachineChanges(ControlledMachineHash hash) {
      HashSet<MachineTopic> ret = new();
      if (hash.StatusHash != Status.GetHashCode()) ret.Add(MachineTopic.Status);
      if (hash.ConfigHash != Status.GetHashCode()) ret.Add(MachineTopic.Configuration);
      if (hash.SettingsHash != Status.GetHashCode()) ret.Add(MachineTopic.Setting);
      if (hash.ProgramHash != Status.GetHashCode()) ret.Add(MachineTopic.Program);
      return ret;
    }

    internal HashSet<MachineTopic> AddLogEntry(MachineLogEntry entry, bool dedupe = true) {
      if (dedupe && LogEntries.Any()) {
        MachineLogEntry last = LogEntries.Last();
        if (last.CanMergeWith(entry)) {
          last.Timestamps.Push(DateTime.Now);
          return OnLogEntry(entry);
        }
      }
      entry.Id = LogEntries.Count + 1;
      LogEntries.Push(entry);
      return OnLogEntry(entry);
    }

    private HashSet<MachineTopic> OnLogEntry(MachineLogEntry entry) {
      // Timestamps may have been updated.
      LogEntries.Sort((a, b) => DateTime.Compare(a.Timestamp, b.Timestamp));

      const string template = "[LOG] {message} [{code}]";
      List<string> code = entry.Code.Select(c => c.Value).ToList();
      if (entry.LogLevel == MachineLogLevel.Dbg) Log.Verbose(template, entry.Message, code);
      else if (entry.LogLevel == MachineLogLevel.Cfg) Log.Debug(template, entry.Message, code);
      else if (entry.LogLevel == MachineLogLevel.Inf) Log.Debug(template, entry.Message, code);
      else if (entry.LogLevel == MachineLogLevel.Wrn) Log.Information(template, entry.Message, code);
      else if (entry.LogLevel == MachineLogLevel.Err) Log.Warning(template, entry.Message, code);
      return new HashSet<MachineTopic>() {MachineTopic.Log};
    }
  }
}
