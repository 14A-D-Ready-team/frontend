import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { FormControlErrors } from "@app/shared/extended-form-plugin";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import {
  AuthService,
  SetCurrentLogin,
  SignupDto,
} from "@shared/authentication";
import { catchError, finalize, switchMap } from "rxjs";
import { AdminSignup, AdminSignupFailed, AdminSignupSucceeded } from "./admin-signup.actions";
export interface AdminSignupStatus {
  loading: boolean;
  error?: any;
}

export interface AdminSignupStateModel {
  signupForm: {
    model: SignupDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  status?: AdminSignupStatus;
}

export const SIGNUP_STATE_TOKEN = new StateToken<AdminSignupStateModel>("adminSignup");

const signupFormPath = "adminSignup.signupForm";

@State<AdminSignupStateModel>({
  name: SIGNUP_STATE_TOKEN,
  defaults: {
    signupForm: {
      model: new SignupDto("", "", "", 1),
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class AdminSignupState {
  constructor(private authService: AuthService) {}

  @Action(AdminSignup)
  public startSignup(ctx: StateContext<AdminSignupStateModel>) {
    const state = ctx.getState();

    if (state.signupForm.status === "INVALID") {
      return;
    }

    const model = state.signupForm.model;
    const payload = new SignupDto(model.name, model.email, model.password, model.type);

    ctx.dispatch(new SetFormDisabled(signupFormPath));

    ctx.patchState({ status: { loading: true } });

    return this.authService.signUp(payload).pipe(
      switchMap(user => ctx.dispatch(new AdminSignupSucceeded(user))),
      catchError(error => ctx.dispatch(new AdminSignupFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(signupFormPath));
      }),
    );
  }

  @Action(AdminSignupFailed)
  public signupFailed(
    ctx: StateContext<AdminSignupStateModel>,
    action: AdminSignupFailed,
  ) {
    ctx.patchState({ status: { loading: false, error: action.error } });
  }

  @Action(AdminSignupSucceeded)
  public signupSucceeded(
    ctx: StateContext<AdminSignupStateModel>,
    action: AdminSignupSucceeded,
  ) {

    ctx.patchState({ status: { loading: false, error: undefined } });

    ctx.dispatch(new SetCurrentLogin(action.user));
  }
}
