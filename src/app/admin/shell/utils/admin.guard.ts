import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { combineLatest, map, Observable, of, switchMap, take, tap } from "rxjs";
import { AbilityService } from "@casl/angular";
import { AppAbility } from "@app/app-ability.factory";
import { Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { PolicyHandler } from "@shared/policy";
import { ToastController } from "@ionic/angular";
import { User } from "@shared/user";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private abilityService: AbilityService<AppAbility>,
    private store: Store,
    private toastController: ToastController,
  ) {}

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return combineLatest([
      this.abilityService.ability$.pipe(take(1)),
      this.store.selectOnce(AuthState.user),
    ]).pipe(
      map(([ability, user]) => this.hasAccess(ability, user, route)),
      switchMap(result => (typeof result === "boolean" ? of(result) : result)),
      tap(result => {
        if (!result) {
          this.showWarning();
        }
      }),
    );
  }

  public async showWarning() {
    const toast = await this.toastController.create({
      icon: "warning",
      message: "Ehhez nincs jogosultsága!",
      duration: 2000,
      position: "top",
      color: "warning",
      buttons: [{ icon: "close", role: "cancel" }],
    });
    toast.present();
  }

  private hasAccess(
    ability: AppAbility,
    user: User | undefined,
    route: ActivatedRouteSnapshot,
  ) {
    if (!(user?.admin || user?.buffetOwner || user?.buffetWorker)) {
      return false;
    }

    const policyHandler: PolicyHandler | undefined = route.data?.policyHandler;
    if (!policyHandler) {
      return of(true);
    }

    return policyHandler(ability, route);
  }
}
