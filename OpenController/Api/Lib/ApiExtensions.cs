using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OpenController.Api.Lib {
  public static class ApiExtensions {
    public static int GetHttpStatusCode(this ApiResponse apiResponse) {
      ApiResultError? error = apiResponse.Error;
      if (error == null) {
        return StatusCodes.Status200OK;
      }

      if (error?.Type == ApiErrorTypes.Exception) {
        return StatusCodes.Status500InternalServerError;
      } else if (error?.Type == ApiErrorTypes.Unauthorized) {
        return StatusCodes.Status401Unauthorized;
      } else if (error?.Type == ApiErrorTypes.Validation) {
        return StatusCodes.Status403Forbidden;
      } else if (error?.Type == ApiErrorTypes.BadRequest) {
        return StatusCodes.Status400BadRequest;
      }
      return StatusCodes.Status500InternalServerError;
    }

    public static JsonResult ToJsonResult(this ApiResponse apiResponse) =>
      new JsonResult(apiResponse.ToDictionaryValue()) {StatusCode = apiResponse.GetHttpStatusCode()};

    public static TMeta BuildResultMeta<TMeta>(this HttpContext http, TMeta? meta = null)
      where TMeta : Dictionary<string, object>
    {
      meta ??= new ApiResultMeta() as TMeta;
      if (meta == null) {
        throw new ArgumentException($"Invalid meta type {typeof(TMeta)}");
      }
      if (!meta.ContainsKey(ApiResultMeta.TraceIdKey)) {
        meta[ApiResultMeta.TraceIdKey] = http.TraceIdentifier;
      }
      return meta;
    }
  }
}
