import { State } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { CreateProductDto, UpdateProductDto } from "@shared/product";

export interface ProductDetailsStateModel {
  form: NgxsFormStateModel<UpdateProductDto>;
}

export const formPath = "productDetails.form";

@State<ProductDetailsStateModel>({
  name: "productDetails",
  defaults: {
    form: {
      model: new UpdateProductDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
export class ProductDetailsState {}
