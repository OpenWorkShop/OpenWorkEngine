using System.Collections.Generic;
using System.Linq;
using HotChocolate.Execution;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public static class ExecutionExtensions {
    public static ApiResponse ToApiResponse(this IExecutionResult res, ApiResultMeta meta) {
      ApiResultErrors? errors = res.Errors == null ? null : new ApiResultErrors(res.Errors.Select(ApiResultError.BuildGraphQLError).ToArray());
      IReadOnlyDictionary<string, object?>? data = null;
      if (res is QueryResult qr)
        data = qr.Data;
      else
        Log.Warning("Unknown query response type: {type}", res.GetType());
      return new ApiResponse(data, errors, meta);
    }
  }
}
