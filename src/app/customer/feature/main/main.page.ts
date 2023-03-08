import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthState } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { Category, loadAllCategories } from "@shared/category";
import { User } from "@shared/user";
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

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;

  @Select(MainState.shownCategories)
  public categories$!: Observable<Category[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    loadAllCategories(this.store).subscribe();
  }
}
