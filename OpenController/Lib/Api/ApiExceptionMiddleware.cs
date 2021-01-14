using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public class ApiExceptionMiddleware {
    // Serves as configuration for ApiBehaviorOptions that require this method signature for exception handling.
    public static IActionResult HandleModelValidationError(ActionContext context) =>
      new ApiResponse(null, new ApiResultErrors(context.ModelState.Keys.SelectMany(
        k => context.ModelState[k].Errors.Select(
          e => new ApiResultError(e.ErrorMessage, ApiErrorTypes.Validation, k, e.Exception?.Data))
      ).ToArray()), context.HttpContext.BuildResultMeta<ApiResultMeta>()).ToJsonResult();

    public Task Invoke(HttpContext http) {
      Exception? ex = http.Features.Get<IExceptionHandlerFeature>()?.Error;
      if (ex == null) return Task.CompletedTask;

      ApiResultErrors errors = new(ApiResultError.BuildExceptionError(ex));
      ApiResponse res = new(null, errors, http.BuildResultMeta<ApiResultMeta>());
      Dictionary<string, object> value = res.ToDictionaryValue();
      return ApiResultExecutor.Write(value, http, res.GetHttpStatusCode());
    }
  }
}
