using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Programs.Models;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class ProgramsMutation {
    public ProgramFile UploadProgram(
      [Service] OpenControllerContext context,
      ProgramFileUpload fileUpload
    ) => context.Programs.Upload(fileUpload);
  }
}
