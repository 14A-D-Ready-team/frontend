import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import {
  Category,
  CategoryActions,
  CategoryState,
  EditCategoryDto,
} from "@shared/category";
import { SetError } from "@ngxs-labs/entity-state";
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
  filter,
  map,
  Observable,
  of,
  switchMap,
  takeWhile,
  tap,
} from "rxjs";
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
  UpdateFormStatus,
  UpdateFormValue,
} from "@ngxs/form-plugin";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoriesListStateModel {
  editorForm: {
    model: Partial<Category>;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
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
    },
  },
})
@Injectable()
export class CategoriesListState {
  constructor(private store: Store) {}

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
    const model = ctx.getState().editorForm.model as Category;
    const payload = new EditCategoryDto(model);

    return of(undefined).pipe(
      switchMap(() => ctx.dispatch(new SetFormDisabled(editorFormPath))),
      switchMap(() => ctx.dispatch(new CategoryActions.Update(payload))),
      switchMap(() => ctx.dispatch(new StopEdit())),
    );
  }
}
