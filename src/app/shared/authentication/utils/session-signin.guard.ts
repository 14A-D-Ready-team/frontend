import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { filter, map, Observable, of, takeWhile } from "rxjs";
import { AuthState } from "../data-access";

@Injectable({
  providedIn: "root",
})
export class SessionSigninGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store) {}

  public canActivate() {
    return this.guard();
  }

  public canActivateChild() {
    return this.guard();
  }

  private guard() {
    return this.store.select(AuthState.sessionSigninStatus).pipe(
      map(status => status?.loading !== true),
      takeWhile(completed => !completed, true),
      filter(completed => completed),
    );
  }
}
