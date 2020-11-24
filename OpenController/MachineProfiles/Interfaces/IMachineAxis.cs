using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineAxis {
    AxisName Name { get; }

    decimal Min { get; }

    decimal Max { get; }

    decimal Accuracy { get; }

    decimal Precision { get; }
  }
}
