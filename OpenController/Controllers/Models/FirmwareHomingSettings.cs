using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public record FirmwareHomingSettings {
    public FirmwareSetting<bool> Enabled { get;} = new(false);

    public FirmwareSetting<FirmwareAxisFlags> DirectionInvert { get; } = new(new FirmwareAxisFlags());

    public FirmwareSetting<decimal> FeedRate { get; } = new(0) { Units = MachineSettingUnits.MillimetersPerMinute };

    public FirmwareSetting<decimal> SeekRate { get; } = new(0) { Units = MachineSettingUnits.MillimetersPerMinute };

    public FirmwareSetting<decimal> Debounce { get; } = new(0) { Units = MachineSettingUnits.Milliseconds };

    public FirmwareSetting<decimal> PullOff { get; } = new(0) { Units = MachineSettingUnits.Millimeters };

    public List<FirmwareSetting> Settings => new() {
      Enabled, DirectionInvert, FeedRate, SeekRate, Debounce, PullOff
    };
  }

}
