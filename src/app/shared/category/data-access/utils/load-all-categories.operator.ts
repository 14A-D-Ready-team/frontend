import { Store } from "@ngxs/store";
import { waitForCategoryLoading } from "./wait-for-category-loading.operator";

export function loadAllCategories(store: Store) {
  return waitForCategoryLoading(store).pipe(
    switchMap(() => this.store.selectOnce(CategoryState.isAllLoaded)),
    filter(allLoaded => !allLoaded),
    switchMap(() => ctx.dispatch(new CategoryActions.LoadAll())),
  );
}
