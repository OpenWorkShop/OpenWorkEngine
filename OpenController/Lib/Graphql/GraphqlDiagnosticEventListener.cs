using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;
using HotChocolate.Resolvers;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class GraphqlDiagnosticEventListener : DiagnosticEventListener {
    public GraphqlDiagnosticEventListener() => Log = Serilog.Log.Logger.ForContext(typeof(GraphqlDiagnosticEventListener));

    private ILogger Log { get; }

    public override IActivityScope ExecuteRequest(IRequestContext context) {
      Log.Debug("[GRAPHQL] [EXECUTE] {operationName}", context.Request.OperationName);
      return base.ExecuteRequest(context);
    }

    public override IActivityScope ResolveFieldValue(IMiddlewareContext context) =>
      // Log.Debug("[GRAPHQL] resolved: {@result}", context);
      base.ResolveFieldValue(context);
  }
}
