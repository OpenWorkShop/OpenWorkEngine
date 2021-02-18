using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineOverrides {
    public ModalSetting<MachineOverridesMode> Mode { get; } = FirmwareSetting.Modal(MachineOverridesMode.None);

    public FirmwareSetting<decimal> Feed { get; } = FirmwareSetting.Define(100M);

    public FirmwareSetting<decimal> Rapids { get; } = FirmwareSetting.Define(100M);

    public FirmwareSetting<decimal> Speed { get; } = FirmwareSetting.Define(100M);

    public override string ToString() => $"<OV:F{Feed}:R{Rapids}:S{Speed}>";
  }
}
