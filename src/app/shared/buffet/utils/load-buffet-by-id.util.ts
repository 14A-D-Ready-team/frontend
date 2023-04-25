import { Observable, catchError, map, of, startWith, switchMap } from "rxjs";
import { BuffetActions, BuffetState } from "../data-access";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetActive } from "@ngxs-labs/entity-state";

export function loadBuffetByRoute(
  route: ActivatedRoute,
  store: Store,
  setAsActive = true,
): Observable<{ loading: boolean; error?: any }> {
  return route.queryParams.pipe(
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

export function loadBuffetById(
  id: number,
  store: Store,
  setAsActive = true,
): Observable<{ loading: boolean; error?: any }> {
  if (store.selectOnce(BuffetState.entityById(id))) {
    return of({ loading: false });
  }

  return store.dispatch(new BuffetActions.LoadById(id)).pipe(
    switchMap(() =>
      setAsActive
        ? store.dispatch(new SetActive(BuffetState, id + ""))
        : of(undefined),
    ),
    map(() => ({ loading: false })),
    catchError(error => of({ loading: false, error })),
    startWith({ loading: true }),
  );
}
