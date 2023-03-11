import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryState, loadAllCategories } from "@shared/category";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { CreateProductDto, ProductState } from "@shared/product";
import {
  ClassValidatorFormArray,
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { map, Observable, startWith } from "rxjs";
import {
  createProductEditorForm,
  CustomizationFormModel,
  ProductEditorFormModel,
} from "../../utils";
import {
  formPath,
  LoadPage,
  NewProductState,
  NewProductStateModel,
  Save,
} from "./store";

@Component({
  selector: "app-admin-new-product",
  templateUrl: "./new-product.page.html",
  styleUrls: ["./new-product.page.scss"],
})
export class NewProductPage implements OnInit {
  @Select(ProductState.createStatus)
  public status$!: Observable<ApiRequestStatus | undefined>;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor(
    private store: Store,
    private router: Router,
    private platform: Platform,
  ) {
    this.form = createProductEditorForm();
  }

  public ngOnInit(): void {
    // If we only need to load the categories, we might not need a separate action
    // and we can just call the function here.
    this.store.dispatch(new LoadPage());
  }

  public reloadCategories() {
    loadAllCategories(this.store, true).subscribe();
  }

  public save() {
    this.store.dispatch(new Save());
  }

  public cancel() {
    this.router.navigate(["/admin/products"]);
  }
}
