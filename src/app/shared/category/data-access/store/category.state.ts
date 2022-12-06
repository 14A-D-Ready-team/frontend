import { Dictionary } from "@/types";
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
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  StateToken,
} from "@ngxs/store";
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
  UpdateFailed,
  Create,
  CreateSucceeded,
  CreateFailed,
} from "./category.actions";

export interface ApiRequestStatus {
  loading: boolean;
  error?: any;
}

export interface EditStatus extends ApiRequestStatus {
  editedId: number;
}

export type CategoryStateModel = EntityStateModel<Category> & {
  isAllLoaded: boolean;
  updateStatus?: EditStatus;
  createStatus?: ApiRequestStatus;
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
  public static updateStatus(state: CategoryStateModel) {
    return state.updateStatus;
  }

  @Selector()
  public static createStatus(state: CategoryStateModel) {
    return state.createStatus;
  }

  @Selector()
  public static isAllLoaded(state: CategoryStateModel) {
    return state.isAllLoaded;
  }

  public static entityById(id: number) {
    return createSelector(
      [CategoryState.entitiesMap],
      (entities: Dictionary<Category>) => entities[id],
    );
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

  @Action(Create)
  public createCategory(ctx: StateContext<CategoryStateModel>, action: Create) {
    ctx.patchState({ createStatus: this.getLoadingStatus() });

    return this.categoryService.create(action.payload).pipe(
      switchMap(category => ctx.dispatch(new CreateSucceeded(category))),
      catchError(error => ctx.dispatch(new CreateFailed(error))),
    );
  }

  @Action(CreateSucceeded)
  public createSucceeded(
    ctx: StateContext<CategoryStateModel>,
    action: CreateSucceeded,
  ) {
    ctx.patchState({ createStatus: undefined });
    return ctx.dispatch(new CreateOrReplace(CategoryState, action.category));
  }

  @Action(CreateFailed)
  public createFailed(
    ctx: StateContext<CategoryStateModel>,
    action: CreateFailed,
  ) {
    ctx.patchState({ createStatus: this.getFailedStatus(action.error) });
  }

  @Action(Update)
  public updateCategory(ctx: StateContext<CategoryStateModel>, action: Update) {
    ctx.patchState({
      updateStatus: {
        ...this.getLoadingStatus(),
        editedId: action.payload.id,
      },
    });

    return this.categoryService.update(action.payload.id, action.payload).pipe(
      switchMap(category => ctx.dispatch(new UpdateSucceeded(category))),
      catchError(error => ctx.dispatch(new UpdateFailed(error))),
    );
  }

  @Action(UpdateSucceeded)
  public updateSucceeded(
    ctx: StateContext<CategoryStateModel>,
    action: UpdateSucceeded,
  ) {
    ctx.patchState({
      updateStatus: undefined,
    });
    return ctx.dispatch(new CreateOrReplace(CategoryState, action.category));
  }

  @Action(UpdateFailed)
  public updateFailed(
    ctx: StateContext<CategoryStateModel>,
    action: UpdateFailed,
  ) {
    const state = ctx.getState();
    ctx.patchState({
      updateStatus: {
        ...this.getFailedStatus(action.error),
        editedId: state.updateStatus?.editedId || -1,
      },
    });
  }

  private getLoadingStatus(): ApiRequestStatus {
    return {
      loading: true,
      error: undefined,
    };
  }

  private getFailedStatus(error: any): ApiRequestStatus {
    return {
      loading: false,
      error,
    };
  }
}
