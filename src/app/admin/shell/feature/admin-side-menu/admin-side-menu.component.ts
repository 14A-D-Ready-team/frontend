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

@Component({
  selector: "app-admin-side-menu",
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: "./admin-side-menu.component.html",
  styleUrls: ["./admin-side-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuComponent implements AfterViewInit {
  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
    if (this.viewInitialized) {
      this.menuCtrl.enable(!value, "admin-side-menu");
    }
  }

  @Select(AuthState.user)
  public user$!: Observable<User | undefined>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet | undefined>;

  private viewInitialized = false;

  private _disabled = false;

  constructor(
    private store: Store,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
    private menuCtrl: MenuController,
  ) {}

  public logout() {
    this.store.dispatch(new Logout());
  }

  ngAfterViewInit() {
    this.viewInitialized = true;
    this.menuCtrl.enable(!this._disabled, "admin-side-menu");
  }
}
