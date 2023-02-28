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
import { ToastController } from "@ionic/angular";
import { Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { map, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private toastController: ToastController,
  ) {}

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.guard(state);
  }

  public canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.guard(state);
  }

  private guard(state: RouterStateSnapshot) {
    const currentUrl = this.router.routerState.snapshot.url;
    const isCurrentlyOnAuth = !!currentUrl.match(/auth/);
    const isCurrentlyOnLogin = !!currentUrl.match(/^auth\/login\/.*$/);

    const isUserLoggedIn = !!this.store.selectSnapshot(AuthState.user);

    if (isUserLoggedIn) {
      return true;
    }

    this.showWarning();

    if (isCurrentlyOnAuth) {
      if (isCurrentlyOnLogin) {
        return this.router.parseUrl(`${currentUrl}?nextUrl=${state.url}`);
      }
      return false;
    }

    return this.router.parseUrl("/auth/login?nextUrl=" + state.url);
  }

  public async showWarning() {
    const toast = await this.toastController.create({
      icon: "warning",
      message: "Ehhez először be kell jelentkeznie!",
      duration: 2000,
      position: "top",
      color: "warning",
      buttons: [{ icon: "close", role: "cancel" }],
    });
    toast.present();
  }
}
