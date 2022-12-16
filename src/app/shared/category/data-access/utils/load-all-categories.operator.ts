import { Store } from "@ngxs/store";
import { filter, switchMap, takeUntil } from "rxjs";
import { CategoryActions, CategoryState } from "../store";
import { waitForCategoryLoading } from "./wait-for-category-loading.operator";

export function loadAllCategories(store: Store) {
  return waitForCategoryLoading(store).pipe(
    switchMap(() => store.selectOnce(CategoryState.isAllLoaded)),
    filter(allLoaded => !allLoaded),
    //takeUntil(), until page is destroyed
    switchMap(() => store.dispatch(new CategoryActions.LoadAll())),
  );
}
