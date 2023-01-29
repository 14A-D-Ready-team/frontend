import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { AdminSideMenuComponent } from "../admin-side-menu/admin-side-menu.component";

@Component({
  selector: "app-admin-shell",
  standalone: true,
  imports: [CommonModule, IonicModule, AdminSideMenuComponent],
  template: `
    <app-admin-side-menu></app-admin-side-menu>
    <ion-router-outlet id="admin-router-outlet"></ion-router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
