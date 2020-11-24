using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace OpenWorkEngine.OpenController.Lib.Api {
  public class ApiResponse {
    public ApiResultMeta Meta { get; }

    private ApiResultErrors Errors { get; }

    private readonly object? _data;

    // What key to return, i.e., "identity.me" (for RestQL)
    public string? ResponsePath { get; set; } = null;

    public ApiResultError? Error => Errors.GetMostSevereError();

    public ApiResponse(object? data, ApiResultErrors? errors, ApiResultMeta? meta = null) {
      Errors = errors ?? new ApiResultErrors();
      Meta = meta ?? new ApiResultMeta();
      _data = data;
    }

    public object? Extract(params string[] keys) => Extract(_data as IReadOnlyDictionary<string, object?>, keys.ToList());

    private object? Extract(IReadOnlyDictionary<string, object?>? data, List<string> keys) {
      if (data == null || !keys.Any()) {
        return data;
      }
      string key = keys.First();
      keys.RemoveAt(0);
      if (!data.ContainsKey(key)) {
        return null;
      }
      object? val = data[key];
      if (!keys.Any()) {
        return val;
      }
      return Extract(val as IReadOnlyDictionary<string, object?>, keys);
    }

    public Dictionary<string, object> ToDictionaryValue() {
      Dictionary<string, object> res = new Dictionary<string, object>();
      if (Errors.Any()) {
        res.Add("errors", Errors.Select(e => e.ToApiResponseData()));
      } else {
        object? data = string.IsNullOrWhiteSpace(ResponsePath) ? _data : Extract(ResponsePath.Split('.').ToArray());
        res.Add("data", data ?? new { });
      }
      if (Meta.Any()) {
        res.Add("meta", Meta);
      }
      return res;
    }
  }
}
