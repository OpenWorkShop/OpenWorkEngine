using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Programs.Messages;
using OpenWorkEngine.OpenController.Programs.Models;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class ProgramsMutation {
    [AuthorizeOpenControllerUser]
    [GraphQLDescription("Create a metadata object to represent a file selection before uploading.")]
    public ProgramFileMeta SelectProgramFile(
      [Service] OpenControllerContext context,
      ClientFileUpload fileUpload
    ) => context.Programs.SelectFile(fileUpload);

    [AuthorizeOpenControllerUser]
    [GraphQLDescription("Accept the text (body) of a file and (over)write the file on the server.")]
    public async Task<ProgramFile> UploadProgramFile(
      [Service] OpenControllerContext context,
      [Service] ICurrentUser<OpenControllerUser> user,
      ProgramFileUpload fileUpload
    ) => await context.Programs.UploadFile(await user.GetProfile(), fileUpload);

    [AuthorizeOpenControllerUser]
    [GraphQLDescription("Open a program file by its name, parsing the contents.")]
    public Task<ProgramFile> LoadProgram([Service] OpenControllerContext context, string name) =>
      context.Programs.Load(name);
  }
}
