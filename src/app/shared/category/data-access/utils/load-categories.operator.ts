import { SetError } from "@ngxs-labs/entity-state";
import { Store } from "@ngxs/store";
import { BuffetState } from "@shared/buffet";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { filter, switchMap } from "rxjs";
import { FilterCategoriesQuery } from "../query";
import { CategoryActions, CategoryState } from "../store";
import { waitForCategoryLoading } from "./wait-for-category-loading.operator";

export function loadCategories(store: Store, forceReload = false) {
  const buffetId = store.selectSnapshot(BuffetState.activeId);
  if (!buffetId) {
    return store.dispatch(
      new SetError(CategoryState, new NoBuffetSelectedException()),
    );
  }
  return waitForCategoryLoading(store).pipe(
    switchMap(() => store.selectOnce(CategoryState.isAllLoaded(+buffetId))),
    filter(allLoaded => forceReload || !allLoaded),
    //takeUntil(), until page is destroyed
    switchMap(() =>
      store.dispatch(
        new CategoryActions.Load(new FilterCategoriesQuery(+buffetId)),
      ),
    ),
  );
}
