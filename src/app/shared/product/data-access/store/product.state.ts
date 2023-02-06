import {
  CreateOrReplace,
  defaultEntityState,
  EntityState,
  EntityStateModel,
  IdStrategy,
  SetError,
  SetLoading,
} from "@ngxs-labs/entity-state";
import { Product } from "../entity";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ProductService } from "../service";
import {
  Create,
  CreateFailed,
  CreateSucceeded,
  Delete,
  DeleteFailed,
  DeleteSucceeded,
  Load,
  LoadingFailed,
  LoadingSucceeded,
  Update,
  UpdateFailed,
  UpdateSucceeded,
} from "./product.actions";
import { FilterProductsQuery } from "../query";
import { catchError, finalize, switchMap } from "rxjs";
import { ExtendedEntityState } from "@shared/extended-entity-state";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { ExtendedEntityStateModel } from "@shared/extended-entity-state/utils";

export type ProductStateModel = ExtendedEntityStateModel<Product>;

@State<ProductStateModel>({
  name: "product",
  defaults: { ...defaultEntityState() },
})
@Injectable()
export class ProductState extends ExtendedEntityState<
  Product,
  FilterProductsQuery,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(private productService: ProductService) {
    super({
      storeClass: ProductState,
      _idKey: "id",
      idStrategy: IdStrategy.EntityIdGenerator,
      service: productService,
      actions: {
        Create,
        CreateFailed,
        CreateSucceeded,
        Delete,
        DeleteFailed,
        DeleteSucceeded,
        Load,
        LoadingFailed,
        LoadingSucceeded,
        Update,
        UpdateFailed,
        UpdateSucceeded,
      },
    });
  }

  @Action(Load, { cancelUncompleted: true })
  public load(ctx: StateContext<ProductStateModel>, action: Load) {
    ctx.dispatch(new SetLoading(ProductState, true));
    ctx.dispatch(new SetError(ProductState, undefined));

    const query = action.query;

    return this.productService.find(query).pipe(
      switchMap(response =>
        ctx.dispatch(
          new LoadingSucceeded(query, response.items, response.count),
        ),
      ),
      catchError(error => ctx.dispatch(new LoadingFailed(error))),
      finalize(() => ctx.dispatch(new SetLoading(ProductState, false))),
    );
  }

  @Action(LoadingFailed)
  public loadingFailed(
    ctx: StateContext<ProductStateModel>,
    action: LoadingFailed,
  ) {
    return ctx.dispatch(new SetError(ProductState, action.error));
  }

  @Action(LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<ProductStateModel>,
    action: LoadingSucceeded,
  ) {
    return ctx.dispatch(new CreateOrReplace(ProductState, action.products));
  }
}
