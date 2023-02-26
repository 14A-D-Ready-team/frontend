import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthState } from "@app/auth/data-access";
import { Store } from "@ngxs/store";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(private store: Store, private router: Router) {}

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.store.select(AuthState.user).pipe(map(user => !!user));
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const url = this.router.routerState.snapshot.url;
    const isCurrentlyOnAuth = !!url.match(/auth/);

    return this.store.select(AuthState.user).pipe(
      map(user => {
        const isLoggedIn = !!user;
        if (isCurrentlyOnAuth) {
          return isLoggedIn;
        }
        return this.router.parseUrl("/auth/login");
      }),
    );
  }
}
