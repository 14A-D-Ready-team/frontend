import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LoginPageRoutingModule } from "./login-page-routing.module";
import { LoginPage } from "./login.page";
import { LoginState } from "./login.state";
import { ExternalAuthModule } from "@app/shared/external-auth";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgxsModule.forFeature([LoginState]),
    ExternalAuthModule.forFeature(),
  ],
  declarations: [LoginPage],
  providers: [],
})
export class LoginPageModule {}
