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
  NgxsOnInit,
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
import { ResetForm, SetFormEnabled, UpdateFormValue } from "@ngxs/form-plugin";
import { Platform, ToastController } from "@ionic/angular";
import { ErrorCode, ExceptionService } from "@app/shared/exceptions";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { BuffetState } from "@shared/buffet";
import { Dictionary } from "lodash";
import {
  UpdatePageState as UPS,
  CreatePageState as CPS,
} from "@shared/extended-entity-state";
import { Mixin } from "ts-mixer";
import { ErrorToastState } from "@shared/extended-entity-state/data-access/store/error-toast-state.mixin";

export interface CategoryListStateModel {
  editorForm: NgxsFormStateModel<EditCategoryDto>;
  editedId?: number;
  creatingNew: boolean;
}

export const CATEGORY_LIST_STATE_TOKEN = new StateToken<CategoryListStateModel>(
  "adminCategoryList",
);

export const editorFormPath = "adminCategoryList.editorForm";

const UpdatePageState = UPS as typeof UPS<
  CategoryListStateModel,
  EditCategoryDto,
  Category
>;

const CreatePageState = CPS as typeof CPS<
  CategoryListStateModel,
  EditCategoryDto
>;
@State<CategoryListStateModel>({
  name: CATEGORY_LIST_STATE_TOKEN,
  defaults: {
    editorForm: {
      model: { name: "", buffetId: 0 },
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
export class CategoryListState
  extends Mixin(UpdatePageState, CreatePageState, ErrorToastState)
  implements NgxsOnInit
{
  constructor(
    private store: Store,
    protected toastController: ToastController,
    protected exceptionService: ExceptionService,
    protected platform: Platform,
  ) {
    super();
  }

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

  public ngxsOnInit(ctx: StateContext<CategoryListStateModel>) {
    this.initUpdateState({
      Actions: {
        Save: SaveEdit,
        UpdateFailed: CategoryActions.UpdateFailed,
        UpdateSucceeded: CategoryActions.UpdateSucceeded,
      },
      UpdateAction: CategoryActions.Update,
      DtoClass: EditCategoryDto,
      formPath: editorFormPath,
      showToastOnUpdateError: true,
      getOriginal: (id: number) =>
        this.store.selectSnapshot(CategoryState.entityById(id)),
    });

    this.initCreateState({
      Actions: {
        Save: SaveNew,
        CreateFailed: CategoryActions.CreateFailed,
        CreateSucceeded: CategoryActions.CreateSucceeded,
      },
      CreateAction: CategoryActions.Create,
      DtoClass: EditCategoryDto,
      formPath: editorFormPath,
      showToastOnCreateError: true,
    });
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
          new ResetForm({
            path: editorFormPath,
            value: {
              name: "",
              buffetId: this.store.selectSnapshot(BuffetState.activeId),
            },
          }),
        ),
      ),
    );
  }

  @Action(StopAddingNew)
  public stopAddingNew(ctx: StateContext<CategoryListStateModel>) {
    ctx.patchState({ creatingNew: false });

    return this.resetEditorForm(ctx);
  }

  public createSucceeded(ctx: StateContext<CategoryListStateModel>) {
    return ctx.dispatch(new StopAddingNew());
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
        value: new EditCategoryDto(action.category),
      }),
    );
  }

  @Action(StopEdit)
  public stopEdit(ctx: StateContext<CategoryListStateModel>) {
    return this.resetEditorForm(ctx);
  }

  public updateSucceeded(ctx: StateContext<CategoryListStateModel>) {
    super.updateSucceeded(ctx);
    return ctx.dispatch(new StopEdit());
  }

  public async updateFailed(
    ctx: StateContext<CategoryListStateModel>,
    action: CategoryActions.UpdateFailed,
  ) {
    super.updateFailed(ctx, action);

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

  protected onUnchanged(ctx: StateContext<CategoryListStateModel>) {
    return ctx.dispatch(new StopEdit());
  }

  protected prepareDto(formValue: Partial<EditCategoryDto>) {
    return new EditCategoryDto({
      ...formValue,
      buffetId: +this.store.selectSnapshot(BuffetState.activeId),
    });
  }
}
