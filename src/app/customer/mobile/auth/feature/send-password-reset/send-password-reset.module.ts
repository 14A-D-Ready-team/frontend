import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { SendPasswordResetState } from "./store/send-password-reset.state";
import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SendPasswordResetPageRoutingModule } from "./send-password-reset-routing.module";

import { SendPasswordResetPage } from "./send-password-reset.page";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { ErrorMessagePipe } from "@shared/exceptions";
import { SendPasswordResetFormModule } from "@app/customer/auth";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPasswordResetPageRoutingModule,
    NgxsModule.forFeature([SendPasswordResetState]),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    SendPasswordResetFormModule,
  ],
  declarations: [SendPasswordResetPage],
})
export class SendPasswordResetPageModule {}
