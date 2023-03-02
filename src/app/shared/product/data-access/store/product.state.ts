import { defaultEntityState, IdStrategy } from "@ngxs-labs/entity-state";
import { Product } from "../entity";
import { State } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ProductService } from "../service";
import * as Actions from "./product.actions";
import { FilterProductsQuery } from "../query";
import { ExtendedEntityState } from "@shared/extended-entity-state";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { ExtendedEntityStateModel } from "@shared/extended-entity-state";
import { PaginatedResponse } from "@shared/api/utils/paginated.response";

export type ProductStateModel = ExtendedEntityStateModel<Product>;

@State<ProductStateModel>({
  name: "product",
  defaults: { ...defaultEntityState() },
})
@Injectable()
export class ProductState extends ExtendedEntityState<
  Product,
  FilterProductsQuery,
  PaginatedResponse<Product>,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private productService: ProductService) {
    super({
      storeClass: ProductState,
      _idKey: "id",
      idStrategy: IdStrategy.EntityIdGenerator,
      service: productService,
      actions: Actions,
    });
  }
}
