import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { AuthService, AuthState, GoogleAuthService } from "./data-access";
import { AuthGuard, SessionSigninGuard } from "./utils";

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([AuthState])],
  providers: [AuthService, GoogleAuthService, AuthGuard, SessionSigninGuard],
})
export class AuthenticationModule {}
