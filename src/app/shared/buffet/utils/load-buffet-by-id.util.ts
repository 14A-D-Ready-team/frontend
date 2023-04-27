import {
  Observable,
  catchError,
  map,
  of,
  skip,
  startWith,
  switchMap,
} from "rxjs";
import { BuffetActions, BuffetState } from "../data-access";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetActive } from "@ngxs-labs/entity-state";

export function loadBuffetById(
  route: ActivatedRoute,
  store: Store,
  setAsActive = true,
): Observable<{ loading: boolean; error?: any }> {
  return route.queryParams.pipe(
    // UGLY FIX
    skip(1),
    switchMap(params =>
      store.dispatch(new BuffetActions.LoadById(params.buffetId)).pipe(
        switchMap(() =>
          setAsActive
            ? store.dispatch(new SetActive(BuffetState, params.buffetId))
            : of(undefined),
        ),
        map(() => ({ loading: false })),
        catchError(error => of({ loading: false, error })),
        startWith({ loading: true }),
      ),
    ),
  );
}
