import { Type } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, StateContext } from "@ngxs/store";
import { decorateAction } from "@shared/extended-entity-state/utils";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";

interface CreatePageStateModel<D> {
  form: NgxsFormStateModel<D>;
}

type Actions<Dto> = {
  Create: new (dto: Dto) => any;
  Save: Type<any>;
  CreateSucceeded: Type<any>;
  CreateFailed: Type<any>;
};

export abstract class CreatePageState<
  StateModel extends CreatePageStateModel<Dto>,
  Dto,
> {
  protected abstract DtoClass: new (existing: Partial<Dto>) => Dto;

  protected abstract formPath: string;

  protected abstract Actions: Actions<Dto>;

  public save(ctx: StateContext<StateModel>) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }

    const dto = new this.DtoClass(state.form.model);

    ctx.dispatch(new SetFormDisabled(this.formPath));

    return ctx.dispatch(new this.Actions.Create(dto));
  }

  public createSucceeded(ctx: StateContext<StateModel>) {
    ctx.dispatch(new SetFormEnabled(this.formPath));
  }

  public createFailed(ctx: StateContext<StateModel>) {
    ctx.dispatch(new SetFormEnabled(this.formPath));
  }

  protected init() {
    decorateAction({
      state: this,
      action: this.Actions.Save,
      methodName: "save",
    });
    decorateAction({
      state: this,
      action: this.Actions.CreateSucceeded,
      methodName: "createSucceeded",
    });
    decorateAction({
      state: this,
      action: this.Actions.Save,
      methodName: "createFailed",
    });
  }
}
