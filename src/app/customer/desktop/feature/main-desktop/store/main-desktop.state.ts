import { Injectable } from "@angular/core";
import { State, Store, Selector } from "@ngxs/store";
import { CategoryState, Category } from "@shared/category";
import { ProductState, ProductStateModel } from "@shared/product";
import { Dictionary } from "lodash";

const productsLoadedPerScroll = 6;

export interface MainDesktopStateModel {
  // key: id of the category
  // value: the pagination's data inside a category
  paginationState: Dictionary<{
    productIds: number[];
    remainingItems?: number;
  }>;
}

@State<MainDesktopStateModel>({
  name: "mainDesktop",
  defaults: {
    paginationState: {},
  },
})
@Injectable()
export class MainDesktopState {
  constructor(private store: Store) {}

  @Selector()
  public static products() {}

  @Selector([CategoryState.categoriesOfActiveBuffet])
  public static shownCategories(
    state: MainDesktopStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector([ProductState])
  public static shownProducts(
    state: MainDesktopStateModel,
    productState: ProductStateModel,
  ) {
    return state.paginationState.productIds.productIds.map(id => productState.entities[id]).filter(p => p);
  }

  // Set selected category
  // * initialize paginationState for the category

  // load more products
  // * load more products of a category
  // * productIds's length: that many products are loaded (skip)
  // * remainingItems: the number of products left to load, server returns this with each response (PaginatedResponse)
  // * if remainingItems is 0, then there are no more products to load
  // * if there are more remaining than productsLoadedPerScroll, only load productsLoadedPerScroll
}