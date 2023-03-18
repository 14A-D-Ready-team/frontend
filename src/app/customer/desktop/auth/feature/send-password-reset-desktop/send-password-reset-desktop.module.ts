import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SendPasswordResetDesktopPageRoutingModule } from "./send-password-reset-desktop-routing.module";

import { SendPasswordResetDesktopPage } from "./send-password-reset-desktop.page";
import { NavbarModule } from "@app/customer/desktop/feature/navbar";
import { SendPasswordResetFormModule } from "@app/customer/auth";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPasswordResetDesktopPageRoutingModule,
    NavbarModule,
    SendPasswordResetFormModule,
  ],
  declarations: [SendPasswordResetDesktopPage],
})
export class SendPasswordResetDesktopPageModule {}
