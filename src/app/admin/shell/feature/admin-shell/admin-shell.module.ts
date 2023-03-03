import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminShellComponent } from "./admin-shell.component";
import { IonicModule } from "@ionic/angular";
import { AdminSideMenuComponent } from "../admin-side-menu";

@NgModule({
  declarations: [AdminShellComponent],
  imports: [CommonModule, IonicModule, AdminSideMenuComponent],
})
export class AdminShellModule {}
