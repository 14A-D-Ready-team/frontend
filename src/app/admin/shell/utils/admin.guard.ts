import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import {
  combineLatest,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  takeWhile,
  tap,
} from "rxjs";
import { AbilityService } from "@casl/angular";
import { AppAbility } from "@app/app-ability.factory";
import { Store } from "@ngxs/store";
import {
  AuthGuard,
  AuthState,
  SessionSigninGuard,
} from "@shared/authentication";
import { Action, PolicyHandler } from "@shared/policy";
import { ToastController } from "@ionic/angular";
import { User } from "@shared/user";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private abilityService: AbilityService<AppAbility>,
    private store: Store,
    private toastController: ToastController,
    private sessionSigninGuard: SessionSigninGuard,
    private authGuard: AuthGuard,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.sessionSigninGuard.guard().pipe(
      switchMap(() => of(this.authGuard.guard(state))),
      switchMap(result =>
        result === true ? from(this.guard(route, state)) : of(result),
      ),
    );
  }

  public guard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ability$ = this.store.select(AuthState.policiesUptodate).pipe(
      takeWhile(uptodate => !uptodate, true),
      filter(uptodate => uptodate),
      switchMap(() => this.abilityService.ability$),
      take(1),
    );
    const user$ = this.store.selectOnce(AuthState.user);

    return combineLatest([ability$, user$]).pipe(
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
