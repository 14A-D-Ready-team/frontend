import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { LogoutFailed } from "@app/auth/data-access";
import { IonicModule, Platform, ToastController } from "@ionic/angular";
import { Actions, ofActionDispatched } from "@ngxs/store";
import { ExceptionService } from "@shared/exceptions";
import { map, startWith, Subscription, tap } from "rxjs";
import { AdminSideMenuComponent } from "../admin-side-menu/admin-side-menu.component";

@Component({
  selector: "app-admin-shell",
  template: `
    <app-admin-side-menu
      [disabled]="(isDesktop$ | async) === true"
    ></app-admin-side-menu>
    <ion-router-outlet id="admin-router-outlet"></ion-router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent {
  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() >= 1200),
  );

  private subscription: Subscription;

  constructor(
    private platform: Platform,
    actions$: Actions,
    private toastController: ToastController,
    private exceptionService: ExceptionService,
  ) {
    this.subscription = actions$
      .pipe(
        ofActionDispatched(LogoutFailed),
        tap((action: LogoutFailed) => this.showErrorToast(action.error)),
      )
      .subscribe();
  }

  private async showErrorToast(err: any) {
    const toast = await this.toastController.create({
      message: this.exceptionService.getErrorMessage(err),
      duration: 4000,
      position: "top",
      color: "danger",
      header: "Sikertelen kijelentkezés",
      icon: "warning",
    });

    toast.present();
  }
}
