import { Action, State, StateContext } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { CreateProductDto } from "@shared/product";
import { Save } from "./new-product.actions";

export interface NewProductStateModel {
  form: NgxsFormStateModel<CreateProductDto>;
}

export const formPath = "newProduct.form";

@State<NewProductStateModel>({
  name: "newProduct",
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
export class NewProductState {
  @Action(Save)
  public save(ctx: StateContext<NewProductStateModel>) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }

    const dto = state.form.model;
    console.log(dto);
  }
}
