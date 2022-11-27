import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import {
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
import { concat, filter, switchMap, takeWhile, tap } from "rxjs";
import { Edit, LoadPage, Reload } from "./categories-list.actions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoriesListStateModel {
  form: {
    model: CreateCategoryDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
  };
}

export const CATEGORIES_LIST_STATE_TOKEN =
  new StateToken<CategoriesListStateModel>("buffetsCategoriesList");

@State<CategoriesListStateModel>({
  name: CATEGORIES_LIST_STATE_TOKEN,
  defaults: {
    form: {
      model: new CreateCategoryDto(),
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: true,
    },
  },
})
@Injectable()
export class CategoriesListState {
  constructor(private store: Store) {}

  @Selector()
  public static categories(state: CategoriesListStateModel) {
    return state.form;
  }

  @Selector()
  public static form(state: CategoriesListStateModel) {
    return state.form;
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
  public edit(ctx: StateContext<CategoriesListStateModel>, action: Edit) {}
}
