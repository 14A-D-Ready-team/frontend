import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Type } from "@angular/core";
import { processResponse } from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { Observable } from "rxjs";

export abstract class ApiService<
  EntityType,
  Query,
  FindResultType,
  CreateDtoType,
  UpdateDtoType,
> {
  constructor(
    protected httpClient: HttpClient,
    protected path: string,
    private entityClass: Type<EntityType>,
  ) {}

  public create(payload: CreateDtoType) {
    return this.httpClient
      .post(environment.api.url + this.path, instanceToPlain(payload))
      .pipe(processResponse(this.entityClass));
  }

  public abstract find(query: Query): Observable<FindResultType>;

  public findOne(id: number) {
    return this.httpClient
      .get(environment.api.url + this.path + id)
      .pipe(processResponse(this.entityClass));
  }

  public update(id: number, payload: Partial<UpdateDtoType>) {
    return this.httpClient
      .patch(environment.api.url + this.path + id, instanceToPlain(payload))
      .pipe(processResponse(this.entityClass));
  }

  public delete(id: number) {
    return this.httpClient
      .delete(environment.api.url + this.path + id)
      .pipe(processResponse<void>());
  }
}
