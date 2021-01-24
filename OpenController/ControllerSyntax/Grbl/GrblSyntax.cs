using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal static class GrblSyntax {
    internal const string MoveCommandTemplate = "${G:=0}${X}${Y}${Z}${A}${B}${C}";

    internal static ControllerTranslator UseGrblSyntax(this ControllerTranslator translator) {
      translator.SetCommandScript(nameof(Controller.GetSettings), "$$");
      translator.SetCommandScript(nameof(Controller.Unlock), "$X");           // kill alarm
      translator.SetCommandScript(nameof(Controller.GetFirmware), "$I");      // build info
      translator.SetCommandScript(nameof(Controller.GetParameters), "$#");    //
      translator.SetCommandScript(nameof(Controller.GetConfiguration), "$G"); // Parser state
      translator.SetCommandScript(nameof(Controller.CheckCode), "$C");        // GCode mode
      translator.SetCommandScript(nameof(Controller.GetStartup), "$N");       // Startup blocks
      translator.SetCommandScript(nameof(Controller.Homing), "$H");
      translator.SetCommandScript(nameof(Controller.GetStatus), "?");
      translator.SetCommandScript(nameof(Controller.Pause), "!");
      translator.SetCommandScript(nameof(Controller.Play), "~");
      translator.SetCommandScript(nameof(Controller.Reset), "\u0018");        // ctrl+x
      translator.SetCommandScript(nameof(Controller.Move), MoveCommandTemplate);

      translator.StatusPoll = new SerialPoll(nameof(Controller.GetStatus), new GrblStatusParser());
      translator.ConfigPoll = new SerialPoll(nameof(Controller.GetConfiguration), new GrblConfigParser(), 10000, 10000);

      translator.Response = new GrblResponseParser();
      translator.Fallback = new FallbackParser();

      translator.Firmware = new GrblVersionParser();
      translator.Parameters = new GrblParameterParser();
      translator.Settings = new GrblSettingsParser();
      translator.Welcome = new GrblWelcomeParser();
      translator.Alarm = new GrblAlarmParser();
      translator.Options = new GrblOptionParser();
      translator.Help = new GrblHelpParser();

      return translator;
    }
  }
}
