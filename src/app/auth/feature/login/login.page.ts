import { Component, Inject, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
