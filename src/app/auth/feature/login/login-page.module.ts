import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LoginPageRoutingModule } from "./login-page-routing.module";
import { LoginPage } from "./login.page";
import { LoginState } from "./store/";
import { ExternalAuthModule } from "@app/shared/external-auth";
import { ValidationMessageModule } from "@app/auth/ui";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ErrorMessagePipe } from "@app/shared/exceptions/utils/pipes";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxsModule.forFeature([LoginState]),
    ExternalAuthModule.forFeature(),
    ReactiveFormsModule,
    ValidationMessageModule,
    NgxsFormPluginModule,
    ErrorMessagePipe,
  ],
  declarations: [LoginPage],
  providers: [],
})
export class LoginPageModule {}
