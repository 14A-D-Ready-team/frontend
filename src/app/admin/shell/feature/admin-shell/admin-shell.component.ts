import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IonicModule, Platform } from "@ionic/angular";
import { map, startWith } from "rxjs";
import { AdminSideMenuComponent } from "../admin-side-menu/admin-side-menu.component";

@Component({
  selector: "app-admin-shell",
  standalone: true,
  imports: [CommonModule, IonicModule, AdminSideMenuComponent],
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

  constructor(private platform: Platform) {}
}
