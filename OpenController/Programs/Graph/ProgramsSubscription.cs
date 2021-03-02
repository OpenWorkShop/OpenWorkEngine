using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Programs.Models;
using OpenWorkEngine.OpenController.Programs.Services;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Subscription)]
  public class ProgramsSubscription {
    [Subscribe(With = nameof(SubscribeToProgramFileDirectory))]
    public ProgramFileMeta OnProgramFileMetaDataChanged(
      [Service] ProgramFileManager programFiles,
      string directoryPath,
      [EventMessage] ProgramFileMeta config
    ) => config;

    public ValueTask<IObservable<ProgramFileMeta>> SubscribeToProgramFileDirectory(
      string directoryPath,
      [Service] ProgramFileManager programFiles,
      CancellationToken cancellationToken
    ) => programFiles.SubscribeToTopicId(ProgramTopic.Meta, directoryPath, cancellationToken);
  }
}
