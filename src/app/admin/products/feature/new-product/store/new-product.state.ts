import { Injectable } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { loadAllCategories } from "@shared/category";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { CreateProductDto, ProductActions } from "@shared/product";
import {
  classTransformerConfig,
  serializeFormData,
} from "@shared/serialization";
import { instanceToPlain } from "class-transformer";
import { LoadPage, Save } from "./new-product.actions";

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
@Injectable()
export class NewProductState {
  constructor(private store: Store) {}

  @Action(LoadPage)
  public async loadPage() {
    return loadAllCategories(this.store);
  }

  @Action(Save)
  public save(ctx: StateContext<NewProductStateModel>) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }

    const dto = CreateProductDto.clone(state.form.model);

    ctx.dispatch(new SetFormDisabled(formPath));

    return ctx.dispatch(new ProductActions.Create(dto));
  }

  @Action(ProductActions.CreateSucceeded)
  public createSucceeded(ctx: StateContext<NewProductStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }

  @Action(ProductActions.CreateFailed)
  public async createFailed(ctx: StateContext<NewProductStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }
}