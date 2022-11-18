/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from "@angular/core";
import { ApiException, ErrorCode, processApiError } from "@shared/exceptions";
import { map, Observable } from "rxjs";
import { deserializeResponseData } from "./deserialize-response-data.util";

export function processResponse<T>(responseType?: Type<T>) {
  return function (source: Observable<any>): Observable<T> {
    return source.pipe(
      map(response => deserializeResponse<T>(response, responseType)),
      processApiError(),
    );
  };
}

function deserializeResponse<T>(response: any, responseType?: Type<T>) {
  if (!responseType) {
    return response?.data as T;
  }

  if (!response || typeof response !== "object") {
    throw new ApiException(ErrorCode.InvalidApiResponseException);
  }

  return deserializeResponseData(responseType, response.data);
}
