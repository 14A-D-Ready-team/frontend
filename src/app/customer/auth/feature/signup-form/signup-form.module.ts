import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignupFormComponent } from "./signup-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExternalAuthModule } from "@shared/external-auth";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";
import { NgxsModule } from "@ngxs/store";
import { SignupState } from "./store";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExternalAuthModule.forFeature(),
    NgxsModule.forFeature([SignupState]),
    ExtendedFormPluginModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    ExceptionsModule.forFeature({
      InvalidDataException: "Hibás adatok kerületek megasádra!",
      EmailDuplicateException: "Ezzel az email-el már regisztráltak!",
    }),
  ],
  declarations: [SignupFormComponent],
  exports: [SignupFormComponent],
})
export class SignupFormModule {}
