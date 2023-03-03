import { Injectable } from "@angular/core";
import { State, Store, Selector } from "@ngxs/store";
import { CategoryStateModel } from "@shared/category";


export interface MainStateModel {
    categoryIds: number[];
}

@State<MainStateModel>({
  name: "main",
  defaults: {
    categoryIds: [],
  },
})
@Injectable()
export class MainState {
  constructor(private store: Store) {}

  @Selector([MainState])
  public static shownCategories(
    state: MainStateModel,
    categoryState: CategoryStateModel,
  ) {
    return state.categoryIds
      .map(id => categoryState.entities[id])
      .filter(c => c);
  }
}
