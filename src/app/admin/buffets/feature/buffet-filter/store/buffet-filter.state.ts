import { Injectable } from "@angular/core";
import { Selector, Action, StateContext, State } from "@ngxs/store";
import { SearchBuffetsQuery } from "@shared/buffet/data-access/query";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { Typing, StoppedTyping } from "./buffet-filter.actions";

export interface BuffetFilterStateModel {
  form: NgxsFormStateModel<SearchBuffetsQuery>;
  typing: boolean;
}

const name = "buffetsSearch";

export const formPath = name + ".form";

@State<BuffetFilterStateModel>({
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
export class BuffetFilterState {
  @Selector()
  public static formValue(state: BuffetFilterStateModel) {
    return state.form.model;
  }

  @Selector()
  public static formStatus(state: BuffetFilterStateModel) {
    return state.form.status;
  }

  @Selector()
  public static typing(state: BuffetFilterStateModel) {
    return state.typing;
  }

  @Action([Typing, StoppedTyping])
  public onTypingChanged(
    ctx: StateContext<BuffetFilterStateModel>,
    action: Typing | StoppedTyping,
  ) {
    const nextTypingState = action instanceof Typing;
    if (nextTypingState !== ctx.getState().typing) {
      ctx.patchState({ typing: nextTypingState });
    }
  }
}
