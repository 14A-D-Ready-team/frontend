import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, ToastController } from "@ionic/angular";
import { catchError, from, Observable, take } from "rxjs";
import { User } from "@shared/user";
import { Select, Store } from "@ngxs/store";
import { RouterModule } from "@angular/router";
import { ExceptionService } from "@shared/exceptions";
import { AuthState, Logout } from "@shared/authentication";

@Component({
  selector: "app-admin-side-menu",
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: "./admin-side-menu.component.html",
  styleUrls: ["./admin-side-menu.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSideMenuComponent {
  @Input()
  public disabled = false;

  @Select(AuthState.user)
  public user$!: Observable<User | undefined>;

  constructor(
    private store: Store,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
  ) {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
