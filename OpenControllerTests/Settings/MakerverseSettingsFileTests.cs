using FluentAssertions;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Settings.Models;
using OpenWorkEngine.OpenController.Workspaces.Models;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Settings {
  /// <summary>
  ///   CNCjs and early Makerverse file format legacy support.
  /// </summary>
  public class MakerverseSettingsFileTests : TestBase {
    public MakerverseSettingsFileTests(ITestOutputHelper output) : base(output) { }

    private bool ValidateCommand(CommandSettings c) =>
      !string.IsNullOrWhiteSpace(c.Title) && !string.IsNullOrWhiteSpace(c.Id) &&
      !string.IsNullOrWhiteSpace(c.Commands);

    private bool ValidateEvent(EventSettings e) =>
      !string.IsNullOrWhiteSpace(e.Event) && !string.IsNullOrWhiteSpace(e.Trigger) &&
      !string.IsNullOrWhiteSpace(e.Id) && !string.IsNullOrWhiteSpace(e.Commands);

    private bool ValidateFirmware(MachineFirmwareSettings fw) => fw.BaudRateValue > 2400 && fw.ControllerType > MachineControllerType.TinyG;

    private bool ValidateConnection(ConnectionSettings c) => !string.IsNullOrEmpty(c.PortName) && ValidateFirmware(c.Firmware);

    private bool ValidateWorkspace(WorkspaceSettings ws) =>
      !string.IsNullOrWhiteSpace(ws.Id) && !string.IsNullOrWhiteSpace(ws.Name) &&
      !string.IsNullOrWhiteSpace(ws.Path) && ValidateConnection(ws.Connection);

    private bool ValidateUser(OpenControllerUser u) => !string.IsNullOrWhiteSpace(u.Username) && u.Tokens.Count > 0;

    [Theory]
    [JsonFileData("makerverse112.json")]
    public void CanLoadLegacy(JObject obj) {
      OpenControllerSettings settings = new();
      settings.LoadSettings(obj);

      settings.FileSystem.DocumentsDirectory.Should().NotBeEmpty();

      settings.AppUpdates.Prereleases.Should().BeTrue();
      settings.AppUpdates.CheckForUpdates.Should().BeFalse();

      settings.Commands.Should().NotBeEmpty().And.OnlyContain(c => ValidateCommand(c));

      settings.Events.Should().NotBeEmpty().And.OnlyContain(e => ValidateEvent(e));

      settings.Workspaces.Should().NotBeEmpty().And.OnlyContain(ws => ValidateWorkspace(ws));

      settings.Users.Should().NotBeEmpty().And.OnlyContain(u => ValidateUser(u));
    }
  }
}
