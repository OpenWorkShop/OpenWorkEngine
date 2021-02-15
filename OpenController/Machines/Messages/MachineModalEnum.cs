using System;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  public record MachineModalEnum<TEnum>(string Id, TEnum Value, string? Code = null) where TEnum : Enum;
}
