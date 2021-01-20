using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Grbl.Parsers;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public static class GrblParsers {
    public static ParserSet AddGrblParsers(this ParserSet parsers) {
      parsers.Firmware = new GrblVersionParser();
      parsers.Parameters = new GrblParameterParser();
      parsers.Settings = new GrblSettingsParser();
      parsers.Welcome = new GrblWelcomeParser();
      parsers.Message = new GrblMessageParser();
      parsers.Response = new GrblResponseParser();
      parsers.Alarm = new GrblAlarmParser();
      parsers.Options = new GrblOptionParser();
      parsers.Help = new GrblHelpParser();

      return parsers;
    }
  }
}
