import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { FormControlErrors } from "@shared/extended-form-plugin";
import { OrderedProductDto } from "@shared/order";
import { Dictionary } from "lodash";
import { LoadPage, Reset } from "./product-page.actions";
import { catchError, defaultIfEmpty, map, of, switchMap, tap } from "rxjs";
import { ProductActions, ProductState, loadProductById } from "@shared/product";
import { ApiException, ErrorCode } from "@shared/exceptions";
import { loadBuffetById } from "@shared/buffet/utils";
import { BuffetActions, BuffetState } from "@shared/buffet";
import { SetActive } from "@ngxs-labs/entity-state";
import { loadCategoryById } from "@shared/category/utils/load-category-by-id";
import { CategoryActions, CategoryState } from "@shared/category";

export interface ProductStatus {
  loading: boolean;
  error?: any;
}

export interface ProductPageStateModel {
  loadResult: {
    loading: boolean;
    error?: any;
  };
}

@State<ProductPageStateModel>({
  name: "productPage",
  defaults: {
    loadResult: {
      loading: true,
    },
  },
})
@Injectable()
export class ProductPageState {
  @Selector()
  public static loadResult(state: ProductPageStateModel) {
    return state.loadResult;
  }

  constructor(private store: Store, private router: Router) {}

  @Action(Reset)
  public reset(ctx: StateContext<ProductPageStateModel>) {}

  @Action(LoadPage)
  public loadPage(ctx: StateContext<ProductPageStateModel>) {
    /* return this.loadActiveBuffet().pipe(
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
    ); */
    return this.loadProduct().pipe(
      switchMap(product => {
        const buffetId = product.buffetId;
        const activeBuffet = this.store.selectSnapshot(BuffetState.active);
        return loadBuffetById(buffetId, this.store, !activeBuffet).pipe(
          map(() => product),
        );
      }),
      switchMap(p => this.loadCategory(p.categoryId)),
      tap(() => {
        ctx.patchState({ loadResult: { loading: false } });
      }),
      catchError(error => {
        ctx.patchState({ loadResult: { loading: false, error } });

        return of(undefined);
      }),
    );
  }

  /*  private loadActiveBuffet() {
    const buffetId = this.router.routerState.snapshot.root.queryParams.buffetId;
    const buffet = this.store.selectSnapshot(BuffetState.active);
    if (buffet && (buffetId === undefined || buffet.id === +buffetId)) {
      return of(buffet);
    }

    return loadBuffetById(+buffetId, this.store, true);
  } */

  private loadCategory(id: number) {
    const c = this.store.selectSnapshot(CategoryState.entityById(id));
    if (c) {
      return of(c);
    }
    return this.store.dispatch(new CategoryActions.LoadById(id));
  }

  private loadProduct() {
    const productId =
      this.router.routerState.snapshot.root.queryParams.productId;

    const product = this.store.selectSnapshot(
      ProductState.entityById(productId),
    );
    if (product) {
      return of(product);
    }
    return this.store.dispatch(new ProductActions.LoadById(productId)).pipe(
      switchMap(() =>
        this.store.selectOnce(ProductState.entityById(productId)),
      ),
      map(p => {
        if (!p) {
          throw new ApiException(ErrorCode.NotFoundException);
        }
        return p;
      }),
    );
  }
}
