import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EmailVerificationPageRoutingModule } from "./email-verification-routing.module";

import { EmailVerificationPage } from "./email-verification.page";
import { NgxsModule } from "@ngxs/store";
import { ExternalAuthModule } from "@shared/external-auth";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@shared/exceptions";
import { ValidationMessageModule } from "@app/auth/ui";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVerificationPageRoutingModule,
    NgxsModule.forFeature([]),
    ExternalAuthModule.forFeature(),
    ValidationMessageModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ],
  declarations: [EmailVerificationPage],
})
export class EmailVerificationPageModule {}
