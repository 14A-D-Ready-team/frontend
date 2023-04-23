import { Injectable } from "@angular/core";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { CategoryState, Category } from "@shared/category";
import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
} from "@shared/product";
import { Dictionary, fromPairs } from "lodash";
import { LoadInitialProducts, LoadMoreProducts } from "./main-desktop.actions";

const productsLoaded = 6;

export interface MainDesktopStateModel {
  paginationState: Dictionary<{
    productIds: number[];
    remainingItems?: number;
  }>;
  loading: Dictionary<boolean>;
}

@State<MainDesktopStateModel>({
  name: "mainDesktop",
  defaults: {
    paginationState: {},
    loading: {},
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
    const pairs = Object.entries(state.paginationState).map(
      ([key, value]) =>
        [key, value.productIds.map(id => products[id]).filter(p => p)] as [
          string,
          Product[],
        ],
    );

    return fromPairs(pairs);
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
    const loadingDict = ctx.getState().loading;
    if (loadingDict[action.id]) {
      return;
    }

    const dict = ctx.getState().paginationState[action.id];
    const productsLeft = dict.remainingItems;
    if (productsLeft !== undefined && productsLeft <= 0) {
      return;
    }

    ctx.patchState({
      loading: { ...loadingDict, [action.id]: true },
    });

    return ctx.dispatch(
      new ProductActions.Load(
        new FilterProductsQuery({
          categoryId: action.id,
          take: productsLoaded,
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
      loading: { ...ctx.getState().loading, [categoryId]: false },
      paginationState: {
        ...dict,
        [categoryId]: { remainingItems, productIds },
      },
    });
  }
}
