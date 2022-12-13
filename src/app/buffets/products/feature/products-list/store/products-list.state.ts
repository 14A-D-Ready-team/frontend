import { Action, State, StateContext } from "@ngxs/store";
import { LoadPage } from "./products-list.actions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductsListStateModel {}

@State<ProductsListStateModel>({
  name: "productsList",
  defaults: {},
})
export class ProductsListState {
  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductsListStateModel>) {}
}
