import { platform } from "@/environments/platform";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductPageGuard implements CanActivateChild {
  constructor(private router: Router) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const productId = route.queryParams.productId;
    if (productId) {
      return true;
    }

    if (platform === "desktop") {
      return this.router.parseUrl("/main");
    } else {
      return this.router.parseUrl("/");
    }
  }
}
