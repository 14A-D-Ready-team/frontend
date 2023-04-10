import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthState } from "../../data-access";
import {
  catchError,
  filter,
  map,
  of,
  takeWhile,
  throwError,
  timeout,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SessionSigninGuard {
  constructor(private store: Store) {}

  public guard() {
    return this.store.select(AuthState.sessionSigninStatus).pipe(
      map(status => status.completed),
      takeWhile(completed => !completed, true),
      filter(completed => completed),
      timeout(4000),
      catchError(err => {
        if (err.name === "TimeoutError") {
          return of(true);
        }
        return throwError(() => err);
      }),
    );
  }
}
