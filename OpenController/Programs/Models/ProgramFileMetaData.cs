using System.Collections.Generic;
using Newtonsoft.Json;

namespace OpenWorkEngine.OpenController.Programs.Models {
  /// <summary>
  /// A hidden file on the disk representing information about the program file.
  /// </summary>
  public class ProgramFileMetaData {
    /// <summary>
    /// The name of the user who created the file.
    /// </summary>
    [JsonProperty("creatorUsername")] public string CreatorUsername { get; internal init; } = default!;

    /// <summary>
    /// Generic tags on the program file
    /// </summary>
    [JsonProperty("tags")] public List<string> Tags { get; } = new();

    /// <summary>
    /// List of changes/times made to the file.
    /// </summary>
    [JsonProperty("revisions")] public List<ProgramFileRevision> Revisions { get; } = new();
  }
}
