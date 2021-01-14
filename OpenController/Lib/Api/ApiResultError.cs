using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using HotChocolate;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public enum ApiErrorTypes {
    Exception = 0,
    Unauthorized,
    BadRequest,
    Validation
  }

  public class ApiResultError {
    public ApiResultError(string message, ApiErrorTypes type, string? code = null, IDictionary? data = null) {
      Message = message;
      Type = type;
      Code = code;
      Data = data;
    }

    public string Message { get; }
    public ApiErrorTypes Type { get; }
    public string? Code { get; }
    public IDictionary? Data { get; }

    public IReadOnlyDictionary<string, object?>? Extensions { get; private set; }
    public IReadOnlyList<Location>? Locations { get; private set; }
    public Path? Path { get; private set; }
    public Exception? Exception { get; private set; }
    public string? StackTrace { get; private set; }

    public Dictionary<string, object> ToApiResponseData() {
      Dictionary<string, object> ret = new() {
        ["message"] = Message,
        ["type"] = Type.ToString(),
        ["code"] = Code ?? "?"
      };
      if (Data != null) ret.Add("data", Data);
      if (Locations != null) ret.Add("locations", Locations);
      if (Extensions != null) ret.Add("extensions", Extensions);
      if (Path != null) ret.Add("path", Path);
      if (Exception != null) ret.Add("exception", BuildExceptionError(Exception).ToApiResponseData());
      if (!string.IsNullOrEmpty(StackTrace)) ret.Add("stack", StackTrace.Split("\n").Select(s => s.Trim()).Where(s => !string.IsNullOrWhiteSpace(s)));
      return ret;
    }

    public static ApiResultError BuildExceptionError(Exception e) =>
      new(e.Message, ApiErrorTypes.Exception, e.GetType().Name, e.Data) {
        Exception = e.InnerException,
        StackTrace = e.StackTrace
      };

    public static ApiResultError BuildUnauthorizedError(string message, string code) =>
      new(message, ApiErrorTypes.Unauthorized, code);

    public static ApiResultError BuildGraphQLError(IError e) =>
      new(e.Message, ApiErrorTypes.Exception, e.Code) {
        Locations = e.Locations,
        Path = e.Path,
        Exception = e.Exception
      };
  }
}
