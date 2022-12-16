import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";
import { FilterProductsQuery } from "../query";

@Injectable({
  providedIn: "root",
})
export class ProductService extends ApiService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "/product", Product);
  }

  public find(query: FilterProductsQuery) {
    return this.httpClient.get<Product[]>(environment.api.url + this.path, {});
  }
}
