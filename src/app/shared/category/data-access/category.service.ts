import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { processArrayResponse, processResponse } from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { EditCategoryDto } from "./dto";
import { Category } from "./entity";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends ApiService<
  Category,
  EditCategoryDto,
  EditCategoryDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "/category", Category);
  }

  public findAll() {
    return this.httpClient
      .get(environment.api.url + "/category")
      .pipe(processArrayResponse(Category));
  }
}
