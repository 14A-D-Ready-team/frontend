import { Dictionary } from "@/types";
import { Injectable, NgZone } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { FormControlErrors } from "@app/shared/extended-form-plugin";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, State, StateContext, StateToken, Store } from "@ngxs/store";
import { catchError, finalize, switchMap } from "rxjs";
import { Login, LoginFailed, LoginSucceeded } from "./login.actions";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthService,
  LoginDto,
  redirectAfterLogin,
  SetCurrentLogin,
} from "@shared/authentication";
// import { IonRadioGroup } from "@ionic/angular";

export interface LoginStatus {
  loading: boolean;
  error?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginStateModel {
  loginForm: {
    model: LoginDto & { admin?: boolean };
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  status?: LoginStatus;
}

export const LOGIN_STATE_TOKEN = new StateToken<LoginStateModel>("login");

const loginFormPath = "login.loginForm";

@State<LoginStateModel>({
  name: LOGIN_STATE_TOKEN,
  defaults: {
    loginForm: {
      model: new LoginDto("", ""),
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class LoginState {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private store: Store,
  ) {}

  @Action(Login)
  public startLogin(ctx: StateContext<LoginStateModel>) {
    const state = ctx.getState();
    //ellenőrzés: loginform status valid vagy nem
    if (state.loginForm.status === "INVALID") {
      return;
    }

    //visszaad balfasz login dto normálissá konvertálni
    const model = state.loginForm.model;
    const payload = new LoginDto(model.email, model.password);
    console.log(payload.email);

    //form disable
    //ctx.dispatch
    ctx.dispatch(new SetFormDisabled(loginFormPath));

    //loading-ot true-ra(patchState)
    ctx.patchState({ status: { loading: true } });

    //rxjs c:
    //http kérés elindítása
    //ha hiba van akkor login failed, ha nincs login succeeded
    return this.authService.signIn(payload).pipe(
      switchMap(user => ctx.dispatch(new LoginSucceeded(user))),
      catchError(error => ctx.dispatch(new LoginFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(loginFormPath));
      }),
    );
  }

  @Action(LoginFailed)
  public loginFailed(ctx: StateContext<LoginStateModel>, action: LoginFailed) {
    ctx.patchState({ status: { loading: false, error: action.error } });
  }

  @Action(LoginSucceeded)
  public loginSucceeded(
    ctx: StateContext<LoginStateModel>,
    action: LoginSucceeded,
  ) {
    //loading false
    //error legyen undefined
    ctx.patchState({ status: { loading: false, error: undefined } });

    ctx.dispatch(new SetCurrentLogin(action.user));

    return redirectAfterLogin(
      this.route,
      this.ngZone,
      this.router,
      this.store,
      ctx.getState().loginForm.model.admin,
    );
  }
}
