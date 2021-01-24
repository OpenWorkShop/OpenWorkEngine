using OpenWorkEngine.OpenController.Controllers.Services;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow {
  public static class MaslowSyntax {
    internal static ControllerTranslator UseMaslowSyntax(this ControllerTranslator translator) {
      translator.UseGrblSyntax();
      translator.Fallback = new MaslowFallbackParser();
      translator.SetCommandScript(nameof(Controller.Homing), "G21\nG90\nG0 Z5\nG0 X0 Y0", overwrite:true);
      return translator;
    }
  }
}
