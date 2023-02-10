import { Injectable } from "@angular/core";
import { Actions, Store } from "@ngxs/store";
import { BuffetActions } from "@shared/buffet";
import { Effect, EffectsBase } from "@shared/effects";
import { BuffetsListState } from "./buffet-list.state";
@Injectable()
export class BuffetsListEffects extends EffectsBase {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {
    super();
  }

  @Effect()
  public a = this.store
    .select(BuffetsListState)
    .pipe
    //filter(buffets => buffets.some(buffet => !buffet)),
    /*  switchMap(() => {}), */
    ();
}
