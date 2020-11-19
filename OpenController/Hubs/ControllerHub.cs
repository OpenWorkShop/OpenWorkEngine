using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Serilog;

namespace OpenController.Hubs {
  public class ControllerHub : Hub {
    public async Task SendMessage(string user, string message) {
      Log.Warning("User {user} said {message}", user, message);
      await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
  }
}
