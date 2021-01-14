using System.Linq;
using System.Net;
using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class GraphqlHttpResultSerializer : DefaultHttpResultSerializer {
    public GraphqlHttpResultSerializer(GraphqlErrorFilter filter, ILogger logger) {
      Log = logger.ForContext(typeof(GraphqlHttpResultSerializer));
      ErrorFilter = filter;
    }

    private ILogger Log { get; }

    private GraphqlErrorFilter ErrorFilter { get; }

    public override HttpStatusCode GetStatusCode(IExecutionResult result) {
      if (result.Errors?.Any() ?? false) {
        Log.Error("[GRAPHQL] {@errors}", result.Errors);
        return ErrorFilter.GetHighestErrorCode(result.Errors.Select(e => e.Code));
      }
      Log.Debug("[GRAPHQL] complete.");

      return base.GetStatusCode(result);
    }
  }
}
