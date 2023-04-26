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
  Store,
} from "@ngxs/store";
import { BuffetState } from "@shared/buffet";
import { ExtendedEntityState } from "@shared/extended-entity-state";
import {
  TargetedRequestStatus,
  ApiRequestStatus,
  ExtendedEntityStateModel,
} from "@shared/extended-entity-state/utils";
import { concat, filter, Observable, of, switchMap, tap } from "rxjs";
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
import { DeleteSucceeded } from "@shared/extended-entity-state/data-access/store/extended-entity.actions";
import { fromPairs } from "lodash";

export type CategoryStateModel = ExtendedEntityStateModel<Category> & {
  categoriesOfBuffets: Dictionary<number[]>;
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

  @Selector([
    CategoryState.entitiesMap,
    CategoryState.categoriesOfBuffets,
    BuffetState.activeId,
  ])
  public static categoriesOfActiveBuffet(
    state: CategoryState,
    categories: Dictionary<Category>,
    categoriesOfBuffets: Dictionary<string[]>,
    buffetId?: string,
  ) {
    if (!buffetId) {
      return [];
    }
    const ids = categoriesOfBuffets[+buffetId] || [];
    return ids.map(id => categories[+id]).filter(c => c);
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

  constructor(private readonly categoryService: CategoryService, store: Store) {
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
      //!!!!
      action.query.buffetId
        ? ctx.dispatch(
            new Actions.RemoveAllCategoriesOfBuffet(action.query.buffetId),
          )
        : of(null),
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

  @Action(Actions.RemoveAllCategoriesOfBuffet)
  public removeAllCategoriesOfBuffet(
    ctx: StateContext<CategoryStateModel>,
    action: Actions.RemoveAllCategoriesOfBuffet,
  ) {
    ctx.patchState({
      categoriesOfBuffets: {
        ...ctx.getState().categoriesOfBuffets,
        [action.buffetId]: [],
      },
    });
  }

  public createSucceeded(
    ctx: StateContext<EntityStateModel<Category>>,
    action: Actions.CreateSucceeded,
  ) {
    const castCtx = ctx as unknown as StateContext<CategoryStateModel>;

    return super.createSucceeded(ctx, action).pipe(
      tap(() => {
        const categoriesOfBuffets = castCtx.getState().categoriesOfBuffets;
        const buffetId = action.entity.buffetId;

        castCtx.patchState({
          categoriesOfBuffets: {
            ...categoriesOfBuffets,
            [buffetId]: [
              ...(categoriesOfBuffets[buffetId] || []),
              action.entity.id,
            ],
          },
        });
      }),
    );
  }

  public deleteSucceeded(
    ctx: StateContext<ExtendedEntityStateModel<Category>>,
    action: DeleteSucceeded,
  ): Observable<void> {
    const castCtx = ctx as unknown as StateContext<CategoryStateModel>;
    return super.deleteSucceeded(ctx, action).pipe(
      tap(() => {
        const categoriesOfBuffets = castCtx.getState().categoriesOfBuffets;
        const pairs = Object.entries(categoriesOfBuffets).map(
          ([key, value]) => {
            return [key, value.filter(id => id !== action.id)] as [
              string,
              number[],
            ];
          },
        );
        castCtx.patchState({
          categoriesOfBuffets: fromPairs(pairs),
        });
      }),
    );
  }
}
