import { ApiRequestStatus, TargetedRequestStatus } from "@shared/api";
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
import { LoadingFailed, LoadingSucceeded, Load } from "./product.actions";
import { FilterProductsQuery } from "../query";
import { catchError, finalize, switchMap } from "rxjs";

export type ProductStateModel = EntityStateModel<Product> & {
  updateStatus?: TargetedRequestStatus;
  createStatus?: ApiRequestStatus;
  deleteStatus?: TargetedRequestStatus;
};

@State<ProductStateModel>({
  name: "product",
  defaults: { ...defaultEntityState() },
})
@Injectable()
export class ProductState extends EntityState<Product> {
  constructor(private productService: ProductService) {
    super(ProductState, "id", IdStrategy.EntityIdGenerator);
  }

  @Action(Load)
  public load(ctx: StateContext<ProductStateModel>, action: Load) {
    ctx.dispatch(new SetLoading(ProductState, true));
    ctx.dispatch(new SetError(ProductState, undefined));

    const query = new FilterProductsQuery({
      skip: action.skip,
      take: action.take,
    });

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
