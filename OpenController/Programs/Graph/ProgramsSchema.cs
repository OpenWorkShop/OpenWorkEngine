using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Settings.Graph;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  public static class ProgramsSchema {
    public static IRequestExecutorBuilder AddProgramsSchema(this IRequestExecutorBuilder builder) =>
      builder
       .AddType<ProgramsQuery>()
       .AddType<ProgramsMutation>();
  }
}
