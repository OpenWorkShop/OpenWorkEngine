using System;
using System.Collections;
using System.Collections.Generic;

namespace OpenWorkEngine.OpenController.Controllers.Exceptions {
  public class PortException : Exception {
    private readonly Dictionary<string, object> _data = new();

    public PortException(string msg, string portName) : base(msg) {
      _data.Add("portName", portName);
    }

    public override IDictionary Data => _data;
  }
}
