using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.ControllerSyntax;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  /// <summary>
  /// A collection on onboard settings for the machine.
  /// </summary>
  public sealed record FirmwareSettings {
    public FirmwarePinsSettings Pins { get; } = new ();

    public FirmwareMovementSettings Movement { get; } = new();

    public FirmwareReportingSettings Reporting { get; } = new ();

    public FirmwareApplicatorSettings Applicator { get; } = new ();

    public FirmwareHomingSettings Homing { get; } = new ();

    public FirmwareCalibrationSettings Calibration { get; } = new ();

    public List<FirmwareSetting> AllSettings => GetSortedSettings();

    private List<FirmwareSetting> GetSortedSettings() {
      List<FirmwareSetting> settings = Pins.Settings
                                           .Union(Movement.Settings)
                                           .Union(Reporting.Settings)
                                           .Union(Applicator.Settings)
                                           .Union(Homing.Settings)
                                           .Union(Calibration.Settings)
                                           .ToList();
      settings.Sort((a, b) => string.CompareOrdinal(a.Key, b.Key));
      return settings;
    }
  }
}
