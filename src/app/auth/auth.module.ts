import { GoogleAuthService } from "./data-access/google-auth.service";
import { AuthService } from "./data-access/auth.service";
import { AuthState } from "./data-access/auth.state";
import { NgxsModule } from "@ngxs/store";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [RouterModule],
  providers: [AuthService, GoogleAuthService],
})
export class AuthModule {}
