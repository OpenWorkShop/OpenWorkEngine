using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib {
  public class ExceptionStatusCodes {
    public HttpStatusCode Default { get; } = HttpStatusCode.InternalServerError;

    public Dictionary<HttpStatusCode, Func<Exception, bool>> Map { get; } = new() {
      [HttpStatusCode.NotFound] = CheckType(typeof(KeyNotFoundException), typeof(InvalidOperationException)),
      [HttpStatusCode.Unauthorized] = CheckType(typeof(AuthenticationException),typeof(UnauthorizedAccessException)),
      [HttpStatusCode.Forbidden] = CheckType(typeof(AccessViolationException)),
      [HttpStatusCode.NotAcceptable] = CheckType(typeof(ArgumentException),typeof(ArgumentNullException)),
      [HttpStatusCode.NotImplemented] = CheckType(typeof(NotImplementedException)),
    };

    private static Func<Exception, bool> CheckType(params Type[] types) =>
      (e) => types.Any(t => e.GetType().IsAssignableTo(t));

    public string? GetExceptionErrorCode(Exception ex) {
      foreach (HttpStatusCode key in Map.Keys) {
        if (Map[key].Invoke(ex)) {
          return key.ToString();
        }
      }
      return null;
    }

    // Convert the string codes into HttpStatusCodes and find the highest.
    public HttpStatusCode GetHighestErrorCode(IEnumerable<string?> codes) =>
        codes.Where(e => e != null)
             .Select(e => Enum.TryParse(e!, true, out HttpStatusCode code) ? code : Default)
             .Distinct()
             .Max();
  }
}
