/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from "@angular/core";
import { map, Observable } from "rxjs";
import { deserializeResponseData } from "./deserialize-response-data.util";

export function processResponse<T>(responseType: Type<T>) {
  return function (source: Observable<any>): Observable<T | null> {
    return source.pipe(
      map(response => deserializeResponse<T>(responseType, response)),
    );
  };
}

function deserializeResponse<T>(responseType: Type<T>, response: any) {
  if (typeof response !== "object") {
    return null;
  }

  return deserializeResponseData(responseType, response.data);
}
