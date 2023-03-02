import { Inject, Injectable } from "@angular/core";
import { Ability } from "@casl/ability";
import { Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { EffectsBase, Effect } from "@shared/effects";
import { switchMap, tap } from "rxjs";
import { AbilityFactory, APP_ABILITY_FACTORY } from "../utils";

@Injectable()
export class PolicyEffects extends EffectsBase {
  @Effect()
  public onCurrentUserChanged$ = this.store.select(AuthState.user).pipe(
    switchMap(user => Promise.resolve(this.abilityFactory.createForUser(user))),
    tap(ability => this.ability.update(ability.rules)),
  );

  constructor(
    private store: Store,
    private ability: Ability,
    @Inject(APP_ABILITY_FACTORY)
    private abilityFactory: AbilityFactory,
  ) {
    super();
  }
}
