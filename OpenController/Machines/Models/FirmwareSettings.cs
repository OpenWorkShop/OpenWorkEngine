using System.Collections.Generic;
using System.Linq;
using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Machines.Models {
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

    // All settings, polymorphic typed.
    public List<FirmwareSetting> Settings => GetSortedSettings();

    private List<FirmwareSetting> GetSortedSettings() => GetSortedList(Pins.Settings
                                                                           .Union(Movement.Settings)
                                                                           .Union(Reporting.Settings)
                                                                           .Union(Applicator.Settings)
                                                                           .Union(Homing.Settings)
                                                                           .Union(Calibration.Settings));

    internal static List<FirmwareSetting> GetSortedList(params FirmwareSetting[] settings) =>
      GetSortedList(settings.ToList());

    internal static List<FirmwareSetting> GetSortedList(IEnumerable<FirmwareSetting> settings) {
      List<FirmwareSetting> s = settings.ToList();
      s.Sort((a, b) =>
        a.Index == b.Index ?
          string.CompareOrdinal(a.Key, b.Key) : a.Index - b.Index);
      return s.ToList();
    }
  }
}
