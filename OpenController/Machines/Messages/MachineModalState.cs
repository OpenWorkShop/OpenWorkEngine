using System;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  public record MachineModalState<TEnum>(TEnum Value, string? Code = null) where TEnum : Enum;
}
