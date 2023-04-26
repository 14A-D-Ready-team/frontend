import { Store } from "@ngxs/store";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Logout } from "@shared/authentication";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}
  currentPage = this.router.url;

  public logout() {
    this.store.dispatch(new Logout());
  }

  ngOnInit() {
    //console.log(this.currentPage);
  }
}
