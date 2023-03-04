import { LoginFormModule } from "@app/customer/auth/feature/login-form";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MainDesktopPageRoutingModule } from "./main-desktop-routing.module";

import { MainDesktopPage } from "./main-desktop.page";
import { NavbarModule } from "../navbar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainDesktopPageRoutingModule,
    NavbarModule,
    LoginFormModule,
  ],
  declarations: [MainDesktopPage],
})
export class MainDesktopPageModule {}
