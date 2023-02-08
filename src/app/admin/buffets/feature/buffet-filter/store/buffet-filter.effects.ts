import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Effect, EffectsBase } from "@shared/effects";
import { skip, tap, debounceTime, withLatestFrom, map, filter, switchMap } from "rxjs";
import { Typing, StoppedTyping, FilterChanged } from "./buffet-filter.actions";
import { BuffetFilterState } from "./buffet-filter.state";


@Injectable()
export class BuffetFilterEffects extends EffectsBase {
  @Effect()
  public onFormUpdate$ = this.store.select(BuffetFilterState.formValue).pipe(
    skip(1),
    skip(1), // 2 skip operators needed, to give distinctUntilChanged the starting previous value
    tap(() => this.store.dispatch(new Typing())),
    debounceTime(600),
    tap(() => this.store.dispatch(new StoppedTyping())),
    withLatestFrom(this.store.select(BuffetFilterState.formStatus)),
    map(([formValue, formStatus]) => ({
      value: formValue,
      status: formStatus,
    })),
    tap(console.log),
    filter(form => form.status === "VALID"),
    switchMap(form => this.store.dispatch(new FilterChanged(form.value))),
  );

  constructor(private store: Store) {
    super();
  }
}

  