import { Injectable } from "@angular/core";
import {
  defaultEntityState,
  EntityStateModel,
  EntityState,
  IdStrategy,
  SetLoading,
  CreateOrReplace,
  RemoveAll,
  SetError,
} from "@ngxs-labs/entity-state";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, concat, filter, finalize, of, switchMap, tap } from "rxjs";
import { CategoryService } from "../category.service";
import { Category } from "../entity";
import {
  LoadingFailed,
  LoadingSucceeded,
  LoadAll,
  SetAllLoaded,
  Update,
  UpdateSucceeded,
} from "./category.actions";

export type CategoryStateModel = EntityStateModel<Category> & {
  isAllLoaded: boolean;
  updateStatus?: {
    loading: boolean;
    updatedId: number;
    error?: any;
  };
};

export const CATEGORY_STATE_TOKEN = new StateToken<CategoryStateModel>(
  "category",
);

@State<CategoryStateModel>({
  name: CATEGORY_STATE_TOKEN,
  defaults: { ...defaultEntityState(), isAllLoaded: false },
})
@Injectable()
export class CategoryState extends EntityState<Category> {
  @Selector()
  public static isAllLoaded(state: CategoryStateModel) {
    return state.isAllLoaded;
  }

  constructor(private readonly categoryService: CategoryService) {
    super(CategoryState, "id", IdStrategy.EntityIdGenerator);
  }

  @Action(LoadAll)
  public loadAll(ctx: StateContext<CategoryStateModel>, action: LoadAll) {
    ctx.dispatch(new SetLoading(CategoryState, true));

    return this.categoryService.findAll().pipe(
      switchMap(categories =>
        // 1: If it gets too complex, might create separate actions (LoadingAllSucceeded, LoadingAllFailed)
        concat(
          ctx.dispatch(new RemoveAll(CategoryState)),
          ctx.dispatch(new LoadingSucceeded(categories)),
        ),
      ),
      catchError(error => ctx.dispatch(new LoadingFailed(error))),
      finalize(() =>
        // 1.
        concat(
          ctx.dispatch(new SetAllLoaded(true)),
          ctx.dispatch(new SetLoading(CategoryState, false)),
        ),
      ),
    );
  }

  @Action(LoadingFailed)
  public loadingFailed(
    ctx: StateContext<CategoryStateModel>,
    action: LoadingFailed,
  ) {
    return ctx.dispatch(new SetError(CategoryState, action.error));
  }

  @Action(LoadingSucceeded)
  public loadingSucceeded(
    ctx: StateContext<CategoryStateModel>,
    action: LoadingSucceeded,
  ) {
    return ctx.dispatch(new CreateOrReplace(CategoryState, action.categories));
  }

  @Action(SetAllLoaded)
  public setAllLoaded(
    ctx: StateContext<CategoryStateModel>,
    action: SetAllLoaded,
  ) {
    ctx.patchState({ isAllLoaded: action.isAllLoaded });
  }

  @Action(Update)
  public updateCategory(ctx: StateContext<CategoryStateModel>, action: Update) {
    ctx.patchState({
      updateStatus: {
        loading: true,
        updatedId: action.payload.id,
        error: undefined,
      },
    });

    return this.categoryService
      .update(action.payload.id, action.payload)
      .pipe(switchMap(category => ctx.dispatch(new UpdateSucceeded(category))));
  }
}
