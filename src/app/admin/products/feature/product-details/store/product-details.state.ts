import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UpdateFormValue } from "@ngxs/form-plugin";
import { Action, NgxsOnInit, State, StateContext, Store } from "@ngxs/store";
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
import { switchMap, tap } from "rxjs";
import { Mixin } from "ts-mixer";
import {
  LoadPage,
  Save,
  SetError,
  SetUpdatedProductData,
} from "./product-details.actions";

export interface ProductDetailsStateModel {
  editorForm: NgxsFormStateModel<UpdateProductDto>;
  error?: any;
}

export const formPath = "adminProductDetails.form";

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
  },
})
@Injectable()
export class ProductDetailsState
  extends Mixin(UpdatePageState)
  implements NgxsOnInit
{
  constructor(private store: Store, private route: ActivatedRoute) {
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
    return ctx.dispatch(new ProductActions.LoadById(action.targetId)).pipe(
      switchMap(() =>
        this.store.selectOnce(ProductState.entityById(action.targetId)),
      ),
      switchMap(product => {
        if (!product) {
          return ctx.dispatch(
            new SetError(new ApiException(ErrorCode.NotFoundException)),
          );
        }
      }),
    );
    // load product by id
    // load buffet of the product, and set it as active
    // if the user doesn't have access to the buffet, don't set it as active
    // load categories of the buffet
    //return loadCategories(this.store);
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
}
