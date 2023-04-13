import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform, ViewWillEnter } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { BuffetState } from "@shared/buffet";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { Category, CategoryState, loadCategories } from "@shared/category";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { CreateProductDto, ProductState } from "@shared/product";
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
export class NewProductPage implements ViewWillEnter {
  @Select(CategoryState.categoriesOfActiveBuffet)
  public categories$!: Observable<Category[]>;

  @Select(ProductState.createStatus)
  public status$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public categoryError$!: Observable<any>;

  public noBuffetSelected$: Observable<boolean>;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor(
    private store: Store,
    private router: Router,
    private platform: Platform,
  ) {
    this.form = createProductEditorForm();
    this.noBuffetSelected$ = this.categoryError$.pipe(
      map(error => error instanceof NoBuffetSelectedException),
    );
  }

  public ionViewWillEnter(): void {
    // If we only need to load the categories, we might not need a separate action
    // and we can just call the function here.
    this.store.dispatch(new LoadPage());
  }

  public reloadCategories() {
    loadCategories(this.store, true).subscribe();
  }

  public save() {
    this.store.dispatch(new Save());
  }

  public cancel() {
    this.router.navigate(["/admin/products"]);
  }
}
