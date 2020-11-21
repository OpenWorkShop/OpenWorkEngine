using System.Collections.Generic;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineProfile : IHasStringId {
    public string Name { get; }

    public string? Brand { get; }

    public string Model { get; }

    public string Description { get; }

    public string Icon { get; }

    public MachineCategory MachineCategory { get; }

    public bool Discontinued { get; }

    public bool Featured { get; }
  }

  public interface IMachineProfile<TPart, TAxis, TCommand, TFeature, TFirmware, TSetting, TSpec> : IMachineProfile
    where TPart : IMachinePart<TSetting, TSpec>
    where TAxis : IMachineAxis
    where TCommand : IMachineCommand
    where TFeature : IMachineFeature
    where TFirmware : IMachineFirmware
    where TSetting : IMachineSetting
    where TSpec : IMachineSpec
  {
    public List<TPart> Parts { get; }

    public List<TAxis> Axes { get; }

    public List<TCommand> Commands { get; }

    public List<TFeature> Features { get; }

    public List<TFirmware> Firmware { get; }
  }
}
