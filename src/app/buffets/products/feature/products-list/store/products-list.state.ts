import { LoadPaginated } from "@shared/product";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoadMore, LoadPage } from "./products-list.actions";
import { CategoryState, CategoryStateModel } from "@shared/category";

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
  @Selector([CategoryState])
  public static shownProducts(
    state: ProductsListStateModel,
    categoryState: CategoryStateModel,
  ) {
    return state.productIds.map(id => categoryState.entities[id]);
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
