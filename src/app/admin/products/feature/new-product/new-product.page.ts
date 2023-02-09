import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryState } from "@shared/category";
import { CreateProductDto } from "@shared/product";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { ProductEditorFormModel } from "../../utils";
import { formPath, Save } from "./store";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.page.html",
  styleUrls: ["./new-product.page.scss"],
})
export class NewProductPage {
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

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
      },
    );
  }

  public save() {
    this.store.dispatch(new Save());
  }

  public cancel() {
    this.router.navigate(["/admin/products"]);
  }
}
