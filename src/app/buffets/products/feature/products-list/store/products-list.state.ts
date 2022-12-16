import { LoadPaginated, ProductState } from "@shared/product";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoadMore, LoadPage } from "./products-list.actions";
import { CategoryStateModel } from "@shared/category";

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
  @Selector([ProductState])
  public static shownProducts(
    state: ProductsListStateModel,
    productState: CategoryStateModel,
  ) {
    return state.productIds.map(id => productState.entities[id]);
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {}

  @Action(LoadMore)
  public loadMore(ctx: StateContext<ProductsListStateModel>) {
    const state = ctx.getState();

    return ctx.dispatch(
      new LoadPaginated(state.productIds.length, productsLoadedPerScroll),
    );
  }
}
