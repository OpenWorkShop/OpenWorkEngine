using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OpenWorkEngine.OpenController.Identity.Graph {
  public static class IdentitySchema {
    public static IRequestExecutorBuilder AddOpenControllerIdentitySchema(this IRequestExecutorBuilder builder) =>
      builder
       .AddType<IdentityQuery>();
  }
}
