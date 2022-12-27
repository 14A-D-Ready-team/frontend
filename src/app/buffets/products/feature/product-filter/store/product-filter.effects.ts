import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Effect, EffectsBase } from "@shared/effects";
import { debounceTime, distinctUntilChanged, skip, switchMap, tap } from "rxjs";
import { ProductFilterState } from "./product-filter.state";
import { isEqual } from "lodash";
import { FilterChanged } from "./product-filter.actions";

@Injectable()
export class ProductFilterEffects extends EffectsBase {
  @Effect()
  public onFormUpdate$ = this.store.select(ProductFilterState.formValue).pipe(
    skip(2),
    distinctUntilChanged((prev, curr) => isEqual(prev, curr)),
    debounceTime(1200),
    switchMap(formValue => this.store.dispatch(new FilterChanged(formValue))),
  );

  constructor(private store: Store) {
    super();
  }
}
