import { Injectable } from "@angular/core";
import { Actions, Store } from "@ngxs/store";
import { BuffetActions } from "@shared/buffet";
import { Effect, EffectsBase } from "@shared/effects";
import { BuffetListState } from "./buffet-list.state";
@Injectable()
export class BuffetListEffects extends EffectsBase {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {
    super();
  }

  @Effect()
  public a = this.store.select(BuffetListState).pipe();
}
