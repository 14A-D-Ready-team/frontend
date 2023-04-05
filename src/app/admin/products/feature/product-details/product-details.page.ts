import { Component, OnInit } from "@angular/core";
import { getValue, Select, Store } from "@ngxs/store";
import { Category, CategoryState, loadCategories } from "@shared/category";
import { TargetedRequestStatus } from "@shared/extended-entity-state";
import { ProductState } from "@shared/product";
import { Observable, skip } from "rxjs";
import { createProductEditorForm } from "../../utils";
import {
  DiscardChanges,
  formPath,
  LoadPage,
  ProductDetailsEffects,
  ProductDetailsState,
  Reset,
  Save,
} from "./store";
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { NavigationService } from "@shared/navigation";
@Component({
  selector: "app-admin-product-details",
  templateUrl: "./product-details.page.html",
  styleUrls: ["./product-details.page.scss"],
})
export class ProductDetailsPage
  implements ViewDidEnter, ViewWillLeave, ViewDidLeave
{
  @Select(CategoryState.categoriesOfActiveBuffet)
  public categories$!: Observable<Category[]>;

  @Select(ProductState.updateStatus)
  public status$!: Observable<TargetedRequestStatus | undefined>;

  @Select(ProductDetailsState.error)
  public initError$!: Observable<any>;

  @Select(ProductDetailsState.loading)
  public editorLoading$!: Observable<boolean>;

  public hasChanges$: Observable<boolean>;

  public formPath = formPath;

  public form = createProductEditorForm();

  constructor(
    private store: Store,
    private effects: ProductDetailsEffects,
    private navigation: NavigationService,
    public router: Router,
  ) {
    this.form.addControl("initialImageUrl", new FormControl(null));
    this.hasChanges$ = this.store
      .select(ProductDetailsState.hasChanges)
      .pipe(skip(1));
  }

  public ionViewDidEnter() {
    //this.form.valueChanges.subscribe(() => console.log(this.form));
    this.effects.start();
  }

  public ionViewWillLeave() {
    this.effects.terminate();
  }

  public ionViewDidLeave() {
    this.store.dispatch(new Reset());
  }

  public reloadCategories() {
    loadCategories(this.store, true).subscribe();
  }

  public save() {
    this.store.dispatch(new Save());
  }

  public cancel() {
    this.store.dispatch(new DiscardChanges());
  }

  public back() {
    this.navigation.back("/admin/products");
  }
}
