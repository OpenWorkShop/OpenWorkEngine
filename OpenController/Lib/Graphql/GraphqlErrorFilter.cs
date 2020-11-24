using System;
using System.Collections.Generic;
using System.Net;
using System.Security.Authentication;
using HotChocolate;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class GraphqlErrorFilter : ExceptionStatusCodes, IErrorFilter {
    public IError OnError(IError error) {
      Log.ForContext("Context", "GraphQL").Error(error.Exception, "{@error}", error);
      if (error.Exception != null) {
        error = error.WithCode(GetExceptionErrorCode(error.Exception))
                     .WithMessage(error.Exception.Message);
      }
      return error;
    }
  }
}
