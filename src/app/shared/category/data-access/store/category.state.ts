import {
  defaultEntityState,
  EntityStateModel,
  EntityState,
  IdStrategy,
  SetLoading,
} from "@ngxs-labs/entity-state";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, filter, of, switchMap, tap } from "rxjs";
import { CategoryService } from "../category.service";
import { Category } from "../entity";
import {
  LoadingFailed,
  LoadingFinished,
  StartLoadingAll,
} from "./category.actions";

export type CategoryStateModel = EntityStateModel<Category>;

export const CATEGORY_STATE_TOKEN = new StateToken<CategoryStateModel>(
  "category",
);

@State<CategoryStateModel>({
  name: CATEGORY_STATE_TOKEN,
  defaults: defaultEntityState(),
})
export class CategoryState extends EntityState<Category> {
  constructor(private readonly categoryService: CategoryService) {
    super(CategoryState, "id", IdStrategy.EntityIdGenerator);
  }

  @Action(StartLoadingAll)
  public loadAll(
    ctx: StateContext<CategoryStateModel>,
    action: StartLoadingAll,
  ) {
    ctx.dispatch(new SetLoading(CategoryState, true));

    return this.categoryService.findAll().pipe(
      switchMap(categories => ctx.dispatch(new LoadingFinished(categories))),
      catchError(error => ctx.dispatch(new LoadingFailed(error))),
      tap({}),
    );
  }

  @Action(LoadingFailed)
  public loadingFailed(
    ctx: StateContext<CategoryStateModel>,
    action: LoadingFailed,
  ) {}

  @Action(LoadingFinished)
  public loadingFinished(
    ctx: StateContext<CategoryStateModel>,
    action: LoadingFinished,
  ) {}
}
