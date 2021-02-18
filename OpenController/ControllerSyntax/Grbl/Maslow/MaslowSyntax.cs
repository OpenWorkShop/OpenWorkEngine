using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow {
  public static class MaslowSyntax {
    private static List<SettingDefinition> MaslowDueSettings = new List<SettingDefinition>() {
      new("40", MachineSettingType.StepPulse, MachineSettingUnits.Microseconds),
    };

    internal static ControllerTranslator UseMaslowSyntax(this ControllerTranslator translator) {
      translator.UseGrblSyntax();

      translator.Fallback = new MaslowFallbackParser();

      translator.SetCommandScript(nameof(Controller.Homing), "G21\nG90\nG0 Z5\nG0 X0 Y0", overwrite:true);

      translator.DefineSetting("$40", m => m.Settings.Pins.KProportional.X);
      translator.DefineSetting("$41", m => m.Settings.Pins.KDerivative.X);
      translator.DefineSetting("$42", m => m.Settings.Pins.KIntegral.X);
      translator.DefineSetting("$43", m => m.Settings.Pins.Imax.X);

      translator.DefineSetting("$45", m => m.Settings.Calibration.ChainElongationFactor);
      translator.DefineSetting("$46", m => m.Settings.Applicator.ShuttleWeight);

      translator.DefineSetting("$50", m => m.Settings.Pins.KProportional.Y);
      translator.DefineSetting("$51", m => m.Settings.Pins.KDerivative.Y);
      translator.DefineSetting("$52", m => m.Settings.Pins.KIntegral.Y);
      translator.DefineSetting("$53", m => m.Settings.Pins.Imax.Y);

      translator.DefineSetting("$60", m => m.Settings.Pins.KProportional.Z);
      translator.DefineSetting("$61", m => m.Settings.Pins.KDerivative.Z);
      translator.DefineSetting("$62", m => m.Settings.Pins.KIntegral.Z);
      translator.DefineSetting("$63", m => m.Settings.Pins.Imax.Z);

      translator.DefineSetting("$80", m => m.Settings.Calibration.ChainOverSprocket);
      translator.DefineSetting("$81", m => m.Settings.Movement.MachineSize.X);
      translator.DefineSetting("$82", m => m.Settings.Movement.MachineSize.Y);
      translator.DefineSetting("$83", m => m.Settings.Calibration.MotorDistance.X);
      translator.DefineSetting("$84", m => m.Settings.Calibration.MotorDistance.Y);
      translator.DefineSetting("$85", m => m.Settings.Calibration.Scaling.X);
      translator.DefineSetting("$86", m => m.Settings.Calibration.Scaling.Y);
      translator.DefineSetting("$87", m => m.Settings.Calibration.ChainSagCorrection);
      translator.DefineSetting("$88", m => m.Settings.Calibration.LeftChainTolerance);
      translator.DefineSetting("$89", m => m.Settings.Calibration.RightChainTolerance);
      translator.DefineSetting("$90", m => m.Settings.Applicator.ShuttleRadius);
      translator.DefineSetting("$91", m => m.Settings.Calibration.ChainLength);
      translator.DefineSetting("$92", m => m.Settings.Movement.PositionMin.Z);
      translator.DefineSetting("$93", m => m.Settings.Calibration.Kinematics);
      translator.DefineSetting("$94", m => m.Settings.Calibration.HomeChainLengths);

      // translator.SettingDefinitions.AddRange();

      return translator;
    }
  }
}
