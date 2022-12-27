import { Injectable } from "@angular/core";
import { Selector, State } from "@ngxs/store";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { FilterProductsQuery } from "@shared/product";

export interface ProductFilterStateModel {
  form: NgxsFormStateModel<FilterProductsQuery>;
}

const name = "buffetsProductFilter";

export const formPath = name + ".form";

@State<ProductFilterStateModel>({
  name,
  defaults: {
    form: {
      model: {},
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class ProductFilterState {
  @Selector()
  public static formValue(state: ProductFilterStateModel) {
    return state.form.model;
  }
}
