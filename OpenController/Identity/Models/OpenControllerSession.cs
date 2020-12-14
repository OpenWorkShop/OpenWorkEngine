namespace OpenWorkEngine.OpenController.Identity.Models {
  public class OpenControllerSession {
    public string Token { get; set; } = default!;

    public OpenControllerUser User { get; set; } = default!;

    public string[] Roles { get; set; } = default!;

    public override string ToString() => $"{User} <r:{string.Join(',', Roles)}>";
  }
}
