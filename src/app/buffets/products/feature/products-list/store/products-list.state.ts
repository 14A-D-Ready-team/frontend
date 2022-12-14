import { Action, State, StateContext } from "@ngxs/store";
import { LoadMore, LoadPage } from "./products-list.actions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsListStateModel {}

export const loadedPerScroll = 12;

@State<ProductsListStateModel>({
  name: "productsList",
  defaults: {},
})
export class ProductsListState {
  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {}

  @Action(LoadMore)
  public loadMore(ctx: StateContext<ProductsListStateModel>) {}
}
