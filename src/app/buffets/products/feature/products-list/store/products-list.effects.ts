import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { EffectsStart, EffectsTerminate } from "ngxs-effects";
import { filter, switchMap } from "rxjs";
import { ProductsListState } from "./products-list.state";

@Injectable()
export class ProductsListEffects {
  constructor(private readonly store: Store) {}

  @EffectsStart<ProductsListEffects, void, void>()
  public onStart() {
    this.store
      .select(ProductsListState.shownProducts)
      .pipe(
        filter(products => products.some(product => !product)),
        switchMap(() => {}),
      )
      .subscribe();
  }

  @EffectsTerminate<ProductsListEffects, void, void>()
  public onTerminate(): void {}
}
