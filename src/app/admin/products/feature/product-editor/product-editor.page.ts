import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { Category, CategoryState } from "@shared/category";
import { CreateProductDto } from "@shared/product";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { Observable } from "rxjs";
import { ProductEditorFormModel } from "../../utils";
import { Discard, formPath, ProductEditorState, Save } from "./store";

@Component({
  selector: "app-product-editor",
  templateUrl: "./product-editor.page.html",
  styleUrls: ["./product-editor.page.scss"],
})
export class ProductEditorPage implements OnInit {
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  public form: FormGroup<ProductEditorFormModel>;

  public formPath = formPath;

  constructor(private store: Store) {
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
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  public save() {
    this.store.dispatch(new Save());
  }

  public cancel() {
    this.store.dispatch(new Discard());
  }
}
