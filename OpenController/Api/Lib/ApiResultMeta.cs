using System.Collections.Generic;

namespace OpenController.Api.Lib {
  public class ApiResultMeta : Dictionary<string, object> {
    public const string RedirectUrlKey = "redirectUrl";
    public const string TraceIdKey = "traceId";
    public const string OperationNameKey = "operationName";

    public static ApiResultMeta ForRedirectUrl(string? rUrl) =>
      rUrl != null ? new ApiResultMeta() {[RedirectUrlKey] = rUrl} : new ApiResultMeta();
  }
}
