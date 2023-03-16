import { Type } from "@angular/core";
import { Platform, ToastController } from "@ionic/angular";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, StateContext } from "@ngxs/store";
import { UpdateDtoStatic } from "@shared/api";
import { ExceptionService } from "@shared/exceptions";
import { decorateAction } from "@shared/extended-entity-state/utils";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { Observable } from "rxjs";
import { ErrorToastState } from "./error-toast-state.mixin";

interface UpdatePageStateModel<D> {
  editedId?: number;
  editorForm: NgxsFormStateModel<D>;
}

type Actions = {
  Save: Type<any>;
  UpdateSucceeded: Type<any>;
  UpdateFailed: Type<{ error: any }>;
};

interface DtoType<Dto, T> extends UpdateDtoStatic<Dto, T> {
  new (existing: Partial<Dto>): Dto;
}

export abstract class UpdatePageState<
  StateModel extends UpdatePageStateModel<Dto>,
  Dto,
  T,
> {
  protected DtoClass!: DtoType<Dto, T>;

  protected formPath!: string;

  protected UpdateAction!: new (id: number, dto: Dto) => any;

  protected getOriginal!: (id: number) => T;

  protected showToastOnUpdateError = false;

  public async saveUpdated(ctx: StateContext<StateModel>) {
    const state = ctx.getState();

    if (state.editorForm.status === "INVALID") {
      return;
    }

    const model = state.editorForm.model;
    const payload = this.prepareDto(model);

    const original = this.getOriginal(state.editedId!);
    this.DtoClass.omitUnchangedProperties(payload, original);

    if (!this.DtoClass.hasChanges(payload)) {
      return this.onUnchanged(ctx);
    }

    ctx.dispatch(new SetFormDisabled(this.formPath));

    return ctx.dispatch(new this.UpdateAction(state.editedId!, payload));
  }

  public updateSucceeded(
    ctx: StateContext<StateModel>,
  ): Promise<any> | Observable<any> | any {}

  public updateFailed(
    ctx: StateContext<StateModel>,
    action: { error: any },
  ): Promise<any> | Observable<any> | any {
    ctx.dispatch(new SetFormEnabled(this.formPath));

    if (this.showToastOnUpdateError) {
      if (typeof (this as any).showErrorToast !== "function") {
        throw new Error("Add ErrorToastState mixin to your state");
      }
      (this as any).showErrorToast(action.error);
    }
  }

  protected initUpdateState({
    Actions,
    UpdateAction,
    DtoClass,
    formPath,
    getOriginal,
    showToastOnUpdateError = false,
  }: {
    Actions: Actions;
    UpdateAction: new (id: number, dto: Dto) => any;
    DtoClass: DtoType<Dto, T>;
    formPath: string;
    getOriginal: (id: number) => T;
    showToastOnUpdateError: boolean;
  }) {
    this.UpdateAction = UpdateAction;
    this.DtoClass = DtoClass;
    this.formPath = formPath;
    this.getOriginal = getOriginal;
    this.showToastOnUpdateError = showToastOnUpdateError;

    decorateAction({
      state: this,
      action: Actions.Save,
      methodName: "saveUpdated",
    });
    decorateAction({
      state: this,
      action: Actions.UpdateSucceeded,
      methodName: "updateSucceeded",
    });
    decorateAction({
      state: this,
      action: Actions.UpdateFailed,
      methodName: "updateFailed",
    });
  }

  protected onUnchanged(ctx: StateContext<StateModel>) {}

  protected prepareDto(formValue: Partial<Dto>) {
    return new this.DtoClass(formValue);
  }
}
