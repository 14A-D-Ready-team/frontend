import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Buffet, BuffetState } from "@shared/buffet";
import { Observable } from "rxjs";

@Component({
  selector: "app-buffet-select",
  templateUrl: "./buffet-select.page.html",
  styleUrls: ["./buffet-select.page.scss"],
})
export class BuffetSelectPage implements OnInit {
  constructor() {}

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  ngOnInit() {}
}
