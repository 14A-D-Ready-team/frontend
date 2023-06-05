import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { Category, CategoryState, loadCategories } from "@shared/category";
import {
  FilterProductsQuery,
  Product,
  ProductActions,
  ProductState,
} from "@shared/product";
import {
  CategoriesLoaded,
  LoadMoreProducts,
  LoadPage,
  Reset,
  SelectCategory,
} from "./main-page.actions";
import { groupBy } from "@shared/utils";
import { Router } from "@angular/router";
import { loadBuffetById } from "@shared/buffet/utils";
import { catchError, defaultIfEmpty, of, startWith, switchMap } from "rxjs";
import { BuffetState } from "@shared/buffet";

const productsLoadedPerScroll = 4;

export interface MainPageStateModel {
  selectedCategoryId?: number;
  // key: id of the category
  // value: the pagination's data inside a category
  paginationState: Dictionary<{
    productIds: number[];
    // undefined: nem tudjuk mennyi termék van hátra
    remainingItems?: number;
  }>;
  loadResult: {
    loading: boolean;
    error?: any;
  };
}

@State<MainPageStateModel>({
  name: "mainPage",
  defaults: {
    paginationState: {},
    loadResult: {
      loading: true,
    },
  },
})
@Injectable()
export class MainPageState {
  constructor(private store: Store, private router: Router) {}

  @Selector([MainPageState.shownCategories])
  public static shownCategoriesDict(
    state: MainPageStateModel,
    categories: Category[],
  ) {
    return groupBy(categories, "id");
  }

  @Selector([CategoryState.categoriesOfActiveBuffet])
  public static shownCategories(
    state: MainPageStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector()
  public static loadResult(state: MainPageStateModel) {
    return state.loadResult;
  }

  @Selector([ProductState.entitiesMap])
  public static shownProducts(
    state: MainPageStateModel,
    products: Dictionary<Product>,
  ) {
    return state.paginationState[state.selectedCategoryId!].productIds
      .map(id => products[id])
      .filter(p => p);
  }
  // Set selected category: done

  @Action(SelectCategory)
  public setActiveCategory(
    ctx: StateContext<MainPageStateModel>,
    action: SelectCategory,
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
      selectedCategoryId: action.id,
      paginationState: { ...dict, [action.id]: dictValue },
    });
    if (shouldLoadProducts) {
      return ctx.dispatch(new LoadMoreProducts(action.id));
    }
  }

  @Action(LoadMoreProducts)
  public loadMoreProducts(
    ctx: StateContext<MainPageStateModel>,
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
    ctx: StateContext<MainPageStateModel>,
    action: ProductActions.LoadingSucceeded,
  ) {
    //console.log(action);
    const dict = ctx.getState().paginationState;
    const categoryId = +action.query.categoryId!;
    const dictValue = dict[categoryId];
    // pl: 1,2,3,4 - 4 db id
    // action.count - 6 (össz ennyi van)
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

  @Action(Reset)
  public reset(ctx: StateContext<MainPageStateModel>) {
    ctx.patchState({
      selectedCategoryId: undefined,
      paginationState: {},
    });
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<MainPageStateModel>) {
    return this.loadActiveBuffet().pipe(
      switchMap(() =>
        loadCategories(this.store).pipe(defaultIfEmpty(undefined)),
      ),
      switchMap(() => this.store.selectOnce(MainPageState.shownCategories)),
      switchMap(categories => {
        ctx.patchState({ loadResult: { loading: false } });

        return this.store.dispatch(new CategoriesLoaded(categories));
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
