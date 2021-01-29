using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.Controllers.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public record FirmwareReportingSettings {
    public FirmwareSetting<StatusReportType> StatusReport { get; } = new(StatusReportType.Position);

    public FirmwareSetting<bool> ReportInches { get; set; } = new(false);

    public List<FirmwareSetting> Settings => new() {StatusReport, ReportInches};
  }
}
