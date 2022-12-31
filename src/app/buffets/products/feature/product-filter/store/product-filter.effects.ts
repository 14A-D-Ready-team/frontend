import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Effect, EffectsBase } from "@shared/effects";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  skip,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { ProductFilterState } from "./product-filter.state";
import { FilterChanged, StoppedTyping, Typing } from "./product-filter.actions";
import { FilterProductsQuery } from "@shared/product";

@Injectable()
export class ProductFilterEffects extends EffectsBase {
  @Effect()
  public onFormUpdate$ = this.store.select(ProductFilterState.formValue).pipe(
    skip(1),
    distinctUntilChanged((prev, curr) =>
      FilterProductsQuery.isUnchanged(prev, curr),
    ),
    skip(1), // 2 skip operators needed, to give distinctUntilChanged the starting prev value
    tap(() => this.store.dispatch(new Typing())),
    debounceTime(600),
    tap(() => this.store.dispatch(new StoppedTyping())),
    withLatestFrom(this.store.select(ProductFilterState.formStatus)),
    map(([formValue, formStatus]) => ({
      value: formValue,
      status: formStatus,
    })),
    filter(form => form.status === "VALID"),
    switchMap(form => this.store.dispatch(new FilterChanged(form.value))),
  );

  constructor(private store: Store) {
    super();
  }
}
