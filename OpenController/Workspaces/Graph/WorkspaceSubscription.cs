using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Workspaces.Enums;
using OpenWorkEngine.OpenController.Workspaces.Models;
using OpenWorkEngine.OpenController.Workspaces.Services;

namespace OpenWorkEngine.OpenController.Workspaces.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Subscription)]
  public class WorkspaceSubscription {
    // General change method.
    // Workspace added, updated, or deleted... see its state.
    [Subscribe(With = nameof(SubscribeToAllWorkspaceState))]
    [AuthorizeOpenControllerUser]
    public Task<Workspace> OnWorkspaceChange([EventMessage] Workspace workspace) => Task.FromResult(workspace);

    public ValueTask<IObservable<Workspace>> SubscribeToAllWorkspaceState(
      [Service] WorkspaceManager workspaceManager,
      CancellationToken ct
    ) => workspaceManager.SubscribeToAll(WorkspaceTopic.State, ct);
  }
}
