import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Category, CategoryState } from "@shared/category";
import { Observable } from "rxjs";
import { formPath } from "./store";

@Component({
  selector: "app-admin-product-details",
  templateUrl: "./product-details.page.html",
  styleUrls: ["./product-details.page.scss"],
})
export class ProductDetailsPage implements OnInit {
  save() {
    throw new Error("Method not implemented.");
  }
  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;


  public formPath = formPath;

  constructor() {
    
  }

  ngOnInit() {}
}
