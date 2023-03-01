import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from "@angular/router";
import { SessionSigninPage } from "@app/auth/feature/session-signin";
import { Store } from "@ngxs/store";
import { omit } from "lodash";
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

    const nextUrl = [...collectPaths(childRoute), omit(childRoute.queryParams)];

    console.log(nextUrl);

    if (!loading) {
      this.store.dispatch(new SessionSignin(nextUrl));
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
      this.store.dispatch(new SessionSignin(["/"]));
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

function collectPaths(node: ActivatedRouteSnapshot): string[] {
  const paths: string[] = [];
  if (node.url && node.url.length > 0) {
    paths.push(node.url[0].path);
  }
  if (node.children && node.children.length > 0) {
    const childPaths = collectPaths(node.children[0]);
    paths.push(...childPaths);
  }
  return paths;
}
