import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { processArrayResponse, processResponse } from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { EditCategoryDto } from "./dto";
import { Category } from "./entity";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(payload: EditCategoryDto) {
    return this.httpClient
      .post(environment.api.url + "/category", instanceToPlain(payload))
      .pipe(processResponse(Category));
  }

  public findAll() {
    return this.httpClient
      .get(environment.api.url + "/category")
      .pipe(processArrayResponse(Category));
  }

  public findByOne(id: number) {
    return this.httpClient
      .get(environment.api.url + "/category/" + id)
      .pipe(processResponse(Category));
  }

  public update(id: number, payload: Partial<EditCategoryDto>) {
    return this.httpClient
      .patch(environment.api.url + "/category/" + id, instanceToPlain(payload))
      .pipe(processResponse(Category));
  }

  public delete(id: number) {
    return this.httpClient
      .delete(environment.api.url + "/category/" + id)
      .pipe(processResponse<void>());
  }
}
