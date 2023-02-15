import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryState, loadAllCategories } from "@shared/category";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { CreateProductDto, ProductState } from "@shared/product";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { ProductEditorFormModel } from "../../utils";
import { formPath, LoadPage, Save } from "./store";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.page.html",
  styleUrls: ["./new-product.page.scss"],
})
export class NewProductPage implements OnInit {
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  @Select(ProductState.createStatus)
  public status$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor(private store: Store, private router: Router) {
    this.form = new ClassValidatorFormGroup<ProductEditorFormModel>(
      CreateProductDto,
      {
        categoryId: new ClassValidatorFormControl<number | null>(null),
        name: new ClassValidatorFormControl<string | null>(null),
        image: new FormControl<File | null>(null),
        description: new ClassValidatorFormControl<string | null>(null),
        discountedPrice: new ClassValidatorFormControl<number | null>(null),
        fullPrice: new ClassValidatorFormControl<number | null>(null),
        stock: new ClassValidatorFormControl<number | null>(null),
        customizations: new ClassValidatorFormGroup(),
      },
    );
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
