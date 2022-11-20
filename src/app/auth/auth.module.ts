import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService, AuthState, GoogleAuthService } from "./data-access";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
  ],
  exports: [AuthRoutingModule],
  providers: [AuthService, GoogleAuthService],
})
export class AuthModule {}
