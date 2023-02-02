import { Injectable } from "@angular/core";
import { ExternalAuthService } from "@shared/external-auth";
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from "@ngxs/store";
import { delay, map, of, switchMap, tap } from "rxjs";
import { GoogleAuthService } from "../service";
import { VerifyGoogleAuth, SetCurrentLogin, Logout } from "./auth.actions";
import { User, UserType } from "@app/shared/user";

enum SocialAuthStatus {
  Idle,
  Pending,
  Success,
  Error,
}

export interface AuthStateModel {
  googleVerifyStatus: SocialAuthStatus;
  user?: User;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: { googleVerifyStatus: SocialAuthStatus.Idle },
})
@Injectable()
export class AuthState {
  @Selector()
  public static user(state: AuthStateModel) {
    return state.user;
  }

  constructor(
    private externalAuthService: ExternalAuthService,
    private googleAuthService: GoogleAuthService,
    private store: Store,
  ) {
    setTimeout(() => {
      const user = new User();
      user.name = "asd";
      store.dispatch(new SetCurrentLogin(user));
    }, 1);
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

  @Action(SetCurrentLogin)
  public setCurrentLogin(
    ctx: StateContext<AuthStateModel>,
    action: SetCurrentLogin,
  ) {
    ctx.patchState({ user: action.user });
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    // !!! log the user out, notify the server to destroy the session
    ctx.patchState({ user: undefined });
  }
}
