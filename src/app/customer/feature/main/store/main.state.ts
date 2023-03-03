import { Injectable } from "@angular/core";
import { DeepReadonly } from "@ngxs-labs/entity-state";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import {
  Category,
  CategoryActions,
  CategoryState,
  CategoryStateModel,
  FilterCategoriesQuery,
} from "@shared/category";

export interface MainStateModel {
  categoryIds: number[];
  query: DeepReadonly<FilterCategoriesQuery>;
}

@State<MainStateModel>({
  name: "main",
  defaults: {
    categoryIds: [],
    query: new FilterCategoriesQuery(),
  },
})
@Injectable()
export class MainState {
  constructor(private store: Store) {}

  @Selector([CategoryState])
  public static shownCategories(
    state: MainStateModel,
    categoryState: CategoryStateModel,
  ) {
    return Object.values(categoryState.entities);
  }
}
