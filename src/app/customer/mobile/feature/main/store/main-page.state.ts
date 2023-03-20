import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { DeepReadonly } from "@ngxs-labs/entity-state";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { BuffetState } from "@shared/buffet";
import {
  Category,
  CategoryActions,
  CategoryState,
  CategoryStateModel,
  FilterCategoriesQuery,
} from "@shared/category";
import { Product, ProductState } from "@shared/product";

const productsLoadedPerScroll = 6;

export interface MainPageStateModel {
  selectedCategoryId?: number;
  // key: id of the category
  // value: the pagination's data inside a category
  paginationState: Dictionary<{
    productIds: number[];
    remainingItems?: number;
  }>;
}

@State<MainPageStateModel>({
  name: "mainPage",
  defaults: {
    paginationState: {},
  },
})
@Injectable()
export class MainPageState {
  constructor(private store: Store) {}

  public static products(state: MainPageStateModel, products: Product[]) {}

  @Selector([CategoryState.categoriesOfActiveBuffet])
  public static shownCategories(
    state: MainPageStateModel,
    categories: Category[],
  ) {
    return categories;
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
