import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AuthState, Logout } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { User } from "@shared/user";
import { Observable } from "rxjs";

@Component({
  selector: "app-profile-mobile",
  templateUrl: "./profile-mobile.page.html",
  styleUrls: ["./profile-mobile.page.scss"],
})
export class ProfileMobilePage implements OnInit {
  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet>;

  @Select(AuthState.user)
  public activeUser$!: Observable<User>;
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }

  ngOnInit() {}
}
