import { catchError, finalize, switchMap } from "rxjs";
import { Dictionary } from "@/types";
import { FormControlStatus } from "@angular/forms";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { FormControlErrors } from "@shared/extended-form-plugin";
import {
  EmailVerification,
  EmailVerificationFailed,
  EmailVerificationSucceeded,
} from "./email-verifictaion.actions";
import { AuthService } from "@shared/authentication";
export interface EmailVerificationStatus {
  loading: boolean;
  error?: any;
}

export interface EmailVerificationStateModel {
  emailVerificationForm: {
    model: { email: string };
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    FormControlErrors: FormControlErrors;
  };
  status?: EmailVerificationStatus;
}

export const STATE = "emailVerification";

const emialVerificationFormPath = "emailVerification.emailVerificationForm";

@State<EmailVerificationStateModel>({
  name: STATE,
  defaults: {
    emailVerificationForm: {
      model: { email: "" },
      dirty: false,
      status: "VALID",
      errors: {},
      disabled: false,
      FormControlErrors: {},
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

  @Action(EmailVerification)
  public startEmailVerification(
    ctx: StateContext<EmailVerificationStateModel>,
  ) {
    const state = ctx.getState();
    if (state.emailVerificationForm.status === "INVALID") {
      return;
    }

    const model = state.emailVerificationForm.model;
    const payload = model;

    ctx.dispatch(new SetFormDisabled(emialVerificationFormPath));
    ctx.patchState({ status: { loading: true } });

    return this.authService.emailVerification(payload).pipe(
      switchMap(user => ctx.dispatch(new EmailVerificationSucceeded())),
      catchError(error => ctx.dispatch(new EmailVerificationFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(emialVerificationFormPath));
      }),
    );
  }

  @Action(EmailVerificationFailed)
  public emailVerificationFailed(
    ctx: StateContext<EmailVerificationStateModel>,
    action: EmailVerificationFailed,
  ) {
    ctx.patchState({ status: { loading: false, error: action.error } });
  }

  @Action(EmailVerificationSucceeded)
  public emailVerificationSucceeded(
    ctx: StateContext<EmailVerificationStateModel>,
    action: EmailVerificationSucceeded,
  ) {
    ctx.patchState({ status: { loading: false, error: undefined } });
  }
}
