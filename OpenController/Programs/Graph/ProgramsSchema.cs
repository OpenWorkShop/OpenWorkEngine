using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  public static class ProgramsSchema {
    public static IRequestExecutorBuilder AddProgramsSchema(this IRequestExecutorBuilder builder) =>
      builder
       .AddType<ProgramsQuery>()
       .AddType<ProgramsMutation>()
       .AddType<ProgramsSubscription>();
  }
}
