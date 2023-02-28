import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { SessionSigninPage } from "@app/auth/feature/session-signin";
import { Store } from "@ngxs/store";
import { AuthState, SessionSignin } from "../../data-access";

@Injectable({
  providedIn: "root",
})
export class SessionSigninGuard
  implements CanActivateChild, CanActivate, CanDeactivate<SessionSigninPage>
{
  constructor(private store: Store, private router: Router) {}

  // used by /*, except /session-signin
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    const { completed, loading } = this.store.selectSnapshot(
      AuthState.sessionSigninStatus,
    );

    if (completed) {
      return true;
    }

    if (!loading) {
      this.store.dispatch(new SessionSignin(state.url));
    }

    return this.router.parseUrl("/session-signin");
  }

  // used by: /session-signin
  public canActivate() {
    const { completed, loading } = this.store.selectSnapshot(
      AuthState.sessionSigninStatus,
    );

    if (completed) {
      return false;
    }

    if (!loading) {
      this.store.dispatch(new SessionSignin("/"));
    }

    return true;
  }

  // used by: /session-signin
  public canDeactivate() {
    const { completed } = this.store.selectSnapshot(
      AuthState.sessionSigninStatus,
    );

    return completed;
  }
}
