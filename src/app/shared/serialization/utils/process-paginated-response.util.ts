import { Type } from "@angular/core";
import { PaginatedResponse } from "@shared/api/utils/paginated.response";
import { processApiError } from "@shared/exceptions";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { processResponse } from "./process-response.operator";

export function processPaginatedResponse<T>(responseType?: Type<T>) {
  return function (source: Observable<any>): Observable<PaginatedResponse<T>> {
    return source.pipe(
      processResponse(PaginatedResponse),
      map(response =>
        responseType
          ? deserializePaginatedItems(response, responseType)
          : response,
      ),
      processApiError(),
    );
  };
}

function deserializePaginatedItems<T>(
  response: PaginatedResponse<any>,
  responseType: Type<T>,
): PaginatedResponse<T> {
  response.items = response.items.map(item =>
    plainToInstance(responseType, item),
  );
  return response;
}
