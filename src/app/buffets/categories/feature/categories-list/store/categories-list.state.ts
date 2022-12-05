import { Injectable } from "@angular/core";
import {
  Category,
  CategoryActions,
  CategoryState,
  EditCategoryDto,
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
import {
  concat,
  delay,
  filter,
  of,
  switchMap,
  take,
  takeWhile,
  tap,
} from "rxjs";
import {
  StopEdit as StopEdit,
  Edit,
  LoadPage,
  Reload,
  SaveEdit,
  Create,
} from "./categories-list.actions";
import {
  ResetForm,
  SetFormDisabled,
  SetFormEnabled,
  SetFormPristine,
  UpdateFormValue,
} from "@ngxs/form-plugin";
import { NgxsFormState } from "@shared/extended-form-plugin";
import { Platform, ToastController } from "@ionic/angular";
import { ErrorCode, ExceptionService } from "@app/shared/exceptions";

export interface CategoriesListStateModel {
  updateForm: NgxsFormState<Partial<Category>>;
  createForm: NgxsFormState<Partial<Category>>;

  editedId?: number;
  creatingNew: boolean;
}

export const CATEGORIES_LIST_STATE_TOKEN =
  new StateToken<CategoriesListStateModel>("buffetsCategoriesList");

const updateFormPath = "buffetsCategoriesList.updateForm";
const createFormPath = "buffetsCategoriesList.createForm";

@State<CategoriesListStateModel>({
  name: CATEGORIES_LIST_STATE_TOKEN,
  defaults: {
    updateForm: {
      model: {},
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
    createForm: {
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
export class CategoriesListState {
  constructor(
    private store: Store,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
    private platform: Platform,
  ) {}

  @Selector([CategoryState.entities])
  public static categories(
    state: CategoriesListStateModel,
    categories: Category[],
  ) {
    return categories;
  }

  @Selector()
  public static creatingNew(state: CategoriesListStateModel) {
    return state.creatingNew;
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

  @Action(Create)
  public create(ctx: StateContext<CategoriesListStateModel>) {
    const state = ctx.getState();
    // eslint-disable-next-line eqeqeq
    if (state.editedId != undefined) {
      return;
    }

    ctx.patchState({ creatingNew: true });

    return of(undefined).pipe(
      switchMap(() => ctx.dispatch(new ResetForm({ path: createFormPath }))),
      switchMap(() => ctx.dispatch(new SetFormPristine(createFormPath))),
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
        path: updateFormPath,
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
            path: updateFormPath,
          }),
        ),
      ),
      switchMap(() => ctx.dispatch(new SetFormEnabled(updateFormPath))),
    );
  }

  @Action(SaveEdit)
  public saveEdit(ctx: StateContext<CategoriesListStateModel>) {
    const state = ctx.getState();

    if (state.updateForm.status === "INVALID") {
      return;
    }

    const model = state.updateForm.model;
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

    ctx.dispatch(new SetFormDisabled(updateFormPath));

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
    ctx.dispatch(new SetFormEnabled(updateFormPath));

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
