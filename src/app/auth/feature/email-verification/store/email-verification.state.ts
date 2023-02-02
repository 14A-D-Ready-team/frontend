import { FormControlStatus } from "@angular/forms";
import { FormControlErrors } from "@shared/extended-form-plugin";
import { Dictionary } from "@/types";
import { Injectable, NgZone } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AuthService } from "@app/auth/data-access";
import { Router } from "@angular/router";
import {
  VerifyEmail,
  VerifyEmailFailed,
  VerifyEmailSucceeded,
} from "./email-verification.actions";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { catchError, finalize, switchMap } from "rxjs";
import { error } from "console";

export interface EmailVerificationStatus {
  loading: boolean;
  error?: any;
}

export interface EmailVerificationStateModel {
  verificationForm: {
    model: string;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    formControlErrors: FormControlErrors;
  };
  status?: EmailVerificationStatus;
}

export const STATE = "emailVerification";

const verificationFormPath = "emailVerification.verificationForm";

@State<EmailVerificationStateModel>({
  name: STATE,
  defaults: {
    verificationForm: {
      model: "",
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      formControlErrors: {},
    },
  },
})
@Injectable()
export class EmailVerificationState {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  @Action(VerifyEmail)
  public startVerifyEmail(ctx: StateContext<EmailVerificationStateModel>) {
    const state = ctx.getState();
    if (state.verificationForm.status == "INVALID") {
      return;
    }

    const payload = state.verificationForm.model;

    ctx.dispatch(new SetFormDisabled(verificationFormPath));

    ctx.patchState({ status: { loading: true } });

    return this.authService.EmailVerification(payload).pipe(
      switchMap(user => ctx.dispatch(new VerifyEmailSucceeded(user))),
      catchError(error => ctx.dispatch(new VerifyEmailFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(verificationFormPath));
      }),
    );
  }

  @Action(VerifyEmailSucceeded)
  public verifyEmailSucceeded(
    ctx: StateContext<EmailVerificationStateModel>,
    action: VerifyEmailSucceeded,
  ) {
    ctx.patchState({ status: { loading: false, error: undefined } });
  }
}
