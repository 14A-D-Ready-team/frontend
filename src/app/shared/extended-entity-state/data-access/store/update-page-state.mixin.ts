import { Type } from "@angular/core";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, StateContext } from "@ngxs/store";
import { UpdateDtoStatic } from "@shared/api";
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

export class UpdatePageState<
  StateModel extends UpdatePageStateModel<Dto>,
  Dto,
  T,
> {
  protected DtoClass!: DtoType<Dto, T>;

  protected formPath!: string;

  protected UpdateAction!: new (id: number, dto: Dto) => any;

  protected getOriginal!: (id: number) => T;

  constructor() {}

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
  }

  protected initUpdateState({
    Actions,
    UpdateAction,
    DtoClass,
    formPath,
    getOriginal,
  }: {
    Actions: Actions;
    UpdateAction: new (id: number, dto: Dto) => any;
    DtoClass: DtoType<Dto, T>;
    formPath: string;
    getOriginal: (id: number) => T;
  }) {
    this.UpdateAction = UpdateAction;
    this.DtoClass = DtoClass;
    this.formPath = formPath;
    this.getOriginal = getOriginal;

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
      action: Actions.Save,
      methodName: "updateFailed",
    });
  }

  protected onUnchanged(ctx: StateContext<StateModel>) {}
}
