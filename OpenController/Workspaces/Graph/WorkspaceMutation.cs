using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Workspaces.Models;
using OpenWorkEngine.OpenController.Workspaces.Services;

namespace OpenWorkEngine.OpenController.Workspaces.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class WorkspaceMutation {
    [AuthorizeOpenControllerUser]
    public Workspace CreateWorkspace(
      [Service] OpenControllerContext openControllerContext,
      WorkspaceSettings workspaceSettings
    ) => openControllerContext.Workspaces.Create(workspaceSettings);

    [AuthorizeOpenControllerUser]
    public Workspace UpdateWorkspace(
      [Service] OpenControllerContext openControllerContext,
      WorkspaceSettings workspaceSettings
    ) => openControllerContext.Workspaces.Update(workspaceSettings);

    [AuthorizeOpenControllerUser]
    public Workspace DeleteWorkspace([Service] OpenControllerContext openControllerContext, string workspaceId)
      => openControllerContext.Workspaces.Delete(workspaceId);

    [AuthorizeOpenControllerUser]
    public Task<Workspace> OpenWorkspace([Service] OpenControllerContext openControllerContext, string workspaceId)
      => openControllerContext.Workspaces[workspaceId].Open();

    [AuthorizeOpenControllerUser]
    public Task<Workspace> CloseWorkspace([Service] OpenControllerContext openControllerContext, string workspaceId)
      => openControllerContext.Workspaces[workspaceId].Close();

    [AuthorizeOpenControllerUser]
    public Task<Workspace> ChangeWorkspacePort(
      [Service] OpenControllerContext openControllerContext,
      string workspaceId,
      string portName
    ) => openControllerContext.Workspaces.ChangePort(workspaceId, portName);

    [AuthorizeWriteControllers]
    public Controller ControlMachine(
      [Service] OpenControllerContext openControllerContext,
      string workspaceId
    ) => openControllerContext.Controllers[
      openControllerContext.Workspaces[workspaceId].PortName
    ];
  }
}
