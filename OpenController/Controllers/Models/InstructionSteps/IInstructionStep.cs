namespace OpenWorkEngine.OpenController.Controllers.Models.InstructionSteps {
  public interface IInstructionStep {
    string SettingValue { get; }

    bool WillChangeSetting { get; }
  }
}
