/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from "@angular/common/http";
import { Type } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { deserializeResponseData } from "./deserialize-response-data.util";

export function processResponse<T>(responseType?: Type<T>) {
  return function (source: Observable<any>): Observable<T | null> {
    return source.pipe(
      map(response => deserializeResponse<T>(response, responseType)),
      catchError(err => {
        if (!(err instanceof HttpErrorResponse)) {
        }
        throw err;
      }),
    );
  };
}

function deserializeResponse<T>(response: any, responseType?: Type<T>) {
  if (!response || typeof response !== "object") {
    return null;
  }

  if (!responseType) {
    return response.data as T;
  }

  return deserializeResponseData(responseType, response.data);
}
