import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { ExceptionsModule } from "@app/shared/exceptions";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ExceptionsModule.forFeature({
      InvalidLoginException: "Hibás email és jelszó páros!",
      InvalidDataException: "Hibás adatok kerültek megasádsra!",
      PasswordNotSetException:
        "Google vagy Facebook bejelentkezés lehetséges csak!",
      InactiveUserException: "Ez a profil inaktív!",
    }),
  ],
  providers: [],
})
export class AuthModule {}
