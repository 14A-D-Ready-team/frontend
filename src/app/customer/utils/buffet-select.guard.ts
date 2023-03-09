import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { BuffetState } from "@shared/buffet";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BuffetSelectGuard implements CanActivate {
  constructor(private store: Store) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const activeBuffet = this.store.selectSnapshot(BuffetState.active);

    if (activeBuffet) {
      return true;
    }

    const buffetId = route.queryParams.buffetId;
    if (buffetId) {
    }
  }
}
