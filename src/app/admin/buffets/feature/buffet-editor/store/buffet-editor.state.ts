import { State } from "@ngxs/store";
import { CreateBuffetDto } from "@shared/buffet";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";

export interface BuffetEditorStateModel {
  form: NgxsFormStateModel<CreateBuffetDto>;
}

export const formPath = "buffetEditor.form";

@State<BuffetEditorStateModel>({
  name: "buffetEditor",
  defaults: {
    form: {
      model: new CreateBuffetDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
export class ProductEditorState {}