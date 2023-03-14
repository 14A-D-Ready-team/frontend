import { Type } from "@angular/core";
import { Platform, ToastController } from "@ionic/angular";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, StateContext } from "@ngxs/store";
import { UpdateDtoStatic } from "@shared/api";
import { ExceptionService } from "@shared/exceptions";
import { decorateAction } from "@shared/extended-entity-state/utils";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { Observable } from "rxjs";

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
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
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

  protected abstract toastController: ToastController;

  protected abstract exceptionService: ExceptionService;

  protected abstract platform: Platform;

  protected showToastOnError = false;

  public async save(ctx: StateContext<StateModel>) {
    const state = ctx.getState();

    if (state.editorForm.status === "INVALID") {
      return;
    }

    const model = state.editorForm.model;
    const payload = new this.DtoClass(model);

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
    this.showErrorToast(action.error);
  }

  protected initUpdateState({
    Actions,
    UpdateAction,
    DtoClass,
    formPath,
    getOriginal,
    showToastOnError = false,
  }: {
    Actions: Actions;
    UpdateAction: new (id: number, dto: Dto) => any;
    DtoClass: DtoType<Dto, T>;
    formPath: string;
    getOriginal: (id: number) => T;
    showToastOnError?: boolean;
  }) {
    this.UpdateAction = UpdateAction;
    this.DtoClass = DtoClass;
    this.formPath = formPath;
    this.getOriginal = getOriginal;
    this.showToastOnError = showToastOnError;

    decorateAction({
      state: this,
      action: Actions.Save,
      methodName: "save",
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

  protected async showErrorToast(error: any) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: this.exceptionService.getErrorMessage(error),
      header: "Sikertelen mentés",
      color: "danger",
      position: this.platform.width() > 600 ? "top" : "bottom",
    });
    toast.present();
  }
}
