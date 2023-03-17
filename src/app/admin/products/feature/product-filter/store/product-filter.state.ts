/* eslint-disable no-console */
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { FilterProductsQuery } from "@shared/product";
import { StoppedTyping, Typing } from "./product-filter.actions";

export interface ProductFilterStateModel {
  form: NgxsFormStateModel<FilterProductsQuery>;
  typing: boolean;
}

const name = "adminProductFilter";

export const formPath = name + ".form";

@State<ProductFilterStateModel>({
  name,
  defaults: {
    form: {
      model: {},
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
    typing: false,
  },
})
@Injectable()
export class ProductFilterState {
  @Selector()
  public static formValue(state: ProductFilterStateModel) {
    return state.form.model;
  }

  @Selector()
  public static formStatus(state: ProductFilterStateModel) {
    return state.form.status;
  }

  @Selector()
  public static typing(state: ProductFilterStateModel) {
    return state.typing;
  }

  @Action([Typing, StoppedTyping])
  public onTypingChanged(
    ctx: StateContext<ProductFilterStateModel>,
    action: Typing | StoppedTyping,
  ) {
    const nextTypingState = action instanceof Typing;
    if (nextTypingState !== ctx.getState().typing) {
      ctx.patchState({ typing: nextTypingState });
    }
  }
}
