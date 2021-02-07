using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineTimelineNode(MachineLogLevel LogLevel, List<MachineLogEntry> LogEntries) {
    public static MachineTimelineNode WithFirstEntry(MachineLogEntry entry) =>
      new MachineTimelineNode(entry.LogLevel, new List<MachineLogEntry>() {entry});

    public static List<MachineTimelineNode> GroupLogEntries(List<MachineLogEntry> entries) {
      List<MachineTimelineNode> nodes = new List<MachineTimelineNode>();
      if (!entries.Any()) return nodes;
      MachineTimelineNode node = WithFirstEntry(entries.First());
      for (int i = 1; i < entries.Count; i++) {
        MachineLogEntry entry = entries[i];
        if (entry.LogLevel < MachineLogLevel.Cfg) continue;
        if (entry.LogLevel == node.LogLevel) {
          node.LogEntries.Push(entry);
        } else {
          nodes.Push(node);
          node = WithFirstEntry(entry);
        }
      }
      nodes.Push(node);
      return nodes;
    }
  }
}
