import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { processPaginatedResponse, serializeQueryParams } from "@shared/serialization";
import { CreateBuffetDto, UpdateBuffetDto } from "../dto";
import { Buffet } from "../entity";
import { SearchBuffetsQuery } from "../query";

@Injectable({
  providedIn: "root",
})
export class BuffetService extends ApiService<
  Buffet,
  CreateBuffetDto,
  UpdateBuffetDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "/buffet/", Buffet);
  }

  public find(query: SearchBuffetsQuery) {
    return this.httpClient
      .get<Buffet[]>(environment.api.url + this.path, {
        params: serializeQueryParams(query),
      })
      .pipe(processPaginatedResponse(Buffet));
  }
}
