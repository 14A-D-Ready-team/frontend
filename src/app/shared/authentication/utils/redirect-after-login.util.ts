import { NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { User } from "@shared/user";
import { Dictionary } from "lodash";
import { filter, map, takeUntil, takeWhile, tap } from "rxjs";

export function redirectAfterLogin(
  route: ActivatedRoute,
  ngZone: NgZone,
  router: Router,
  store: Store,
  toAdmin = false,
) {
  return store
    .select(state => state.auth.user)
    .pipe(
      map(u => u as User | undefined),
      takeWhile(user => !user, true),
      filter(user => !!user),
      tap(() => {
        const nextUrl =
          route.snapshot.queryParams.nextUrl || toAdmin ? "/admin" : "/";

        const url = new URL(nextUrl, window.location.origin);
        const queryParams: Dictionary<any> = {};
        for (const [key, value] of url.searchParams.entries()) {
          queryParams[key] = value;
        }

        ngZone.run(() => router.navigate([url.pathname], { queryParams }));
      }),
    );
}
