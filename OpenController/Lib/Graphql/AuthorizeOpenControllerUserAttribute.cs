using System.Linq;
using System.Reflection;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using OpenWorkEngine.OpenController.Identity.Services;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class AuthorizeOpenControllerUserAttribute : AuthorizeAttribute {
    protected override void TryConfigure(IDescriptorContext context, IDescriptor descriptor, ICustomAttributeProvider element) {
      string[] existingRoles = Roles ?? new string[] {};
      string[] requiredRoles = new[] {OpenControllerRoles.User};
      Roles = existingRoles.Concat(requiredRoles).Distinct().ToArray();
      base.TryConfigure(context, descriptor, element);
    }
  }
}
