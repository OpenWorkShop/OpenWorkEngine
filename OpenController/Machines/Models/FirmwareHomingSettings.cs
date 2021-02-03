using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwareHomingSettings {
    public FirmwareSetting<bool> Enabled { get;} = FirmwareSetting.Define(false);

    public FirmwareSetting<AxisFlags> DirectionInvert { get; } = FirmwareSetting.Define(new AxisFlags());

    public FirmwareSetting<decimal> FeedRate { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.MillimetersPerMinute);

    public FirmwareSetting<decimal> SeekRate { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.MillimetersPerMinute);

    public FirmwareSetting<decimal> Debounce { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Milliseconds);

    public FirmwareSetting<decimal> PullOff { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public List<FirmwareSetting> Settings => FirmwareSettings.GetSortedList(
      Enabled, DirectionInvert, FeedRate, SeekRate, Debounce, PullOff
    );
  }

}
