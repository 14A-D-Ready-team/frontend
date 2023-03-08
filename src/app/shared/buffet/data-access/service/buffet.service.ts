import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService, PaginatedResponse } from "@shared/api";
import { processPaginatedResponse, serializeFormData, serializeQueryParams } from "@shared/serialization";
import { CreateBuffetDto, CreateInviteTokenDto, UpdateBuffetDto } from "../dto";
import { Buffet, BuffetInviteToken } from "../entity";
import { SearchBuffetsQuery } from "../query";

@Injectable({
  providedIn: "root",
})
export class BuffetService extends ApiService<
  Buffet,
  SearchBuffetsQuery,
  PaginatedResponse<Buffet>,
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

  public createInvite(dto: CreateInviteTokenDto) {
    return this.httpClient.post<BuffetInviteToken>(environment.api.url + this.path + "invite", dto);
  }

  protected serialize(payload: CreateBuffetDto | UpdateBuffetDto) {
    return serializeFormData(payload);
  }
}
