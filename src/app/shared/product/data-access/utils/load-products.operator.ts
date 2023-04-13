import { SetError } from "@ngxs-labs/entity-state";
import { Store } from "@ngxs/store";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { filter, switchMap } from "rxjs";
import { waitForProductLoading } from ".";
import { FilterProductsQuery, ProductActions, ProductState } from "..";

export function loadProducts(store: Store, forceReload = false) {
  // const buffetId = store.selectSnapshot(ProductState.activeId);
  // if (!buffetId) {
  //   return store.dispatch(
  //     new SetError(ProductState, new NoBuffetSelectedException()),
  //   );
  // }
  // return waitForProductLoading(store).pipe(
  //   switchMap(() => store.selectOnce(ProductState.isAllLoaded(+buffetId))),
  //   filter(allLoaded => forceReload || !allLoaded),
  //   switchMap(() =>
  //     store.dispatch(
  //       new ProductActions.Load(new FilterProductsQuery(+buffetId)),
  //     ),
  //   ),
  // );
}
