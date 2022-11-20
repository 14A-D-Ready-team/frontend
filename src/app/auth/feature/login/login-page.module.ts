import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LoginPageRoutingModule } from "./login-page-routing.module";
import { LoginPage } from "./login.page";
import { LoginState } from "./login.state";
import { ExternalAuthModule } from "@app/shared/external-auth";
import { ValidationMessageModule } from "@app/auth/ui";

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
  ],
  declarations: [LoginPage],
  providers: [],
})
export class LoginPageModule {}
