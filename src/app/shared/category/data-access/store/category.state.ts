import {
  defaultEntityState,
  EntityStateModel,
  EntityState,
  IdStrategy,
} from "@ngxs-labs/entity-state";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, of, switchMap, tap } from "rxjs";
import { CategoryService } from "../category.service";
import { Category } from "../entity";
import { StartLoadingAll } from "./category.actions";

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
    return this.categoryService.findAll().pipe(
      //catchError(error => {}),
      tap(x => {}),
    );
  }
}
