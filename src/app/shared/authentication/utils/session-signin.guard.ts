import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState, SessionSignin } from "../data-access";

@Injectable({
  providedIn: "root",
})
export class SessionSigninGuard implements CanActivateChild {
  constructor(private store: Store, private router: Router) {}

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const sessionSigninCompleted = this.store.selectSnapshot(
      AuthState.sessionSigninCompleted,
    );
    const status = this.store.selectSnapshot(AuthState.sessionSigninStatus);
    const loading = status?.loading;

    if (sessionSigninCompleted) {
      return true;
    }

    if (!loading) {
      this.store.dispatch(new SessionSignin(state.url));
    }
    return this.router.parseUrl("/session-signin");
  }
}
