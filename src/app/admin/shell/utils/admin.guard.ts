import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { combineLatest, map, Observable, take } from "rxjs";
import { AbilityService } from "@casl/angular";
import { AppAbility } from "@app/app-ability.factory";
import { Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private abilityService: AbilityService<AppAbility>,
    private store: Store,
  ) {}

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return combineLatest([
      this.abilityService.ability$.pipe(take(1)),
      this.store.selectOnce(AuthState.user),
    ]).pipe(
      map(([ability, user]) => {
        if (!(user?.admin || user?.buffetOwner || user?.buffetWorker)) {
          return false;
        }

        return true;
      }),
    );
  }
}
