using System;
using Newtonsoft.Json;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramFileRevision {
    [JsonProperty("id")] public int Id { get; internal init; }

    [JsonProperty("checksum")] public string Checksum { get; internal init; } = default!;

    [JsonProperty("username")] public string Username { get; internal init; } = default!;

    [JsonProperty("createdAt")] public DateTime CreatedAt { get; internal init; }
  }
}
