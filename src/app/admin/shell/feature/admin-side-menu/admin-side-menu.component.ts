import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { Observable } from "rxjs";
import { User } from "@shared/user";
import { Select, Store } from "@ngxs/store";
import { AuthState, Logout } from "@app/auth/data-access";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-admin-side-menu",
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: "./admin-side-menu.component.html",
  styleUrls: ["./admin-side-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuComponent {
  @Select(AuthState.user)
  public user$!: Observable<User | undefined>;

  constructor(private store: Store) {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
