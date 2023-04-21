import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform, ViewWillEnter } from "@ionic/angular";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, CategoryState, loadCategories } from "@shared/category";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { ProductState } from "@shared/product";
import { combineLatest, map, Observable } from "rxjs";
import { createProductEditorForm, ProductEditorFormModel } from "../../utils";
import { formPath, LoadPage, Save } from "./store";

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

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet | undefined>;

  public vm$;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor(
    private store: Store,
    private router: Router,
    private platform: Platform,
  ) {
    this.form = createProductEditorForm();

    this.vm$ = combineLatest([
      this.categories$,
      this.status$,
      this.categoriesLoading$,
      this.activeBuffet$,
      this.categoryError$,
    ]).pipe(
      map(
        ([
          categories,
          status,
          categoriesLoading,
          activeBuffet,
          categoryError,
        ]) => ({
          categories,
          status,
          categoriesLoading,
          noBuffetSelected: !activeBuffet,
          categoryError,
        }),
      ),
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
