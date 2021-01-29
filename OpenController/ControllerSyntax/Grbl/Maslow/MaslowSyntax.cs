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

      translator.DefineSetting("$40", fws => fws.Pins.KProportional.X);
      translator.DefineSetting("$41", fws => fws.Pins.KDerivative.X);
      translator.DefineSetting("$42", fws => fws.Pins.KIntegral.X);
      translator.DefineSetting("$43", fws => fws.Pins.Imax.X);

      translator.DefineSetting("$45", fws => fws.Calibration.ChainElongationFactor);
      translator.DefineSetting("$46", fws => fws.Applicator.ShuttleWeight);

      translator.DefineSetting("$50", fws => fws.Pins.KProportional.Y);
      translator.DefineSetting("$51", fws => fws.Pins.KDerivative.Y);
      translator.DefineSetting("$52", fws => fws.Pins.KIntegral.Y);
      translator.DefineSetting("$53", fws => fws.Pins.Imax.Y);

      translator.DefineSetting("$60", fws => fws.Pins.KProportional.Z);
      translator.DefineSetting("$61", fws => fws.Pins.KDerivative.Z);
      translator.DefineSetting("$62", fws => fws.Pins.KIntegral.Z);
      translator.DefineSetting("$63", fws => fws.Pins.Imax.Z);

      translator.DefineSetting("$80", fws => fws.Calibration.ChainOverSprocket);
      translator.DefineSetting("$81", fws => fws.Movement.MachineSize.X);
      translator.DefineSetting("$82", fws => fws.Movement.MachineSize.Y);
      translator.DefineSetting("$83", fws => fws.Calibration.MotorDistance.X);
      translator.DefineSetting("$84", fws => fws.Calibration.MotorDistance.Y);
      translator.DefineSetting("$85", fws => fws.Calibration.Scaling.X);
      translator.DefineSetting("$86", fws => fws.Calibration.Scaling.Y);
      translator.DefineSetting("$87", fws => fws.Calibration.ChainSagCorrection);
      translator.DefineSetting("$88", fws => fws.Calibration.LeftChainTolerance);
      translator.DefineSetting("$89", fws => fws.Calibration.RightChainTolerance);
      translator.DefineSetting("$90", fws => fws.Applicator.ShuttleRadius);
      translator.DefineSetting("$91", fws => fws.Calibration.ChainLength);
      translator.DefineSetting("$92", fws => fws.Movement.PositionMin.Z);
      translator.DefineSetting("$93", fws => fws.Calibration.Kinematics);
      translator.DefineSetting("$94", fws => fws.Calibration.HomeChainLengths);

      // translator.SettingDefinitions.AddRange();

      return translator;
    }
  }
}
