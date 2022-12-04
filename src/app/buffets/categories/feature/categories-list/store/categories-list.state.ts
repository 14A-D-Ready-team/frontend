import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import {
  Category,
  CategoryActions,
  CategoryState,
  EditCategoryDto,
} from "@shared/category";
import { Remove, SetError } from "@ngxs-labs/entity-state";
import {
  Action,
  Actions,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from "@ngxs/store";
import { concat, filter, of, switchMap, take, takeWhile, tap } from "rxjs";
import {
  StopEdit as StopEdit,
  Edit,
  LoadPage,
  Reload,
  SaveEdit,
} from "./categories-list.actions";
import {
  ResetForm,
  SetFormDisabled,
  SetFormEnabled,
  UpdateFormValue,
} from "@ngxs/form-plugin";
import { FormControlErrors } from "@shared/extended-form-plugin";
import { Platform, ToastController } from "@ionic/angular";
import { ErrorCode, ExceptionService } from "@app/shared/exceptions";

export interface CategoriesListStateModel {
  editorForm: {
    model: Partial<Category>;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  editedId?: number;
}

export const CATEGORIES_LIST_STATE_TOKEN =
  new StateToken<CategoriesListStateModel>("buffetsCategoriesList");

const editorFormPath = "buffetsCategoriesList.editorForm";

@State<CategoriesListStateModel>({
  name: CATEGORIES_LIST_STATE_TOKEN,
  defaults: {
    editorForm: {
      model: {},
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class CategoriesListState {
  constructor(
    private store: Store,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
    public platform: Platform,
  ) {}

  @Selector([CategoryState.entities])
  public static categories(
    state: CategoriesListStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector()
  public static editedId(state: CategoriesListStateModel) {
    return state.editedId;
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<CategoriesListStateModel>) {
    return this.store.select(CategoryState.loading).pipe(
      takeWhile(loading => loading, true),
      filter(loading => !loading),
      switchMap(() => this.store.selectOnce(CategoryState.isAllLoaded)),
      filter(allLoaded => !allLoaded),
      switchMap(() => ctx.dispatch(new CategoryActions.LoadAll())),
    );
  }

  @Action(Reload)
  public reload(ctx: StateContext<CategoriesListStateModel>) {
    return concat(
      ctx.dispatch(new SetError(CategoryState, undefined)),
      ctx.dispatch(new CategoryActions.LoadAll()),
    );
  }

  @Action(Edit)
  public edit(ctx: StateContext<CategoriesListStateModel>, action: Edit) {
    const state = ctx.getState();
    // eslint-disable-next-line eqeqeq
    if (state.editedId != undefined) {
      return;
    }

    ctx.patchState({ editedId: action.category.id });
    return ctx.dispatch(
      new UpdateFormValue({
        path: editorFormPath,
        value: action.category,
      }),
    );
  }

  @Action(StopEdit)
  public stopEdit(ctx: StateContext<CategoriesListStateModel>) {
    ctx.patchState({ editedId: undefined });

    return of(undefined).pipe(
      switchMap(() =>
        ctx.dispatch(
          new ResetForm({
            path: editorFormPath,
          }),
        ),
      ),
      switchMap(() => ctx.dispatch(new SetFormEnabled(editorFormPath))),
    );
  }

  @Action(SaveEdit)
  public saveEdit(ctx: StateContext<CategoriesListStateModel>) {
    const state = ctx.getState();

    if (state.editorForm.status === "INVALID") {
      return;
    }

    const model = state.editorForm.model;
    const payload = new EditCategoryDto({
      ...model,
      id: state.editedId,
    } as Category);

    const original = this.store.selectSnapshot(
      CategoryState.entityById(payload.id),
    );
    payload.omitUnchangedProperties(original);

    if (!payload.hasChanges()) {
      return ctx.dispatch(new StopEdit());
    }

    ctx.dispatch(new SetFormDisabled(editorFormPath));

    return ctx.dispatch(new CategoryActions.Update(payload));
  }

  @Action(CategoryActions.UpdateSucceeded)
  public updateSucceeded(ctx: StateContext<CategoriesListStateModel>) {
    return ctx.dispatch(new StopEdit());
  }

  @Action(CategoryActions.UpdateFailed)
  public async updateFailed(
    ctx: StateContext<CategoriesListStateModel>,
    action: CategoryActions.UpdateFailed,
  ) {
    ctx.dispatch(new SetFormEnabled(editorFormPath));

    const toast = await this.toastController.create({
      duration: 2000,
      message: this.exceptionService.getErrorMessage(action.error),
      header: "Sikertelen mentés",
      color: "danger",
      position: this.platform.width() > 600 ? "top" : "bottom",
    });
    toast.present();

    if (action.error?.errorCode === ErrorCode.NotFoundException) {
      const editedId = ctx.getState().editedId;
      ctx.dispatch(new StopEdit());
      return ctx.dispatch(new Remove(CategoryState, e => e.id === editedId));
    }
  }
}
