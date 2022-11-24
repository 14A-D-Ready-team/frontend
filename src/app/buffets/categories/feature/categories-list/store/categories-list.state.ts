import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { CreateCategoryDto } from "@app/shared/category";
import { Selector, State, StateToken } from "@ngxs/store";

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
  @Selector()
  public static form2(state: CategoriesListStateModel) {
    return state.form;
  }
}
