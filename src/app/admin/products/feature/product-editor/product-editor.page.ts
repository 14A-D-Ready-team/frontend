import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Select } from "@ngxs/store";
import { Category, CategoryState } from "@shared/category";
import { CreateProductDto } from "@shared/product";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { ProductEditorFormModel } from "../../utils";
import { formPath, ProductEditorState } from "./store";

@Component({
  selector: "app-admin-product-editor",
  templateUrl: "./product-editor.page.html",
  styleUrls: ["./product-editor.page.scss"],
})
export class ProductEditorPage implements OnInit {
  save() {
    throw new Error("Method not implemented.");
  }
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor() {
    this.form = new ClassValidatorFormGroup<ProductEditorFormModel>(
      CreateProductDto,
      {
        categoryId: new ClassValidatorFormControl<number | null>(null),
        name: new ClassValidatorFormControl<string | null>(null),
        description: new ClassValidatorFormControl<string | null>(null),
        discountedPrice: new ClassValidatorFormControl<number | null>(null),
        fullPrice: new ClassValidatorFormControl<number | null>(null),
        stock: new ClassValidatorFormControl<number | null>(null),
      },
    );
  }

  ngOnInit() {}
}
