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
import { ToastController } from "@ionic/angular";
import { Store } from "@ngxs/store";
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

  public canActivateChild() {
    return this.guard();
  }

  public canActivate() {
    return this.guard();
  }

  private guard() {
    const url = this.router.routerState.snapshot.url;
    const isCurrentlyOnAuth = !!url.match(/auth/);

    const isUserLoggedIn = !!this.store.selectSnapshot(AuthState.user);

    if (isUserLoggedIn) {
      return true;
    }

    this.showWarning();

    if (isCurrentlyOnAuth) {
      return false;
    }

    return this.router.parseUrl("/auth/login");
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
