import { LoginFormModule, SignupFormModule } from "@app/customer/auth";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MainDesktopPageRoutingModule } from "./main-desktop-routing.module";

import { MainDesktopPage } from "./main-desktop.page";
import { NavbarModule } from "../navbar";
import { MainDesktopState } from "./store";
import { NgxsModule } from "@ngxs/store";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainDesktopPageRoutingModule,
    NavbarModule,
    LoginFormModule,
    SignupFormModule,
    NgxsModule.forFeature([MainDesktopState]),
  ],
  declarations: [MainDesktopPage],
})
export class MainDesktopPageModule {}
