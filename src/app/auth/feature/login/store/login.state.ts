import { User } from "@shared/user";
import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { AuthService } from "@app/auth/data-access";
import { LoginDto } from "@app/auth/data-access/dto";
import { ApiException, ErrorCode } from "@app/shared/exceptions";
import {
  FormControlErrors,
  UpdateFormControlErrors,
} from "@app/shared/extended-form-plugin";
import { SetFormDisabled, UpdateFormErrors } from "@ngxs/form-plugin";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { catchError, concatWith, of, switchMap } from "rxjs";
import { Login, LoginFailed, LoginSucceeded } from "./login.actions";

interface LoginStatus {
  loading: boolean;
  error?: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginStateModel {
  loginForm: {
    model: LoginDto;
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
  constructor(private authService: AuthService) {}

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

    //form disable
    //ctx.dispatch
    ctx.dispatch(new SetFormDisabled(loginFormPath));

    //rxjs c:
    //http kérés elindítása
    //ha hiba van akkor login failed, ha nincs login succeeded

    this.authService.signIn(payload).pipe(
      switchMap(user => ctx.dispatch(new LoginSucceeded(user))),
      catchError(error => ctx.dispatch(new LoginFailed(error))),
    );

    //loading-ot true-ra(patchState)
  }

  @Action(LoginFailed)
  public loginFailed(ctx: StateContext<LoginStateModel>, action: LoginFailed) {
    ctx.patchState({ status: { loading: false, error: action.error } });
    if (action.error instanceof ApiException) {
      if (action.error.errorCode === ErrorCode.EmailNotFoundException) {
        ctx.dispatch(
          new UpdateFormControlErrors({
            path: loginFormPath,
            controlName: "email",
            errors: {
              minLength: "Túl rövid az email",
            },
          }),
        );
      }
    } else {
    }
  }

  @Action(LoginSucceeded)
  public loginSucceeded(ctx: StateContext<LoginStateModel>) {
    //loading false
    //error legyen undefined
    //user ki consol logolni
  }
}
