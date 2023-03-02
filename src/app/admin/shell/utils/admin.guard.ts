import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AbilityService } from "@casl/angular";
import { AppAbility } from "@app/app-ability.factory";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivateChild {
  constructor(private abilityService: AbilityService<AppAbility>) {}

  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.abilityService.ability$.pipe(
      take(1),
      map(ability => {
        return true;
      }),
    );
  }
}
