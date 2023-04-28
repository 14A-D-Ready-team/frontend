import { Store } from "@ngxs/store";
import { catchError, map, of, startWith } from "rxjs";
import { CategoryActions } from "../data-access";

export function loadCategoryById(id: number, store: Store) {
  return store.dispatch(new CategoryActions.LoadById(id)).pipe(
    catchError(error => of({ loading: false, error })),
    map(() => ({ loading: false })),
    startWith({ loading: true }),
  );
}
