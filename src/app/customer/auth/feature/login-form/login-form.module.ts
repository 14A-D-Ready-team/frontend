import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";
import { NgxsModule } from "@ngxs/store";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginState } from "./store";
import { ExternalAuthModule } from "@shared/external-auth";
import { ValidationMessageModule } from "@app/customer/ui/validation-message";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { LoginFormComponent } from "./login-form.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule.forFeature([LoginState]),
    ExternalAuthModule.forFeature(),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
    RouterModule,
    ExceptionsModule.forFeature({
      InvalidLoginException: "Hibás email és jelszó páros!",
      InvalidDataException: "Hibás adatok kerültek megasádsra!",
      PasswordNotSetException:
        "Google vagy Facebook bejelentkezés lehetséges csak!",
      InactiveUserException: "Ez a profil inaktív!",
    }),
  ],
  declarations: [LoginFormComponent],
  providers: [],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
