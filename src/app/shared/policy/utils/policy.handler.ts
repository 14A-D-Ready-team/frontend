import { ActivatedRouteSnapshot } from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";

export type PolicyHandler = (
  ability: AppAbility,
  route: ActivatedRouteSnapshot,
  store: Store,
) => boolean | Observable<boolean>;
