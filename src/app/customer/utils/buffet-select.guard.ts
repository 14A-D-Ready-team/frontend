import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { BuffetState } from "@shared/buffet";

@Injectable({
  providedIn: "root",
})
export class BuffetSelectGuard implements CanActivateChild {
  constructor(private store: Store, private router: Router) {}

  public canActivateChild(route: ActivatedRouteSnapshot) {
    const activeBuffet = this.store.selectSnapshot(BuffetState.active);
    const buffetId = route.queryParams.buffetId;

    if (activeBuffet || buffetId) {
      return true;
    }

    return this.router.parseUrl("/buffet-select");
  }
}
