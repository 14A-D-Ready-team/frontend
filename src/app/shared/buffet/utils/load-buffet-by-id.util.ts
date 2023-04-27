import {
  Observable,
  catchError,
  map,
  of,
  skip,
  startWith,
  switchMap,
  take,
} from "rxjs";
import { Buffet, BuffetActions, BuffetState } from "../data-access";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetActive } from "@ngxs-labs/entity-state";

export function loadBuffetById(
  id: number,
  store: Store,
  setAsActive = true,
): Observable<Buffet> {
  const buffet = store.selectSnapshot(BuffetState.entityById(id));
  if (buffet) {
    return store
      .dispatch(new SetActive(BuffetState, id + ""))
      .pipe(switchMap(() => store.selectOnce(BuffetState.entityById(id))));
  }

  return store.dispatch(new BuffetActions.LoadById(id)).pipe(
    switchMap(() =>
      setAsActive
        ? store.dispatch(new SetActive(BuffetState, id + ""))
        : of(undefined),
    ),
    switchMap(() => store.selectOnce(BuffetState.entityById(id))),
  );
}
