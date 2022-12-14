import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "@shared/api";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { Product } from "../entity";

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
}
