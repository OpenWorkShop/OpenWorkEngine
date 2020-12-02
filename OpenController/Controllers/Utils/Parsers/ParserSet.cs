using System.Collections.Generic;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class ParserSet {
    public Parser WelcomeParser { get; internal set; }

    public Parser FirmwareParser { get; internal set; }

    public List<Parser> ToList() => new List<Parser>() {WelcomeParser, FirmwareParser};
  }
}