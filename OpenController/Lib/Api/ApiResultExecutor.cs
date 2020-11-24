using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public class ApiResultExecutor : IActionResultExecutor<JsonResult> {
    public Task ExecuteAsync(ActionContext context, JsonResult result) {
      object output = result.Value;
      return Write(output, context.HttpContext, result.StatusCode ?? StatusCodes.Status200OK);
    }

    public static Task Write(object res, HttpContext context, int statusCode = StatusCodes.Status200OK) {
      context.Response.StatusCode = statusCode;
      context.Response.ContentType = "application/json";
      JObject jobj = JObject.FromObject(res);
      return context.Response.WriteAsync(jobj.ToString(Formatting.Indented));
    }
  }
}
