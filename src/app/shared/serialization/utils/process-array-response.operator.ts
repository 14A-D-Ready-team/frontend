/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from "@angular/core";
import { ApiException, ErrorCode, processApiError } from "@shared/exceptions";
import { map, Observable } from "rxjs";
import { deserializeResponseData } from "./deserialize-response-data.util";

export function processArrayResponse<T>(responseType?: Type<T>) {
  return function (source: Observable<any>): Observable<T[]> {
    return source.pipe(
      map(response => deserializeArrayResponse<T>(response, responseType)),
      processApiError(),
    );
  };
}

function deserializeArrayResponse<T>(response: any, responseType?: Type<T>) {
  if (!responseType) {
    return response.data as T[];
  }

  if (
    !response ||
    typeof response !== "object" ||
    !Array.isArray(response.data)
  ) {
    throw new ApiException(ErrorCode.InvalidApiResponseException);
  }

  return response.data.map((item: any) =>
    deserializeResponseData(responseType, item),
  );
}
