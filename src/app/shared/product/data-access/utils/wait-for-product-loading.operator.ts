import { Store } from "@ngxs/store";
import { filter, takeWhile } from "rxjs";
import { ProductState } from "../store";


export function waitForProductLoading(store: Store) {
  return store.select(ProductState.loading).pipe(
    takeWhile(loading => loading, true),
    filter(loading => !loading),
  );
}