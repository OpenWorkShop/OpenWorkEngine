using System;
using OpenWorkEngine.OpenController.Lib;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineAlert : AlertError {
    public MachineAlert(string name, string message, string code = "") : base(name, message) {
      Code = code;
    }

    // public MachineAlert(Exception e) : base(e) { }
    public string Code { get; set; } = default!;
  }
}
