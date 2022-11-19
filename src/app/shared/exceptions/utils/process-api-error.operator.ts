import { HttpErrorResponse } from "@angular/common/http";
import { plainToInstance } from "class-transformer";
import { catchError, Observable } from "rxjs";
import { ApiException } from "./api.exception";
import { ErrorCode } from "./error-code.enum";
import { InvalidDataException } from "./invalid-data.exception";

export function processApiError() {
  return function (source: Observable<any>): Observable<any> {
    return source.pipe(
      catchError(err => {
        if (!(err instanceof HttpErrorResponse)) {
          throw err;
        }
        const httpErrorResponse = err as HttpErrorResponse;

        const errorCode = httpErrorResponse.error?.errorCode as ErrorCode;
        checkIfUnknownError(errorCode);
        checkIfInvalidDataException(errorCode, httpErrorResponse.error);
        throwApiException(httpErrorResponse.error);
      }),
    );
  };
}

function checkIfUnknownError(errorCode: ErrorCode) {
  if (!errorCode) {
    throw new ApiException(ErrorCode.UnknownException);
  }
}

function checkIfInvalidDataException(errorCode: ErrorCode, error: any) {
  if (errorCode === ErrorCode.InvalidDataException) {
    throw plainToInstance(InvalidDataException, error);
  }
}

function throwApiException(error: any): never {
  throw plainToInstance(ApiException, error);
}
