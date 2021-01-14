using System;
using System.IO;

namespace OpenWorkEngine.OpenController.Lib {
  public class AlertError {
    public AlertError(string name, string message) {
      Name = name;
      Message = message;
    }

    public AlertError(Exception e) {
      Name = GetExceptionErrorName(e);
      Message = e.Message;
    }

    public string Name { get; set; }

    public string Message { get; set; }

    private string GetExceptionErrorName(Exception e) {
      Type t = e.GetType();
      if (t != typeof(UnauthorizedAccessException)) return t.Name;
      Exception? inner = e.InnerException;
      if (inner == null || inner.GetType() != typeof(IOException)) return "Unable to access port";

      if (inner.Message.Equals("Resource busy")) return "This port is already in-use.";
      return inner.Message;

      // System.UnauthorizedAccessException: Access to the port '/dev/tty.AirPods-WirelessiAP' is denied.
      //   ---> System.IO.IOException: Resource busy
    }
  }
}
