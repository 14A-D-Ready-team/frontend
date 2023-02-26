import { Injectable, NgZone } from "@angular/core";
import { ExternalAuthService } from "@shared/external-auth";
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from "@ngxs/store";
import { catchError, delay, from, map, of, switchMap, tap } from "rxjs";
import { AuthService, GoogleAuthService } from "../service";
import {
  VerifyGoogleAuth,
  SetCurrentLogin,
  Logout,
  LogoutSucceeded,
  LogoutFailed,
} from "./auth.actions";
import { User, UserType } from "@app/shared/user";
import { Router } from "@angular/router";

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
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private ngZone: NgZone,
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

  @Action(SetCurrentLogin)
  public setCurrentLogin(
    ctx: StateContext<AuthStateModel>,
    action: SetCurrentLogin,
  ) {
    ctx.patchState({ user: action.user });
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.signOut().pipe(
      switchMap(() => ctx.dispatch(new LogoutSucceeded())),
      catchError(error => ctx.dispatch(new LogoutFailed(error))),
    );
  }

  @Action(LogoutSucceeded)
  public logoutSucceeded(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: undefined });
    return from(this.ngZone.run(() => this.router.navigate(["/auth/login"])));
  }
}
