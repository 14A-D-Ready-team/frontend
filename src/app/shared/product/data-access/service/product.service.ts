import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService, ApiServiceWithPagination } from "@shared/api";
import {
  processPaginatedResponse,
  serializeQueryParams,
} from "@shared/serialization";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";

@Injectable({
  providedIn: "root",
})
export class ProductService
  extends ApiService<Product, CreateProductDto, UpdateProductDto>
  implements ApiServiceWithPagination<Product, FilterProductsQuery>
{
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
}
