import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { EffectsBase, Effect } from "@shared/effects";
import { tap } from "rxjs";

@Injectable()
export class PolicyEffects extends EffectsBase {
  @Effect()
  public onCurrentUserChanged$ = this.store.select(AuthState.user).pipe(
    tap(user => {
      console.log(user);
    }),
  );

  constructor(private store: Store) {
    super();
  }
}
