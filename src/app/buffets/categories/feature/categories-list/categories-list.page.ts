import { Component, OnInit } from "@angular/core";
import { Category } from "@shared/product";
import { of } from "rxjs";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
})
export class CategoriesListPage implements OnInit {
  public categories$ = of([new Category()]);

  constructor() {}

  ngOnInit() {}

  public onIonInfinite(event: any) {
    console.log(event);
  }
}
