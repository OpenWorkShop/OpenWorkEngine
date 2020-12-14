using System;
using OpenWorkEngine.OpenController.Lib;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineAlert : AlertError {
    public string Code { get; set; } = default!;

    public MachineAlert(string name, string message) : base(name, message) { }
    public MachineAlert(Exception e) : base(e) { }
  }
}
