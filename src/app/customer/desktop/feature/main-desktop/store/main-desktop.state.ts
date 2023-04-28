import { Injectable } from "@angular/core";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { CategoryState, Category, loadCategories } from "@shared/category";
import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
} from "@shared/product";
import { Dictionary, fromPairs } from "lodash";
import {
  LoadInitialProducts,
  LoadMoreProducts,
  LoadPage,
} from "./main-desktop.actions";
import { loadBuffetById } from "@shared/buffet/utils";
import { Router } from "@angular/router";
import { catchError, of, startWith, switchMap, tap } from "rxjs";
import { BuffetState } from "@shared/buffet";

const productsLoaded = 6;

export interface MainDesktopStateModel {
  paginationState: Dictionary<{
    productIds: number[];
    remainingItems?: number;
  }>;
  loadingProducts: Dictionary<boolean>;
  loadResult: {
    loading: boolean;
    error?: any;
  };
}

@State<MainDesktopStateModel>({
  name: "mainDesktop",
  defaults: {
    paginationState: {},
    loadingProducts: {},
    loadResult: {
      loading: true,
    },
  },
})
@Injectable()
export class MainDesktopState {
  constructor(private store: Store, private router: Router) {}

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

  @Selector()
  public static loadResult(state: MainDesktopStateModel) {
    return state.loadResult;
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
    const loadingDict = ctx.getState().loadingProducts;
    if (loadingDict[action.id]) {
      return;
    }

    const dict = ctx.getState().paginationState[action.id];
    const productsLeft = dict.remainingItems;
    if (productsLeft !== undefined && productsLeft <= 0) {
      return;
    }

    ctx.patchState({
      loadingProducts: { ...loadingDict, [action.id]: true },
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
      loadingProducts: {
        ...ctx.getState().loadingProducts,
        [categoryId]: false,
      },
      paginationState: {
        ...dict,
        [categoryId]: { remainingItems, productIds },
      },
    });
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<MainDesktopStateModel>) {
    return this.loadActiveBuffet().pipe(
      switchMap(() => loadCategories(this.store).pipe(startWith(undefined))),
      switchMap(() => this.store.selectOnce(MainDesktopState.shownCategories)),
      tap(categories => {
        ctx.patchState({ loadResult: { loading: false } });
        categories.forEach(c => {
          this.store.dispatch(new LoadInitialProducts(c.id));
        });
      }),
      catchError(error => {
        ctx.patchState({ loadResult: { loading: false, error } });

        return of(undefined);
      }),
    );
  }

  private loadActiveBuffet() {
    const buffetId = this.router.routerState.snapshot.root.queryParams.buffetId;
    const buffet = this.store.selectSnapshot(BuffetState.active);
    if (buffet && (buffetId === undefined || buffet.id === +buffetId)) {
      return of(buffet);
    }

    return loadBuffetById(+buffetId, this.store, true);
  }
}
