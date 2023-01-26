import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignupPageRoutingModule } from "./signup-page-routing.module";

import { SignupPage } from "./signup.page";
import { NgxsModule } from "@ngxs/store";
import { SignupState } from "./store";
import { ExternalAuthModule } from "@app/shared/external-auth";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@app/shared/exceptions/utils/pipes";
import {
  ValidationMessageComponent,
  ValidationMessageModule,
} from "@app/auth/ui";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    NgxsModule.forFeature([SignupState]),
    ExternalAuthModule.forFeature(),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ],
  declarations: [SignupPage],
})
export class SignupPageModule {}
