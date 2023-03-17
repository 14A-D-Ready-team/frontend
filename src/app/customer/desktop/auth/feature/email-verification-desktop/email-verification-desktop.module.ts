import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EmailVerificationDesktopPageRoutingModule } from "./email-verification-desktop-routing.module";

import { EmailVerificationDesktopPage } from "./email-verification-desktop.page";
import { SendEmailVerificationFormModule } from "@app/customer/auth";
import { NavbarComponent, NavbarModule } from "@app/customer/desktop/feature/navbar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerificationDesktopPageRoutingModule,
    SendEmailVerificationFormModule,
    NavbarModule
  ],
  declarations: [EmailVerificationDesktopPage],
})
export class EmailVerificationDesktopPageModule {}
