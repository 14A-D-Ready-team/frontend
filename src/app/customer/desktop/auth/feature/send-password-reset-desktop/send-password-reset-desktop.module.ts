import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPasswordResetDesktopPageRoutingModule } from './send-password-reset-desktop-routing.module';

import { SendPasswordResetDesktopPage } from './send-password-reset-desktop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPasswordResetDesktopPageRoutingModule
  ],
  declarations: [SendPasswordResetDesktopPage]
})
export class SendPasswordResetDesktopPageModule {}
