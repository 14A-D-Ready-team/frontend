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
import {
  catchError,
  combineLatest,
  concat,
  delay,
  finalize,
  from,
  map,
  of,
  switchMap,
  tap,
} from "rxjs";
import { AuthService, GoogleAuthService } from "../service";
import {
  VerifyGoogleAuth,
  SetCurrentLogin,
  Logout,
  LogoutSucceeded,
  LogoutFailed,
  SessionSignin,
  SessionSigninSucceeded,
  SessionSigninFailed,
  SessionSigninCompleted,
  ClearNextUrl,
} from "./auth.actions";
import { User, UserType } from "@app/shared/user";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiRequestStatus } from "@shared/extended-entity-state/utils";
import { redirectAfterLogin } from "@shared/authentication/utils";

enum SocialAuthStatus {
  Idle,
  Pending,
  Success,
  Error,
}

type SessionSigninStatus = {
  loading: boolean;
  completed: boolean;
  nextUrl?: any[];
};

export interface AuthStateModel {
  googleVerifyStatus: SocialAuthStatus;
  user?: User;
  sessionSigninStatus: SessionSigninStatus;
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    googleVerifyStatus: SocialAuthStatus.Idle,
    sessionSigninStatus: {
      completed: false,
      loading: false,
    },
  },
})
@Injectable()
export class AuthState {
  @Selector()
  public static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  public static sessionSigninStatus(state: AuthStateModel) {
    return state.sessionSigninStatus;
  }

  constructor(
    private externalAuthService: ExternalAuthService,
    private googleAuthService: GoogleAuthService,
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) {
    externalAuthService.loginDisabled$ = combineLatest([
      this.store.select(AuthState.user),
      this.store.select(AuthState.sessionSigninStatus),
      this.route.url,
    ]).pipe(
      map(([user, status]) => {
        return !!user || !status.completed || router.url.includes("admin");
      }),
    );

    externalAuthService.googleToken$
      .pipe(switchMap(idToken => store.dispatch(new VerifyGoogleAuth(idToken))))
      .subscribe();
  }

  @Action(VerifyGoogleAuth)
  public verifyGoogleAuth(
    ctx: StateContext<AuthStateModel>,
    action: VerifyGoogleAuth,
  ) {
    ctx.patchState({ googleVerifyStatus: SocialAuthStatus.Pending });

    return this.googleAuthService
      .verify(action.dto)
      .pipe(
        switchMap(user =>
          concat(
            ctx.dispatch(new SetCurrentLogin(user)),
            redirectAfterLogin(
              this.route,
              this.ngZone,
              this.router,
              this.store,
            ),
          ),
        ),
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
    return from(this.ngZone.run(() => this.router.navigate(["/login"])));
  }

  @Action(SessionSignin)
  public sessionSignin(
    ctx: StateContext<AuthStateModel>,
    action: SessionSignin,
  ) {
    ctx.patchState({
      sessionSigninStatus: {
        loading: true,
        completed: false,
        nextUrl: action.nextUrl,
      },
    });

    return this.authService.sessionSignin().pipe(
      switchMap(user => ctx.dispatch(new SessionSigninSucceeded(user))),
      catchError(error => ctx.dispatch(new SessionSigninFailed(error))),
      finalize(() =>
        ctx.dispatch(
          new SessionSigninCompleted(action.nextUrl, action.queryParams),
        ),
      ),
    );
  }

  @Action(SessionSigninSucceeded)
  public sessionSigninSucceeded(
    ctx: StateContext<AuthStateModel>,
    action: SessionSigninSucceeded,
  ) {
    ctx.dispatch(new SetCurrentLogin(action.user));
  }

  @Action(SessionSigninCompleted)
  public sessionSigninCompleted(ctx: StateContext<AuthStateModel>) {
    const status = ctx.getState().sessionSigninStatus;
    ctx.patchState({
      sessionSigninStatus: {
        loading: false,
        completed: true,
        nextUrl: status.nextUrl,
      },
    });
  }

  @Action(ClearNextUrl)
  public clearNextUrl(ctx: StateContext<AuthStateModel>) {
    const status = ctx.getState().sessionSigninStatus;

    ctx.patchState({
      sessionSigninStatus: {
        nextUrl: undefined,
        completed: status.completed,
        loading: status.loading,
      },
    });
  }
}
