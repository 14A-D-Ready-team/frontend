import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processArrayResponse, processResponse } from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { CreateCategoryDto } from "./dto";
import { Category } from "./entity";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(payload: CreateCategoryDto) {
    return this.httpClient
      .post(environment.api.url + "/categories", instanceToPlain(payload))
      .pipe(processResponse(Category));
  }

  public findAll() {
    return this.httpClient
      .get(environment.api.url + "/categories")
      .pipe(processArrayResponse(Category));
  }

  public findBOne(id: number) {
    return this.httpClient
      .get(environment.api.url + "/categories/" + id)
      .pipe(processResponse(Category));
  }

  public update(id: number, payload: Partial<CreateCategoryDto>) {
    return this.httpClient
      .patch(
        environment.api.url + "/categories/" + id,
        instanceToPlain(payload),
      )
      .pipe(processResponse(Category));
  }

  public delete(id: number) {
    return this.httpClient
      .delete(environment.api.url + "/categories/" + id)
      .pipe(processResponse<void>());
  }
}
