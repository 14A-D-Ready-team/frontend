import { Injectable } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, State, StateContext, Store } from "@ngxs/store";
import { BuffetActions, CreateBuffetDto } from "@shared/buffet";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { Save } from "./new-buffet.actions";

export interface NewBuffetStateModel {
  form: NgxsFormStateModel<CreateBuffetDto>;
}

export const formPath = "newBuffet.form";

@State<NewBuffetStateModel>({
  name: "newBuffet",
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

@Injectable()
export class NewBuffetState {
  constructor() {}

  @Action(Save)
  public save(ctx: StateContext<NewBuffetStateModel>) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }
    console.log("asdasdasd");

    const dto = CreateBuffetDto.clone(state.form.model);

    ctx.dispatch(new SetFormDisabled(formPath));

    return ctx.dispatch(new BuffetActions.Create(dto));
  }

  @Action(BuffetActions.CreateSucceeded)
  public createSucceeded(ctx: StateContext<NewBuffetStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }

  @Action(BuffetActions.CreateFailed)
  public async createFailed(ctx: StateContext<NewBuffetStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }
}
