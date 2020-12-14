using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Workspaces.Models;

namespace OpenWorkEngine.OpenController.Workspaces.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class WorkspaceMutation {
    [AuthorizeOpenControllerUser]
    public Workspace CreateWorkspace(
      [Service] OpenControllerContext controllerContext,
      WorkspaceSettings workspaceSettings
    ) => controllerContext.Workspaces.Create(workspaceSettings);

    [AuthorizeOpenControllerUser]
    public Workspace UpdateWorkspace(
      [Service] OpenControllerContext controllerContext,
      WorkspaceSettings workspaceSettings
    ) => controllerContext.Workspaces.Update(workspaceSettings);

    [AuthorizeOpenControllerUser]
    public Workspace DeleteWorkspace([Service] OpenControllerContext controllerContext, string workspaceId)
      => controllerContext.Workspaces.Delete(workspaceId);

    [AuthorizeOpenControllerUser]
    public Task<Workspace> OpenWorkspace([Service] OpenControllerContext controllerContext, string workspaceId)
      => controllerContext.Workspaces[workspaceId].Open();
  }
}
