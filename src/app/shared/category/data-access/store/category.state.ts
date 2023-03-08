import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import {
  defaultEntityState,
  EntityStateModel,
  IdStrategy,
  RemoveAll,
} from "@ngxs-labs/entity-state";
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
  StateToken,
} from "@ngxs/store";
import { ExtendedEntityState } from "@shared/extended-entity-state";
import {
  TargetedRequestStatus,
  ApiRequestStatus,
  ExtendedEntityStateModel,
} from "@shared/extended-entity-state/utils";
import { concat, filter, of, switchMap } from "rxjs";
import { CategoryService } from "../category.service";
import { EditCategoryDto } from "../dto";
import { Category } from "../entity";
import { FilterCategoriesQuery } from "../query";
import * as Actions from "./category.actions";
import {
  SetCategoriesOfBuffet,
  LoadingSucceeded,
  Load,
} from "./category.actions";

export type CategoryStateModel = EntityStateModel<Category> & {
  categoriesOfBuffets: Dictionary<number[]>;
  updateStatus?: TargetedRequestStatus;
  createStatus?: ApiRequestStatus;
  deleteStatus?: TargetedRequestStatus;
};

export const CATEGORY_STATE_TOKEN = new StateToken<CategoryStateModel>(
  "category",
);

@State<CategoryStateModel>({
  name: CATEGORY_STATE_TOKEN,
  defaults: { ...defaultEntityState(), categoriesOfBuffets: {} },
})
@Injectable()
export class CategoryState extends ExtendedEntityState<
  Category,
  FilterCategoriesQuery,
  Category[],
  EditCategoryDto,
  EditCategoryDto
> {
  @Selector()
  public static categoriesOfBuffets(state: CategoryStateModel) {
    return state.categoriesOfBuffets;
  }

  public static isAllLoaded(buffetId: number) {
    return createSelector(
      [CategoryState],
      (state: CategoryStateModel) => !!state.categoriesOfBuffets[buffetId],
    );
  }

  public static entityById(id: number) {
    return createSelector(
      [CategoryState.entitiesMap],
      (entities: Dictionary<Category>) => entities[id],
    );
  }

  constructor(private readonly categoryService: CategoryService) {
    super({
      storeClass: CategoryState,
      _idKey: "id",
      idStrategy: IdStrategy.EntityIdGenerator,
      service: categoryService,
      actions: Actions,
    });
  }

  public onLoadingSucceeded(
    response: Category[],
    ctx: StateContext<ExtendedEntityStateModel<Category>>,
    action: Load,
  ) {
    return concat(
      ctx.dispatch(new RemoveAll(CategoryState)),
      ctx.dispatch(
        new LoadingSucceeded(action.query, response, response.length),
      ),
      of(action.query.buffetId).pipe(
        filter(buffetId => buffetId !== undefined),
        switchMap(buffetId =>
          ctx.dispatch(new SetCategoriesOfBuffet(buffetId!, response)),
        ),
      ),
    );
  }

  @Action(SetCategoriesOfBuffet)
  public setCategoriesOfBuffet(
    ctx: StateContext<CategoryStateModel>,
    action: SetCategoriesOfBuffet,
  ) {
    ctx.patchState({
      categoriesOfBuffets: {
        ...ctx.getState().categoriesOfBuffets,
        [action.buffetId]: action.categories.map(c => c.id),
      },
    });
  }
}
