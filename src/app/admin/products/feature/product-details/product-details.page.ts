import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Category, CategoryState } from "@shared/category";
import { TargetedRequestStatus } from "@shared/extended-entity-state";
import { ProductState } from "@shared/product";
import { Observable } from "rxjs";
import { createProductEditorForm } from "../../utils";
import { formPath } from "./store";

@Component({
  selector: "app-admin-product-details",
  templateUrl: "./product-details.page.html",
  styleUrls: ["./product-details.page.scss"],
})
export class ProductDetailsPage implements OnInit {
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  @Select(ProductState.updateStatus)
  public status$!: Observable<TargetedRequestStatus | undefined>;

  public formPath = formPath;

  public form = createProductEditorForm();

  constructor() {}

  ngOnInit() {}
}
