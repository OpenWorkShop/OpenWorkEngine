using System.Collections.Generic;

namespace OpenController.Api.Lib {
  // Simple wrapper for type convenience.
  public class ApiResultErrors : List<ApiResultError> {
    public ApiResultErrors(params ApiResultError[] errors) {
      this.AddRange(errors);
    }

    public ApiResultError? GetMostSevereError() {
      ApiResultError? err = null;
      ApiErrorTypes type = ApiErrorTypes.BadRequest;
      for (int x = 0; x < Count; x++) {
        if (err == null || this[x].Type < type) {
          type = this[x].Type;
          err = this[x];
        }
      }
      return err;
    }
  }
}
