import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
  CanActivateChild,
  Router,
} from "@angular/router";
import { SetActive } from "@ngxs-labs/entity-state";
import { Store } from "@ngxs/store";
import { Buffet, BuffetActions, BuffetState } from "@shared/buffet";
import { filter, map, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BuffetSelectGuard
  implements CanActivateChild, Resolve<Buffet | undefined>
{
  constructor(private store: Store, private router: Router) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Buffet | Observable<Buffet | undefined> | undefined {
    const activeBuffet = this.store.selectSnapshot(BuffetState.active);
    const buffetId = route.queryParams.buffetId;

    if (activeBuffet) {
      return activeBuffet;
    }

    if (!buffetId) {
      return undefined;
    }

    // !!! WHAT IF WRONG ID?
    return this.store.dispatch(new BuffetActions.LoadById(buffetId)).pipe(
      switchMap(() => this.store.selectOnce(BuffetState.byId(buffetId))),
      filter(buffet => !!buffet),
      switchMap(buffet =>
        this.store.dispatch(new SetActive(BuffetState, buffet.id)),
      ),
    );
  }

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const activeBuffet = this.store.selectSnapshot(BuffetState.active);
    const buffetId = route.queryParams.buffetId;

    if (activeBuffet || buffetId) {
      return true;
    }

    return this.router.parseUrl("/buffet-select");
  }
}
