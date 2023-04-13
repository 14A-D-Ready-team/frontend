import {
  CreateOrReplace,
  defaultEntityState,
  IdStrategy,
} from "@ngxs-labs/entity-state";
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
import { Dictionary } from "@/types";

export type ProductStateModel = ExtendedEntityStateModel<Product> & {
  productsOfBuffets: Dictionary<number[]>;
};

export const PRODUCT_STATE_TOKEN = new StateToken<ProductStateModel>("product");
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

  public static entityById(id: number) {
    return createSelector(
      [ProductState.entitiesMap],
      (entities: Dictionary<Product>) => entities[id],
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

  @Action(Actions.LoadById, { cancelUncompleted: true })
  public loadById(
    ctx: StateContext<ProductStateModel>,
    action: Actions.LoadById,
  ) {
    return this.productService
      .findOne(action.id)
      .pipe(
        switchMap(product =>
          ctx.dispatch(new CreateOrReplace(ProductState, product)),
        ),
      );
  }
}
