import { Injectable } from "@angular/core";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { CategoryState, Category } from "@shared/category";
import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
  ProductStateModel,
} from "@shared/product";
import { css } from "cypress/types/jquery";
import { Dictionary } from "lodash";
import {
  LoadInitialProducts,
  LoadMoreProducts,
  SetCategory,
} from "./main-desktop.actions";

const productsLoadedPerScroll = 8;

export interface MainDesktopStateModel {
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

  public static products(state: MainDesktopStateModel, products: Product[]) {}

  @Selector([CategoryState.categoriesOfActiveBuffet])
  public static shownCategories(
    state: MainDesktopStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector([ProductState.entitiesMap])
  public static shownProducts(
    state: MainDesktopStateModel,
    products: Dictionary<Product>,
  ) {
    const productIds = [];
    for (let index = 1; index <= 8; index++) {
      const paginationState = state.paginationState[index];
      if (paginationState) {
        productIds.push(...paginationState.productIds);
      }
    }
    return productIds.map(id => products[id]).filter(p => p);

    // return state.paginationState[state.categoryId].productIds
    //   .map(id => products[id])
    //   .filter(p => p);
  }

  @Action(LoadInitialProducts)
  public loadInitialProducts(
    ctx: StateContext<MainDesktopStateModel>,
    action: LoadInitialProducts,
  ) {
    const dict = ctx.getState().paginationState;
    let dictValue = dict[action.id];
    let shouldLoadProducts = false;
    if (!dictValue) {
      shouldLoadProducts = true;
      dictValue = {
        productIds: [] as number[],
      };
    }
    ctx.patchState({
      paginationState: { ...dict, [action.id]: dictValue },
    });
    if (shouldLoadProducts) {
      return ctx.dispatch(new LoadMoreProducts(action.id));
    }
  }

  @Action(LoadMoreProducts)
  public loadMoreProducts(
    ctx: StateContext<MainDesktopStateModel>,
    action: LoadMoreProducts,
  ) {
    const loading = this.store.selectSnapshot(ProductState.loading);
    if (loading) {
      return;
    }

    const dict = ctx.getState().paginationState[action.id];
    const productsLeft = dict.remainingItems;
    if (productsLeft !== undefined && productsLeft <= 0) {
      return;
    }
    return ctx.dispatch(
      new ProductActions.Load(
        new FilterProductsQuery({
          categoryId: action.id,
          take: productsLoadedPerScroll,
          skip: dict.productIds.length,
        }),
      ),
    );
  }

  @Action(ProductActions.LoadingSucceeded)
  public loadingSucceded(
    ctx: StateContext<MainDesktopStateModel>,
    action: ProductActions.LoadingSucceeded,
  ) {
    //console.log(action);
    const dict = ctx.getState().paginationState;
    const categoryId = +action.query.categoryId!;
    const dictValue = dict[categoryId];
    const productIds = [
      ...dictValue.productIds,
      ...action.entities.map(prod => prod.id),
    ];
    const remainingItems = action.count - productIds.length;
    ctx.patchState({
      paginationState: {
        ...dict,
        [categoryId]: { remainingItems, productIds },
      },
    });
  }
}
