using System;
using System.Collections;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Messages;

namespace OpenWorkEngine.OpenController.Controllers.Exceptions {
  public class FirmwareException : Exception {
    private readonly Dictionary<string, object> _data = new Dictionary<string, object>();
    public override IDictionary Data => _data;

    public FirmwareException(string msg, MachineDetectedFirmware fw, FirmwareRequirement req) : base(msg) {
      _data.Add("detected", fw);
      _data.Add("required", req);
    }
  }
}
