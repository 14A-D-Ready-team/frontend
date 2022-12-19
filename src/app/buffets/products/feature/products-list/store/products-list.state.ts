import {
  ProductActions,
  ProductState,
  ProductStateModel,
} from "@shared/product";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { LoadMore, LoadPage, Reload } from "./products-list.actions";
import { CategoryState, loadAllCategories } from "@shared/category";
import { Injectable } from "@angular/core";
import { switchMap, take } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsListStateModel {
  productIds: number[];
  remainingItems?: number;
}

export const productsLoadedPerScroll = 12;

@State<ProductsListStateModel>({
  name: "buffetsProductsList",
  defaults: {
    productIds: [],
  },
})
@Injectable()
export class ProductsListState {
  constructor(private store: Store) {}

  @Selector([ProductState])
  public static shownProducts(
    state: ProductsListStateModel,
    productState: ProductStateModel,
  ) {
    return state.productIds.map(id => productState.entities[id]).filter(p => p);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {
    loadAllCategories(this.store).pipe(take(1)).subscribe();
    return ctx.dispatch(new ProductActions.Load(0, productsLoadedPerScroll));
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<ProductsListStateModel>) {
    const state = ctx.getState();
    if (state.remainingItems === 0) {
      return;
    }

    return ctx.dispatch(
      new ProductActions.Load(state.productIds.length, productsLoadedPerScroll),
    );
  }

  @Action(ProductActions.LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<ProductsListStateModel>,
    action: ProductActions.LoadingSucceeded,
  ) {
    const state = ctx.getState();

    const newIds = [...state.productIds];
    newIds.splice(
      action.query.skip || 0,
      action.query.take || state.productIds.length,
      ...action.products.map(p => p.id),
    );

    const remaining =
      action.count - (action.query.skip || 0) - action.products.length;

    ctx.patchState({
      productIds: newIds,
      remainingItems: remaining,
    });
  }

  @Action(Reload)
  public reload(ctx: StateContext<ProductsListStateModel>) {
    const state = ctx.getState();
    const numberOfProducts = state.productIds.length;
    const numberOfProductsToLoad =
      Math.ceil(numberOfProducts / productsLoadedPerScroll) *
      productsLoadedPerScroll;

    ctx.setState({
      productIds: [],
    });

    return ctx.dispatch(new ProductActions.Load(0, numberOfProductsToLoad));
  }
}
