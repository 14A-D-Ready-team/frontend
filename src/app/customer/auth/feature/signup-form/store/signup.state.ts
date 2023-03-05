import { finalize } from "rxjs";
import { catchError } from "rxjs";
import { switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { FormControlErrors } from "@app/shared/extended-form-plugin";
import { Dictionary } from "@/types";
import {
  AuthService,
  SetCurrentLogin,
  SignupDto,
} from "@shared/authentication";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { FormControlStatus } from "@angular/forms";
import { Signup, SignupFailed, SignupSucceeded } from "./signup.actions";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
export interface SignupStatus {
  loading: boolean;
  error?: any;
}

export interface SignupStateModel {
  signupForm: {
    model: SignupDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  status?: SignupStatus;
}

export const SIGNUP_STATE_TOKEN = new StateToken<SignupStateModel>("signup");

const signupFormPath = "signup.signupForm";

@State<SignupStateModel>({
  name: SIGNUP_STATE_TOKEN,
  defaults: {
    signupForm: {
      model: new SignupDto("", "", "", 0),
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class SignupState {
  constructor(private authService: AuthService) {}

  @Action(Signup)
  public startSignup(ctx: StateContext<SignupStateModel>) {
    const state = ctx.getState();
    //ellenőrzés: loginform status valid vagy nem
    if (state.signupForm.status === "INVALID") {
      return;
    }

    //visszaad balfasz login dto normálissá konvertálni
    const model = state.signupForm.model;
    const payload = new SignupDto(model.name, model.email, model.password, 0);

    //form disable
    //ctx.dispatch
    ctx.dispatch(new SetFormDisabled(signupFormPath));

    //loading-ot true-ra(patchState)
    ctx.patchState({ status: { loading: true } });

    //rxjs c:
    //http kérés elindítása
    //ha hiba van akkor login failed, ha nincs login succeeded
    return this.authService.signUp(payload).pipe(
      switchMap(user => ctx.dispatch(new SignupSucceeded(user))),
      catchError(error => ctx.dispatch(new SignupFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(signupFormPath));
      }),
    );
  }

  @Action(SignupFailed)
  public signupFailed(
    ctx: StateContext<SignupStateModel>,
    action: SignupFailed,
  ) {
    ctx.patchState({ status: { loading: false, error: action.error } });
    // if (action.error instanceof ApiException) {
    //   if (action.error.errorCode === ErrorCode.EmailNotFoundException) {
    //     ctx.dispatch(
    //       new UpdateFormControlErrors({
    //         path: loginFormPath,
    //         controlName: "email",
    //         errors: {
    //           minLength: "Túl rövid az email",
    //         },
    //       }),
    //     );
    //   }
    // } else {
    // }
  }

  @Action(SignupSucceeded)
  public signupSucceeded(
    ctx: StateContext<SignupStateModel>,
    action: SignupSucceeded,
  ) {
    //loading false
    //error legyen undefined
    ctx.patchState({ status: { loading: false, error: undefined } });

    ctx.dispatch(new SetCurrentLogin(action.user));
  }
}
