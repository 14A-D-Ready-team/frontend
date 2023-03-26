import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpdateFormValue } from "@ngxs/form-plugin";
import { Store } from "@ngxs/store";
import { Effect, EffectsBase } from "@shared/effects";
import { ApiException, ErrorCode } from "@shared/exceptions";
import { ProductActions, ProductState } from "@shared/product";
import { filter, of, switchMap } from "rxjs";
import {
  LoadPage,
  SetError,
  SetUpdatedProductData,
} from "./product-details.actions";

@Injectable()
export class ProductDetailsEffects extends EffectsBase {
  @Effect()
  public onEditedIdChanged$ = this.route.queryParamMap.pipe(
    switchMap(params => {
      const id = Number(params.get("id"));
      if (isNaN(id)) {
        return this.store.dispatch(
          new SetError(new ApiException(ErrorCode.NotFoundException)),
        );
      }
      return this.store.dispatch(new LoadPage(id));
      /*  return this.store.selectOnce(ProductState.entityById(id)).pipe(
        switchMap(p => {
          if (!p) {
            return this.store.dispatch(new ProductActions.LoadById(id));
          }
          return of(null);
        }),
        switchMap(() => this.store.selectOnce(ProductState.entityById(id))),
        filter(p => !!p),
        switchMap(p => this.store.dispatch(new SetUpdatedProductData(p))),
      ); */
    }),
  );

  constructor(private route: ActivatedRoute, private store: Store) {
    super();
  }
}
