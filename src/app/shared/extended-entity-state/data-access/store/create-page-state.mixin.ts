/* eslint-disable prefer-rest-params */
import { Type } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { StateContext } from "@ngxs/store";
import { decorateAction } from "@shared/extended-entity-state/utils";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";

interface CreatePageStateModel<D> {
  editorForm: NgxsFormStateModel<D>;
}

type Actions = {
  Save: Type<any>;
  CreateSucceeded: Type<any>;
  CreateFailed: Type<any>;
};

export abstract class CreatePageState<
  StateModel extends CreatePageStateModel<Dto>,
  Dto,
> {
  protected DtoClass!: new (existing: Partial<Dto>) => Dto;

  protected formPath!: string;

  protected CreateAction!: new (dto: Dto) => any;

  protected showToastOnCreateError = false;

  public saveNew(ctx: StateContext<StateModel>) {
    const state = ctx.getState();
    if (state.editorForm.status === "INVALID") {
      return;
    }

    const dto = this.prepareDto(state.editorForm.model);

    ctx.dispatch(new SetFormDisabled(this.formPath));

    return ctx.dispatch(new this.CreateAction(dto));
  }

  public createSucceeded(ctx: StateContext<StateModel>) {
    ctx.dispatch(new SetFormEnabled(this.formPath));
  }

  public createFailed(ctx: StateContext<StateModel>, action: { error: any }) {
    ctx.dispatch(new SetFormEnabled(this.formPath));

    if (this.showToastOnCreateError) {
      if (typeof (this as any).showErrorToast !== "function") {
        throw new Error("Add ErrorToastState mixin to your state");
      }
      (this as any).showErrorToast(action.error);
    }
  }

  protected initCreateState({
    Actions,
    CreateAction,
    DtoClass,
    formPath,
    showToastOnCreateError = false,
  }: {
    Actions: Actions;
    CreateAction: new (dto: Dto) => any;
    DtoClass: new (existing: Partial<Dto>) => Dto;
    formPath: string;
    showToastOnCreateError?: boolean;
  }) {
    this.CreateAction = CreateAction;
    this.DtoClass = DtoClass;
    this.formPath = formPath;
    this.showToastOnCreateError = showToastOnCreateError;

    decorateAction({
      state: this,
      action: Actions.Save,
      methodName: "saveNew",
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

  protected prepareDto(formValue: Partial<Dto>) {
    return new this.DtoClass(formValue);
  }
}
