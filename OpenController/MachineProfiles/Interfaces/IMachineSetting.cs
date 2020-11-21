using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineSetting : IHasStringId {
    public string Title { get; }

    public MachineSettingType SettingType { get; }

    public string Key { get; }

    public string Value { get; }
  }
}