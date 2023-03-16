import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WelcomePageRoutingModule } from "./welcome-routing.module";

import { WelcomePage } from "./welcome.page";
import { NavbarModule } from "../navbar";
import { LoginFormModule, SignupFormModule } from "@app/customer/auth";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule,
    NavbarModule,
    LoginFormModule,
    SignupFormModule,
  ],
  declarations: [WelcomePage],
})
export class WelcomePageModule {}
