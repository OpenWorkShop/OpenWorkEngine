using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class GraphqlDiagnosticEventListener : DiagnosticEventListener {
    private ILogger Log { get; }

    public override IActivityScope ExecuteRequest(IRequestContext context) {
      Log.Debug("[GRAPHQL] execute operation: {@document}#{@operation}", context.Document, context.Operation);
      return base.ExecuteRequest(context);
    }

    public GraphqlDiagnosticEventListener() {
      Log = Serilog.Log.Logger.ForContext(typeof(GraphqlDiagnosticEventListener));
    }
  }
}
