import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, State, StateContext } from "@ngxs/store";
import { BuffetActions, CreateBuffetDto, UpdateBuffetDto } from "@shared/buffet";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { Update } from "./buffet-editor.actions";

export interface BuffetEditorStateModel {
  form: NgxsFormStateModel<UpdateBuffetDto>;
}

export const formPath = "buffetEditor.form";

@State<BuffetEditorStateModel>({
  name: "buffetEditor",
  defaults: {
    form: {
      model: new UpdateBuffetDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
export class BuffetEditorState {
  constructor() {}

  @Action(Update)
  public update(ctx: StateContext<BuffetEditorStateModel>, action: Update) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }

    const dto = UpdateBuffetDto.clone(state.form.model);

    ctx.dispatch(new SetFormDisabled(formPath));

    console.log(dto);
    return ctx.dispatch(new BuffetActions.Update(+action.id, dto));
  }

  @Action(BuffetActions.UpdateSucceeded)
  public createSucceeded(ctx: StateContext<BuffetEditorStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }

  @Action(BuffetActions.UpdateFailed)
  public async createFailed(ctx: StateContext<BuffetEditorStateModel>) {
    ctx.dispatch(new SetFormEnabled(formPath));
  }
}