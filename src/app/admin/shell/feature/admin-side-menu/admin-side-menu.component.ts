/* eslint-disable no-underscore-dangle */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, MenuController, ToastController } from "@ionic/angular";
import { BehaviorSubject, catchError, from, Observable, take } from "rxjs";
import { User } from "@shared/user";
import { Select, Store } from "@ngxs/store";
import { RouterModule } from "@angular/router";
import { ExceptionService } from "@shared/exceptions";
import { AuthState, Logout } from "@shared/authentication";
import { Buffet, BuffetState } from "@shared/buffet";
import { MenuWrapperComponent } from "@shared/menu";

@Component({
  selector: "app-admin-side-menu",
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, MenuWrapperComponent],
  templateUrl: "./admin-side-menu.component.html",
  styleUrls: ["./admin-side-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuComponent {
  @Input()
  public disabled = false;

  @Select(AuthState.user)
  public user$!: Observable<User | undefined>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet | undefined>;

  constructor(private store: Store) {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
