/* eslint-disable prefer-rest-params */
import { Type } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, StateContext } from "@ngxs/store";
import { decorateAction } from "@shared/extended-entity-state/utils";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";

interface CreatePageStateModel<D> {
  form: NgxsFormStateModel<D>;
}

type Actions = {
  Save: Type<any>;
  CreateSucceeded: Type<any>;
  CreateFailed: Type<any>;
};

export class CreatePageState<
  StateModel extends CreatePageStateModel<Dto>,
  Dto,
> {
  protected DtoClass!: new (existing: Partial<Dto>) => Dto;

  protected formPath!: string;

  protected CreateAction!: new (dto: Dto) => any;

  public save(ctx: StateContext<StateModel>) {
    const state = ctx.getState();
    if (state.form.status === "INVALID") {
      return;
    }

    const dto = new this.DtoClass(state.form.model);

    ctx.dispatch(new SetFormDisabled(this.formPath));

    return ctx.dispatch(new this.CreateAction(dto));
  }

  public createSucceeded(ctx: StateContext<StateModel>) {
    ctx.dispatch(new SetFormEnabled(this.formPath));
  }

  public createFailed(ctx: StateContext<StateModel>) {
    ctx.dispatch(new SetFormEnabled(this.formPath));
  }

  protected initCreateState({
    Actions,
    CreateAction,
    DtoClass,
    formPath,
  }: {
    Actions: Actions;
    CreateAction: new (dto: Dto) => any;
    DtoClass: new (existing: Partial<Dto>) => Dto;
    formPath: string;
  }) {
    this.CreateAction = CreateAction;
    this.DtoClass = DtoClass;
    this.formPath = formPath;

    decorateAction({
      state: this,
      action: Actions.Save,
      methodName: "save",
    });
    decorateAction({
      state: this,
      action: Actions.CreateSucceeded,
      methodName: "createSucceeded",
    });
    decorateAction({
      state: this,
      action: Actions.Save,
      methodName: "createFailed",
    });
  }
}
