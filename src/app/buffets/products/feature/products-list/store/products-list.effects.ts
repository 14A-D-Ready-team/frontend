import { Injectable } from "@angular/core";
import { Actions, ofActionSuccessful, Store } from "@ngxs/store";
import { ProductActions } from "@shared/product";
import { Effect, EffectsStart, EffectsTerminate } from "ngxs-effects";
import { filter, switchMap } from "rxjs";
import { ProductsListState } from "./products-list.state";

@Injectable()
export class ProductsListEffects {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {}

  @EffectsStart<ProductsListEffects, void, void>()
  public onStart() {
    this.store
      .select(ProductsListState.shownProducts)
      .pipe
      //filter(products => products.some(product => !product)),
      /*  switchMap(() => {}), */
      ()
      .subscribe();
  }

  @EffectsTerminate<ProductsListEffects, void, void>()
  public onTerminate(): void {}
}
