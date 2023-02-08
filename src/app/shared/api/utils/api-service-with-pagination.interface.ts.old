import { Observable } from "rxjs";
import { PaginatedResponse } from "./paginated.response";

export interface ApiServiceWithPagination<T, Q> {
  find(query: Q): Observable<PaginatedResponse<T>>;
}
