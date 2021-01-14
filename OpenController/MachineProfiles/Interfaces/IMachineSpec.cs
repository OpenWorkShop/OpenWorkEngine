using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineSpec {
    public MachineSpecType SpecType { get; }

    // Specs always have numeric values.
    public decimal Value { get; }
  }
}
