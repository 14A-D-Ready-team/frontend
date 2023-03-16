import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignupPageRoutingModule } from "./signup-page-routing.module";

import { SignupPage } from "./signup.page";
// import { NgxsModule } from "@ngxs/store";
// import { SignupState } from "./store";
import { ExternalAuthModule } from "@app/shared/external-auth";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@app/shared/exceptions/utils/pipes";
import { ExtendedFormPluginModule } from "@app/shared/extended-form-plugin";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { SignupFormModule } from "@app/customer/auth";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    // NgxsModule.forFeature([SignupState]),
    ExternalAuthModule.forFeature(),
    ExtendedFormPluginModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    SignupFormModule,
  ],
  declarations: [SignupPage],
})
export class SignupPageModule {}
