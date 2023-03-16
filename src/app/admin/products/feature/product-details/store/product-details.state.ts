import { Action, NgxsOnInit, State, StateContext, Store } from "@ngxs/store";
import { UpdatePageState as UPS } from "@shared/extended-entity-state";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import {
  CreateProductDto,
  Product,
  ProductActions,
  ProductState,
  UpdateProductDto,
} from "@shared/product";
import { Mixin } from "ts-mixer";
import { LoadPage, Save } from "./product-details.actions";

export interface ProductDetailsStateModel {
  editorForm: NgxsFormStateModel<UpdateProductDto>;
}

export const formPath = "productDetails.form";

const UpdatePageState = UPS as typeof UPS<
  ProductDetailsStateModel,
  UpdateProductDto,
  Product
>;

@State<ProductDetailsStateModel>({
  name: "productDetails",
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
export class ProductDetailsState
  extends Mixin(UpdatePageState)
  implements NgxsOnInit
{
  constructor(private store: Store) {
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
  public loadPage(ctx: StateContext<ProductDetailsStateModel>) {}
}
