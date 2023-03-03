import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
  ProductStateModel,
} from "@shared/product";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import {
  LoadMore,
  LoadPage,
  Reload,
  RetryLoading,
} from "./products-list.actions";
import {
  CategoryState,
  CategoryStateModel,
  loadAllCategories,
} from "@shared/category";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { DeepReadonly } from "@ngxs-labs/entity-state";
import { FilterChanged } from "../../product-filter";
import { EntityActions } from "@shared/extended-entity-state";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsListStateModel {
  productIds: number[];
  remainingItems?: number;
  query: DeepReadonly<FilterProductsQuery>;
  
}

export const productsLoadedPerScroll = 12;

@State<ProductsListStateModel>({
  name: "buffetsProductsList",
  defaults: {
    productIds: [],
    query: new FilterProductsQuery(),
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

  @Selector([ProductsListState.shownProducts, CategoryState])
  public static hasUnknownCategories(
    state: ProductsListStateModel,
    products: Product[],
    categoryState: CategoryStateModel,
  ) {
    return products.some(
      product => !categoryState.entities[product.categoryId],
    );
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {
    loadAllCategories(this.store).pipe(take(1)).subscribe();

    const state = ctx.getState();
    const query = FilterProductsQuery.createOrCopy({
      ...state.query,
      skip: 0,
      take: productsLoadedPerScroll,
    });

    return ctx.dispatch(new ProductActions.Load(query));
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<ProductsListStateModel>) {
    const state = ctx.getState();
    if (state.remainingItems === 0) {
      return;
    }

    const query = FilterProductsQuery.createOrCopy({
      ...state.query,
      skip: state.productIds.length,
      take: productsLoadedPerScroll,
    });
    return ctx.dispatch(new ProductActions.Load(query));
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
      ...action.entities.map(p => p.id),
    );

    const remaining =
      action.count - (action.query.skip || 0) - action.entities.length;

    ctx.patchState({
      productIds: newIds,
      remainingItems: remaining,
    });
  }

  @Action(RetryLoading)
  public retryLoading(ctx: StateContext<ProductsListStateModel>) {
    loadAllCategories(this.store).pipe(take(1)).subscribe();
    ctx.dispatch(new LoadMore());
  }

  @Action(Reload)
  public reload(ctx: StateContext<ProductsListStateModel>) {
    loadAllCategories(this.store, true).pipe(take(1)).subscribe();

    const state = ctx.getState();
    const numberOfProducts = state.productIds.length;
    const numberOfProductsToLoad =
      Math.max(1, Math.ceil(numberOfProducts / productsLoadedPerScroll)) *
      productsLoadedPerScroll;

    ctx.patchState({
      productIds: [],
      remainingItems: undefined,
    });

    const query = FilterProductsQuery.createOrCopy({
      ...state.query,
      skip: 0,
      take: numberOfProductsToLoad,
    });

    return ctx.dispatch(new ProductActions.Load(query));
  }

  @Action(FilterChanged, { cancelUncompleted: true })
  public filter(
    ctx: StateContext<ProductsListStateModel>,
    action: FilterChanged,
  ) {
    ctx.patchState({
      query: action.filter,
      productIds: [],
      remainingItems: undefined,
    });

    const query = FilterProductsQuery.createOrCopy({
      ...action.filter,
      skip: 0,
      take: productsLoadedPerScroll,
    });

    return ctx.dispatch(new ProductActions.Load(query));
  }
}
