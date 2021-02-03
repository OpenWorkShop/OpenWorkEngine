using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Models;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwareReportingSettings {
    public FirmwareSetting<StatusReportType> StatusReport { get; } = FirmwareSetting.Define(StatusReportType.Position);

    public FirmwareSetting<bool> ReportInches { get; } = FirmwareSetting.Define(false);

    public List<FirmwareSetting> Settings => FirmwareSettings.GetSortedList(StatusReport, ReportInches);
  }
}
