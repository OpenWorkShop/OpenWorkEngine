using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Workspaces.Models;

namespace OpenWorkEngine.OpenController.Workspaces.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Query)]
  public class WorkspaceQuery {
    [AuthorizeOpenControllerUser]
    [GraphQLName("getWorkspace")]
    public Workspace GetWorkspace([Service] OpenControllerContext context, string workspaceId) =>
      context.Workspaces[workspaceId];

    [AuthorizeOpenControllerUser]
    public List<Workspace> ListWorkspaces([Service] OpenControllerContext context) => context.Workspaces.ToList();
  }
}
