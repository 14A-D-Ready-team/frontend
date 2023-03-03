import { ErrorMessagePipe } from "@app/shared/exceptions/utils/pipes";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ReactiveFormsModule } from "@angular/forms";
import { EmailVerificationState } from "./store";
import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EmailVerificationPageRoutingModule } from "./email-verification-routing.module";

import { EmailVerificationPage } from "./email-verification.page";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerificationPageRoutingModule,
    NgxsModule.forFeature([EmailVerificationState]),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ],
  declarations: [EmailVerificationPage],
})
export class EmailVerificationPageModule {}
