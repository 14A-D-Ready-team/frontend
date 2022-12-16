import { ProductActions, ProductState } from "@shared/product";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { LoadMore, LoadPage } from "./products-list.actions";
import { CategoryStateModel, loadAllCategories } from "@shared/category";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsListStateModel {
  productIds: number[];
}

export const productsLoadedPerScroll = 12;

@State<ProductsListStateModel>({
  name: "productsList",
  defaults: {
    productIds: [],
  },
})
export class ProductsListState {
  constructor(private store: Store) {}

  @Selector([ProductState])
  public static shownProducts(
    state: ProductsListStateModel,
    productState: CategoryStateModel,
  ) {
    return state.productIds.map(id => productState.entities[id]);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {
    loadAllCategories(this.store);
    return ctx.dispatch(
      new ProductActions.LoadPaginated(0, productsLoadedPerScroll),
    );
  }

  @Action(LoadMore)
  public loadMore(ctx: StateContext<ProductsListStateModel>) {
    const state = ctx.getState();

    return ctx.dispatch(
      new ProductActions.LoadPaginated(
        state.productIds.length,
        productsLoadedPerScroll,
      ),
    );
  }
}
