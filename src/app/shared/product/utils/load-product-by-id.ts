import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, map, of, startWith, switchMap, tap } from "rxjs";
import { ProductActions } from "../data-access/store";

export function loadProductById(id: number, store: Store) {
  return store.dispatch(new ProductActions.LoadById(id)).pipe(
    catchError(error => of({ loading: false, error })),
    map(() => ({ loading: false })),
    startWith({ loading: true }),
  );
}
