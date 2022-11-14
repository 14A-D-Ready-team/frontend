import { Injectable } from "@angular/core";
import { ExternalAuthService } from "@shared/external-auth";
import { Action, State, StateContext, StateToken, Store } from "@ngxs/store";
import { map, of, switchMap, tap } from "rxjs";
import { GoogleAuthService } from "../service";
import { VerifyGoogleAuth } from "./auth.actions";
import { UserType } from "@app/user";

enum SocialAuthStatus {
  Idle,
  Pending,
  Success,
  Error,
}

export interface AuthStateModel {
  googleVerifyStatus: SocialAuthStatus;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: { googleVerifyStatus: SocialAuthStatus.Idle },
})
@Injectable()
export class AuthState {
  constructor(
    private externalAuthService: ExternalAuthService,
    private googleAuthService: GoogleAuthService,
    private store: Store,
  ) {
    externalAuthService.loginDisabled$ = of(false);

    externalAuthService.googleToken$
      .pipe(
        switchMap(idToken =>
          store.dispatch(new VerifyGoogleAuth(idToken, UserType.Customer)),
        ),
      )
      .subscribe();
  }

  @Action(VerifyGoogleAuth)
  public verifyGoogleAuth(
    ctx: StateContext<AuthStateModel>,
    action: VerifyGoogleAuth,
  ) {
    ctx.patchState({ googleVerifyStatus: SocialAuthStatus.Pending });

    return this.googleAuthService.verify(action.dto).pipe(
      tap(res => {
        console.log(res);
      }),
    );
  }
}
