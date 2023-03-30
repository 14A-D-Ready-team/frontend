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
import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
} from "@shared/product";
import { first, take } from "lodash";
import {
  LoadMoreProducts,
  SelectCategory,
  UnloadProducts,
} from "./main-page.actions";

const productsLoadedPerScroll = 2;
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

  @Selector([ProductState.entitiesMap])
  public static shownProducts(
    state: MainPageStateModel,
    products: Dictionary<Product>,
  ) {
    return Object.values(products);
  }
  // Set selected category: done

  @Action(SelectCategory)
  public setActiveCategory(
    ctx: StateContext<MainPageStateModel>,
    action: SelectCategory,
  ) {
    ctx.patchState({ selectedCategoryId: action.id });
    console.log(ctx.getState());
  }

  @Action(LoadMoreProducts)
  public loadMoreProducts(
    ctx: StateContext<MainPageStateModel>,
    action: LoadMoreProducts,
  ) {
    const state = ctx.getState();
    ctx
      .dispatch(
        new ProductActions.Load(
          new FilterProductsQuery({
            categoryId: action.id,
            take: productsLoadedPerScroll,
          }),
        ),
      )
      .subscribe();
    console.log(state);
  }

  // @Action(UnloadProducts)
  // public unloadProducts(
  //   ctx: StateContext<MainPageStateModel>,
  //   action: UnloadProducts,
  // ) {
  //   const state = ctx.getState();
  //   ctx.patchState({paginationState: {}});
  //   console.log(ctx.getState());
  // }

  // * initialize paginationState for the category

  // load more products
  // * load more products of a category
  // * productIds's length: that many products are loaded (skip)
  // * remainingItems: the number of products left to load, server returns this with each response (PaginatedResponse)
  // * if remainingItems is 0, then there are no more products to load
  // * if there are more remaining than productsLoadedPerScroll, only load productsLoadedPerScroll
}
