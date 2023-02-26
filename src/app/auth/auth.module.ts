import { NgxsModule } from "@ngxs/store";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService, AuthState, GoogleAuthService } from "./data-access";
import { ExceptionsModule } from "@app/shared/exceptions";
import { AuthGuard } from "./feature/guards";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthState]),
    ExceptionsModule.forFeature({
      InvalidLoginException: "Hibás email és jelszó páros!",
      InvalidDataException: "Hibás adatok kerültek megasádsra!",
      PasswordNotSetException:
        "Google vagy Facebook bejelentkezés lehetséges csak!",
      InactiveUserException: "Ez a profil inaktív!",
    }),
  ],
  providers: [AuthService, GoogleAuthService, AuthGuard],
})
export class AuthModule {}
