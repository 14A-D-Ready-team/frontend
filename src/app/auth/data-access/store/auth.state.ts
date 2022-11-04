import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { ExternalAuthService } from "@shared/external-auth";
import { State, StateToken } from "@ngxs/store";
import { of, switchMap } from "rxjs";
import { GoogleAuthService } from "../service";
import { VerifyGoogleAuthDto } from "../dto";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthStateModel {}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({ name: AUTH_STATE_TOKEN })
@Injectable()
export class AuthState {
  constructor(
    private externalAuthService: ExternalAuthService,
    private socialAuthService: SocialAuthService,
    private googleAuthService: GoogleAuthService,
  ) {
    this.externalAuthService.loginDisabled$ = of(false);
    this.socialAuthService.authState
      .pipe(
        switchMap(user =>
          user === null
            ? of(null)
            : googleAuthService.verify(
                new VerifyGoogleAuthDto(user.idToken, 0),
              ),
        ),
      )
      .subscribe({
        next(value) {
          console.log(value);
        },
      });
  }
}
