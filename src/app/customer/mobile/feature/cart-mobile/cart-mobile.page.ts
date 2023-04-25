import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Observable } from "rxjs";

@Component({
  selector: "app-cart-mobile",
  templateUrl: "./cart-mobile.page.html",
  styleUrls: ["./cart-mobile.page.scss"],
})
export class CartMobilePage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;
  constructor() {}

  ngOnInit() {}
}
