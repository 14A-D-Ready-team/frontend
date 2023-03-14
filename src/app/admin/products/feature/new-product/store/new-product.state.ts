/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, State, Store } from "@ngxs/store";
import { loadCategories } from "@shared/category";
import { CreatePageState as CPS } from "@shared/extended-entity-state";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";
import { CreateProductDto, ProductActions } from "@shared/product";
import { Mixin } from "ts-mixer";
import { LoadPage, Save } from "./new-product.actions";

export interface NewProductStateModel {
  editorForm: NgxsFormStateModel<CreateProductDto>;
}

export const formPath = "newProduct.form";

const CreatePageState = CPS as typeof CPS<
  NewProductStateModel,
  CreateProductDto
>;

@State<NewProductStateModel>({
  name: "newProduct",
  defaults: {
    editorForm: {
      model: new CreateProductDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class NewProductState
  extends Mixin(CreatePageState)
  implements NgxsOnInit
{
  constructor(private store: Store) {
    super();
  }

  @Action(LoadPage)
  public async loadPage() {
    return loadCategories(this.store);
  }

  public ngxsOnInit() {
    this.initCreateState({
      Actions: {
        Save,
        CreateSucceeded: ProductActions.CreateSucceeded,
        CreateFailed: ProductActions.CreateFailed,
      },
      CreateAction: ProductActions.Create,
      DtoClass: CreateProductDto,
      formPath,
    });
  }
}
