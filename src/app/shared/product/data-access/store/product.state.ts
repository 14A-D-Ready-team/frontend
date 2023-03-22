import { defaultEntityState, IdStrategy } from "@ngxs-labs/entity-state";
import { Product } from "../entity";
import { createSelector, Selector, State, StateToken } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ProductService } from "../service";
import * as Actions from "./product.actions";
import { FilterProductsQuery } from "../query";
import { ExtendedEntityState } from "@shared/extended-entity-state";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { ExtendedEntityStateModel } from "@shared/extended-entity-state";
import { PaginatedResponse } from "@shared/api/utils/paginated.response";
import { Dictionary } from "lodash";

export type ProductStateModel = ExtendedEntityStateModel<Product> & {
  productsOfBuffets: Dictionary<number[]>;
};

export const PRODUCT_STATE_TOKEN = new StateToken<ProductStateModel>(
  "product",
);
@State<ProductStateModel>({
  name: PRODUCT_STATE_TOKEN,
  defaults: { ...defaultEntityState(), productsOfBuffets: {} },
})
@Injectable()
export class ProductState extends ExtendedEntityState<
  Product,
  FilterProductsQuery,
  PaginatedResponse<Product>,
  CreateProductDto,
  UpdateProductDto
> {

  public static productsOfBuffets(state: ProductStateModel) {
    return state.productsOfBuffets;
  }

  @Selector([
    ProductState.entitiesMap,
    ProductState.productsOfBuffets,
    ProductState.activeId,
  ])
  public static productsOfActiveBuffet(
    state: ProductState,
    products: Dictionary<Product>,
    productsOfBuffets: Dictionary<string[]>,
    buffetId?: string,
  ) {
    if (!buffetId) {
      return [];
    }
    return productsOfBuffets[+buffetId].map(id => products[+id]);
  }

  public static isAllLoaded(buffetId: number) {
    return createSelector(
      [ProductState],
      (state: ProductStateModel) => !!state.productsOfBuffets[buffetId],
    );
  }

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
