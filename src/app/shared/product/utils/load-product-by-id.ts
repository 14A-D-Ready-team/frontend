import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { catchError, map, of, startWith, switchMap } from "rxjs";
import { ProductActions } from "../data-access/store";

export function loadProductById(route: ActivatedRoute, store: Store) {
  return route.queryParams.pipe(
    switchMap(params =>
      store.dispatch(new ProductActions.LoadById(params.productId)).pipe(
        catchError(error => of({ loading: false, error })),
        map(() => ({ loading: false })),
        startWith({ loading: true }),
      ),
    ),
  );
}
