import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { PaginatedResponse } from "@shared/api";
import { FilterCategoriesQuery } from "@shared/category";
import {
  classTransformerConfig,
  createFormData,
  processPaginatedResponse,
  serializeQueryParams,
} from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";

@Injectable({
  providedIn: "root",
})
export class ProductService extends ApiService<
  Product,
  FilterCategoriesQuery,
  PaginatedResponse<Product>,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "/product/", Product);
  }

  public find(query: FilterProductsQuery) {
    return this.httpClient
      .get<Product[]>(environment.api.url + this.path, {
        params: serializeQueryParams(query),
      })
      .pipe(processPaginatedResponse(Product));
  }

  protected serialize(payload: CreateProductDto | UpdateProductDto) {
    const transformed = instanceToPlain(payload, classTransformerConfig);
    return createFormData(transformed);
  }
}
