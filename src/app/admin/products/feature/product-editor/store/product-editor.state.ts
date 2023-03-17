import { State } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { UpdateProductDto } from "@shared/product";

export interface ProductEditorStateModel {
  form: NgxsFormStateModel<UpdateProductDto>;
}

export const formPath = "productEditor.form";

@State<ProductEditorStateModel>({
  name: "productEditor",
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
export class ProductEditorState {}
