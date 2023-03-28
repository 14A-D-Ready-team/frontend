import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppAbility } from "@app/app-ability.factory";
import { AbilityService } from "@casl/angular";
import { SetActive } from "@ngxs-labs/entity-state";
import { UpdateFormValue } from "@ngxs/form-plugin";
import {
  Action,
  Actions,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store,
} from "@ngxs/store";
import { Buffet, BuffetActions, BuffetState } from "@shared/buffet";
import { loadCategories } from "@shared/category";
import { ApiException, ErrorCode } from "@shared/exceptions";
import { UpdatePageState as UPS } from "@shared/extended-entity-state";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import {
  CreateProductDto,
  Product,
  ProductActions,
  ProductState,
  UpdateProductDto,
} from "@shared/product";
import {
  catchError,
  defaultIfEmpty,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { Mixin } from "ts-mixer";
import {
  LoadPage,
  Reset,
  Save,
  SetError,
  SetUpdatedProductData,
} from "./product-details.actions";

export interface ProductDetailsStateModel {
  editorForm: NgxsFormStateModel<UpdateProductDto>;
  error?: any;
  loading: boolean;
}

export const formPath = "adminProductDetails.editorForm";

const UpdatePageState = UPS as typeof UPS<
  ProductDetailsStateModel,
  UpdateProductDto,
  Product
>;

@State<ProductDetailsStateModel>({
  name: "adminProductDetails",
  defaults: {
    editorForm: {
      model: new UpdateProductDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
    loading: false,
  },
})
@Injectable()
export class ProductDetailsState
  extends Mixin(UpdatePageState)
  implements NgxsOnInit
{
  @Selector()
  public static error(state: ProductDetailsStateModel) {
    return state.error;
  }

  @Selector()
  public static loading(state: ProductDetailsStateModel) {
    return state.loading;
  }

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private actions$: Actions,
    private abilityService: AbilityService<AppAbility>,
  ) {
    super();
  }

  public ngxsOnInit(ctx: StateContext<ProductDetailsStateModel>) {
    this.initUpdateState({
      Actions: {
        Save,
        UpdateSucceeded: ProductActions.UpdateSucceeded,
        UpdateFailed: ProductActions.UpdateFailed,
      },
      UpdateAction: ProductActions.Update,
      DtoClass: UpdateProductDto,
      formPath,
      getOriginal: id => this.store.selectSnapshot(ProductState.entityById(id)),
    });
  }

  @Action(LoadPage)
  public loadPage(
    ctx: StateContext<ProductDetailsStateModel>,
    action: LoadPage,
  ) {
    ctx.patchState({ loading: true });

    return this.loadProductById(action.targetId).pipe(
      switchMap(product => {
        if (!product.buffetId) {
          throw new ApiException(ErrorCode.BuffetNotFoundException);
        }
        return this.loadBuffetById(product.buffetId).pipe(
          map(buffet => ({ product, buffet })),
        );
      }),
      switchMap(data =>
        this.setActiveBuffet(data.buffet).pipe(map(() => data)),
      ),
      switchMap(data =>
        loadCategories(this.store).pipe(
          defaultIfEmpty(undefined),
          map(() => data),
        ),
      ),
      switchMap(data => ctx.dispatch(new SetUpdatedProductData(data.product))),
      catchError(error => ctx.dispatch(new SetError(error))),
      finalize(() => ctx.patchState({ loading: false })),
    );
  }

  @Action(SetUpdatedProductData)
  public setUpdatedProductData(
    ctx: StateContext<ProductDetailsStateModel>,
    action: SetUpdatedProductData,
  ) {
    return ctx.dispatch(
      new UpdateFormValue({ path: formPath, value: action.product }),
    );
  }

  @Action(SetError)
  public setError(
    ctx: StateContext<ProductDetailsStateModel>,
    action: SetError,
  ) {
    ctx.patchState({ error: action.error });
  }

  @Action(Reset)
  reset(ctx: StateContext<ProductDetailsStateModel>) {
    ctx.patchState({ error: undefined });
  }

  private loadProductById(id: number) {
    return this.store.selectOnce(ProductState.entityById(id)).pipe(
      switchMap(cachedProduct => {
        if (cachedProduct) {
          return of(cachedProduct);
        }
        return this.store.dispatch(new ProductActions.LoadById(id)).pipe(
          switchMap(() => this.store.selectOnce(ProductState.entityById(id))),
          switchMap(product => {
            if (!product) {
              throw new ApiException(ErrorCode.ProductNotFoundException);
            }
            return of(product);
          }),
        );
      }),
    );
  }

  private loadBuffetById(id: number) {
    return this.store.selectOnce(BuffetState.entityById(id)).pipe(
      switchMap(buffet => {
        if (buffet) {
          return of(buffet);
        }
        return this.store.dispatch(new BuffetActions.LoadById(id));
      }),
      switchMap(() => this.store.selectOnce(BuffetState.entityById(id))),
      switchMap(buffet => {
        if (!buffet) {
          throw new ApiException(ErrorCode.BuffetNotFoundException);
        }
        return of(buffet);
      }),
    );
  }

  private setActiveBuffet(buffet: Buffet) {
    if (false) {
      throw new ApiException(ErrorCode.ForbiddenException);
    }

    return this.store.dispatch(
      new SetActive(BuffetState, buffet.id.toString()),
    );
  }
}
