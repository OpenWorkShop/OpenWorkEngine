using System;
using System.Collections;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Exceptions {
  public class PortException : Exception {

    private readonly Dictionary<string, object> _data = new Dictionary<string, object>();
    public override IDictionary Data => _data;

    public PortException(string msg, string portName) : base(msg) {
      _data.Add("portName", portName);
    }
  }
}
