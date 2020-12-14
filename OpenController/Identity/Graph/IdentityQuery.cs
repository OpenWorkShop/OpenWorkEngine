using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Identity.Services;

namespace OpenWorkEngine.OpenController.Identity.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Query)]
  public class IdentityQuery {

    public async Task<OpenControllerSession> Authenticate([Service] IdentityService identityService, string token) {
      OpenControllerSession session = await identityService.Authenticate(token);
      identityService.Log.Debug("[AUTH] session: {session}", session.ToString());
      return session;
    }
  }
}
