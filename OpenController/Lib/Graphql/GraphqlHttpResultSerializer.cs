using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using HotChocolate;
using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class GraphqlHttpResultSerializer : DefaultHttpResultSerializer {
    private GraphqlErrorFilter ErrorFilter { get; }

    public override HttpStatusCode GetStatusCode(IExecutionResult result) {
      // if (result.Errors?.Any() ?? false) {
      //   // return ErrorFilter.GetHighestErrorCode(result.Errors.Select(e => e.Code));
      //   return HttpStatusCode.OK;
      // }

      return base.GetStatusCode(result);
    }

    public GraphqlHttpResultSerializer(GraphqlErrorFilter filter) {
      ErrorFilter = filter;
    }
  }
}
