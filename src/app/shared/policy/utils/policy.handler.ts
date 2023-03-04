import { ActivatedRouteSnapshot } from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { Observable } from "rxjs";

export type PolicyHandler = (
  ability: AppAbility,
  route: ActivatedRouteSnapshot,
) => boolean | Observable<boolean>;
