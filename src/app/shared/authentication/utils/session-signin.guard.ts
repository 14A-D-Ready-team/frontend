import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { filter, map, Observable, of, takeWhile } from "rxjs";
import { AuthState } from "../data-access";

@Injectable({
  providedIn: "root",
})
export class SessionSigninGuard
  implements CanActivate, CanActivateChild, CanMatch
{
  constructor(private store: Store) {}

  public canMatch(route: Route, segments: UrlSegment[]) {
    return this.guard();
  }

  public canActivate() {
    return this.guard();
  }

  public canActivateChild() {
    return this.guard();
  }

  private guard() {
    console.log("session signin guard");
    const status = this.store.selectSnapshot(AuthState.sessionSigninStatus);
    return status?.loading !== true;
    /* return this.store.select(AuthState.sessionSigninStatus).pipe(
      map(status => status?.loading !== true),
      takeWhile(completed => !completed, true),
      filter(completed => completed),
    ); */
  }
}
