import { Injectable } from "@angular/core";
import {
  Category,
  CategoryActions,
  CategoryState,
  EditCategoryDto,
  loadCategories,
} from "@shared/category";
import { Remove, SetError } from "@ngxs-labs/entity-state";
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from "@ngxs/store";
import { concat, of, switchMap } from "rxjs";
import {
  StopEdit as StopEdit,
  Edit,
  LoadPage,
  Reload,
  SaveEdit,
  AddNew,
  StopAddingNew,
  SaveNew,
  Delete,
} from "./category-list.actions";
import {
  ResetForm,
  SetFormDisabled,
  SetFormEnabled,
  UpdateFormValue,
} from "@ngxs/form-plugin";
import { Platform, ToastController } from "@ionic/angular";
import { ErrorCode, ExceptionService } from "@app/shared/exceptions";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { FilterCategoriesQuery } from "@shared/category/data-access/query";
import { BuffetState, BuffetStatus } from "@shared/buffet";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { Dictionary } from "lodash";

export interface CategoryListStateModel {
  editorForm: NgxsFormStateModel<Partial<Category>>;
  editedId?: number;
  creatingNew: boolean;
}

export const CATEGORY_LIST_STATE_TOKEN = new StateToken<CategoryListStateModel>(
  "adminCategoryList",
);

export const editorFormPath = "adminCategoryList.editorForm";

@State<CategoryListStateModel>({
  name: CATEGORY_LIST_STATE_TOKEN,
  defaults: {
    editorForm: {
      model: {},
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
    creatingNew: false,
  },
})
@Injectable()
export class CategoryListState {
  constructor(
    private store: Store,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
    private platform: Platform,
  ) {}

  @Selector([CategoryState.categoriesOfActiveBuffet])
  public static categories(
    state: CategoryListStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector()
  public static creatingNew(state: CategoryListStateModel) {
    return state.creatingNew;
  }

  @Selector()
  public static editedId(state: CategoryListStateModel) {
    return state.editedId;
  }

  @Action(LoadPage)
  public loadPage(ctx: StateContext<CategoryListStateModel>) {
    return loadCategories(this.store);
  }

  @Action(Reload)
  public reload(ctx: StateContext<CategoryListStateModel>) {
    return concat(
      ctx.dispatch(new SetError(CategoryState, undefined)),
      loadCategories(this.store, true),
    );
  }

  @Action(AddNew)
  public addNew(ctx: StateContext<CategoryListStateModel>) {
    const state = ctx.getState();
    // eslint-disable-next-line eqeqeq
    if (state.editedId != undefined) {
      return;
    }

    ctx.patchState({ creatingNew: true });

    return of(undefined).pipe(
      switchMap(() =>
        ctx.dispatch(
          new ResetForm({ path: editorFormPath, value: { name: "" } }),
        ),
      ),
    );
  }

  @Action(StopAddingNew)
  public stopAddingNew(ctx: StateContext<CategoryListStateModel>) {
    ctx.patchState({ creatingNew: false });

    return this.resetEditorForm(ctx);
  }

  @Action(SaveNew)
  public saveNew(ctx: StateContext<CategoryListStateModel>) {
    const state = ctx.getState();

    if (state.editorForm.status === "INVALID") {
      return;
    }

    const model = state.editorForm.model;
    const payload = new EditCategoryDto({
      ...model,
    } as Category);

    ctx.dispatch(new SetFormDisabled(editorFormPath));

    return ctx.dispatch(new CategoryActions.Create(payload));
  }

  @Action(CategoryActions.CreateSucceeded)
  public createSucceeded(ctx: StateContext<CategoryListStateModel>) {
    return ctx.dispatch(new StopAddingNew());
  }

  @Action(CategoryActions.CreateFailed)
  public async createFailed(
    ctx: StateContext<CategoryListStateModel>,
    action: CategoryActions.CreateFailed,
  ) {
    ctx.dispatch(new SetFormEnabled(editorFormPath));

    await this.showErrorToast(action.error);
  }

  @Action(Edit)
  public edit(ctx: StateContext<CategoryListStateModel>, action: Edit) {
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
  public stopEdit(ctx: StateContext<CategoryListStateModel>) {
    return this.resetEditorForm(ctx);
  }

  @Action(SaveEdit)
  public saveEdit(ctx: StateContext<CategoryListStateModel>) {
    const state = ctx.getState();

    if (state.editorForm.status === "INVALID") {
      return;
    }

    const model = state.editorForm.model;
    const payload = new EditCategoryDto({
      ...model,
    } as Category);

    const original = this.store.selectSnapshot(
      CategoryState.entityById(state.editedId!),
    );
    payload.omitUnchangedProperties(original);

    if (!payload.hasChanges()) {
      return ctx.dispatch(new StopEdit());
    }

    ctx.dispatch(new SetFormDisabled(editorFormPath));

    return ctx.dispatch(new CategoryActions.Update(state.editedId!, payload));
  }

  @Action(CategoryActions.UpdateSucceeded)
  public updateSucceeded(ctx: StateContext<CategoryListStateModel>) {
    return ctx.dispatch(new StopEdit());
  }

  @Action(CategoryActions.UpdateFailed)
  public async updateFailed(
    ctx: StateContext<CategoryListStateModel>,
    action: CategoryActions.UpdateFailed,
  ) {
    ctx.dispatch(new SetFormEnabled(editorFormPath));

    await this.showErrorToast(action.error);

    if (action.error?.errorCode === ErrorCode.NotFoundException) {
      const editedId = ctx.getState().editedId;
      ctx.dispatch(new StopEdit());
      return ctx.dispatch(new Remove(CategoryState, e => e.id === editedId));
    }
  }

  @Action(Delete)
  public delete(ctx: StateContext<CategoryListStateModel>, action: Delete) {
    return ctx.dispatch(new CategoryActions.Delete(action.id));
  }

  private resetEditorForm(ctx: StateContext<CategoryListStateModel>) {
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

  private async showErrorToast(error: any) {
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
