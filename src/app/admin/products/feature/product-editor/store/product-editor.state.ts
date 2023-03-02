import { State } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { CreateProductDto } from "@shared/product";

export interface ProductEditorStateModel {
  form: NgxsFormStateModel<CreateProductDto>;
}

export const formPath = "productEditor.form";

@State<ProductEditorStateModel>({
  name: "productEditor",
  defaults: {
    form: {
      model: new CreateProductDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
export class ProductEditorState {}
