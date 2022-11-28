import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import {
  Category,
  CategoryActions,
  CategoryState,
  CreateCategoryDto,
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
import { DiscardEdit, Edit, LoadPage, Reload } from "./categories-list.actions";
import { UpdateFormValue } from "@ngxs/form-plugin";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoriesListStateModel {
  editorForm: {
    model?: CreateCategoryDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
  };
  editedId?: number;
}

export const CATEGORIES_LIST_STATE_TOKEN =
  new StateToken<CategoriesListStateModel>("buffetsCategoriesList");

@State<CategoriesListStateModel>({
  name: CATEGORIES_LIST_STATE_TOKEN,
  defaults: {
    editorForm: {
      model: new CreateCategoryDto(),
      dirty: false,
      status: "VALID",
      errors: {},
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
    if (state.editedId === action.category.id) {
      return;
    }

    return of(state.editedId).pipe(
      switchMap(editedId => {
        let before$: Observable<void> = of(undefined);
        if (editedId) {
          before$ = ctx.dispatch(new DiscardEdit());
        }
        return before$;
      }),
      switchMap(() => {
        ctx.patchState({ editedId: action.category.id });
        return ctx.dispatch(
          new UpdateFormValue({
            path: "buffetsCategoriesList.editorForm",
            value: {
              ...action.category,
            },
          }),
        );
      }),
    );
  }
}
