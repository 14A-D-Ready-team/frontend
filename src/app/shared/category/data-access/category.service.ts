import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { processArrayResponse, processResponse, serializeQueryParams } from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { EditCategoryDto } from "./dto";
import { Category } from "./entity";
import { FilterCategoriesQuery } from "./query";

@Injectable({
  providedIn: "root",
})
export class CategoryService extends ApiService<
  Category,
  FilterCategoriesQuery,
  Category[],
  EditCategoryDto,
  EditCategoryDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "/category/", Category);
  }

  public find(query: FilterCategoriesQuery) {
    return this.httpClient
      .get(environment.api.url + "/category", serializeQueryParams(query))
      .pipe(processArrayResponse(Category));
  }
}
