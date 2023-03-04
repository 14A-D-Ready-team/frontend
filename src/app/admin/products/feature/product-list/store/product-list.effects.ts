import { Injectable } from "@angular/core";
import { Actions, ofAction, ofActionSuccessful, Store } from "@ngxs/store";
import { loadAllCategories } from "@shared/category";
import { Effect, EffectsBase } from "@shared/effects";
import { ProductActions } from "@shared/product";
import { concatMap, filter, switchMap, tap } from "rxjs";
import { ProductListState } from "./product-list.state";

@Injectable()
export class ProductListEffects extends EffectsBase {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {
    super();
  }

  @Effect()
  public onProductLoaded$ = this.actions$.pipe(
    ofActionSuccessful(ProductActions.LoadingSucceeded),
    switchMap(() =>
      this.store.selectOnce(ProductListState.hasUnknownCategories),
    ),
    filter(hasUnknownCategories => hasUnknownCategories),
    concatMap(() => loadAllCategories(this.store, true)),
  );

  @Effect()
  public a = this.store
    .select(ProductListState.shownProducts)
    .pipe
    //filter(products => products.some(product => !product)),
    /*  switchMap(() => {}), */
    ();
}
