import { Store } from "@ngxs/store";
import { filter, takeWhile } from "rxjs";
import { CategoryState } from "../store";

export function waitForCategoryLoading(store: Store) {
  return store.select(CategoryState.loading).pipe(
    takeWhile(loading => loading, true),
    filter(loading => !loading),
  );
}
