using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public enum ApiErrorTypes {
    Exception = 0,
    Unauthorized,
    BadRequest,
    Validation,
  };

  public class ApiResultError {
    public string Message { get; }
    public ApiErrorTypes Type { get; }
    public string? Code { get; }
    public IDictionary? Data { get; }

    public IReadOnlyDictionary<string, object?>? Extensions { get; private set; }
    public Exception? Exception { get; private set; }
    public string? StackTrace { get; private set; }

    public ApiResultError(string message, ApiErrorTypes type, string? code = null, IDictionary? data = null) {
      Message = message;
      Type = type;
      Code = code;
      Data = data;
    }

    public Dictionary<string, object> ToApiResponseData() {
      Dictionary<string, object> ret = new() {
        ["message"] = Message,
        ["type"] = Type.ToString(),
        ["code"] = Code ?? "?",
      };
      if (Data != null) {
        ret.Add("data", Data);
      }
      if (Extensions != null) {
        ret.Add("extensions", Extensions);
      }
      if (Exception != null) {
        ret.Add("exception", BuildExceptionError(Exception).ToApiResponseData());
      }
      if (!string.IsNullOrEmpty(StackTrace)) {
        ret.Add("stack", StackTrace.Split("\n").Select(s => s.Trim()).Where(s => !string.IsNullOrWhiteSpace(s)));
      }
      return ret;
    }

    public static ApiResultError BuildExceptionError(Exception e) =>
      new (e.Message, ApiErrorTypes.Exception, e.GetType().Name, e.Data) {
        Exception = e.InnerException,
        StackTrace = e.StackTrace,
      };


    public static ApiResultError BuildUnauthorizedError(string message, string code) =>
      new (message, ApiErrorTypes.Unauthorized, code);


    // // Canonical response types for common error scenarios
    // public static ApiResponse BuildIdentityUnauthorizedObjectErrorResult
    //   (this IExecutor http, params IdentityError[] errors) =>
    //   http.BuildErrorResponseFactory(ApiExceptionMiddleware.BuildIdentityError, errors);
    //
    // public static ApiResponse BuildUnauthorizedObjectResult
    //   (this IExecutor http, object value) =>
    //   http.BuildErrorResponse(ApiExceptionMiddleware.BuildError(value?.ToString(), ApiErrorTypes.Unauthorized));
    //
    // public static ApiResponse BuildBadRequestResult
    //   (this IExecutor http, object value) =>
    //   http.BuildErrorResponse(ApiExceptionMiddleware.BuildError(value?.ToString(), ApiErrorTypes.BadRequest));
  }
}
