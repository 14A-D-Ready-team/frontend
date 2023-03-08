import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, loadCategories } from "@shared/category";
import { Observable } from "rxjs";
import { MainState } from "./store";

@Component({
  selector: "app-main",
  templateUrl: "./main.page.html",
  styleUrls: ["./main.page.scss"],
})
export class MainPage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(MainState.shownCategories)
  public categories$!: Observable<Category[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    loadCategories(this.store).subscribe();
  }
}
