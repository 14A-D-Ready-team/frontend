import {
  SendPasswordReset,
  SendPasswordResetFailed,
  SendPasswordResetSucceeded,
} from "./send-password-reset.actions";
import { catchError, finalize, switchMap } from "rxjs";
import { Dictionary } from "@/types";
import { FormControlStatus } from "@angular/forms";
import { Action, State, StateContext } from "@ngxs/store";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { SetFormDisabled, SetFormEnabled } from "@ngxs/form-plugin";
import { FormControlErrors } from "@shared/extended-form-plugin";
import { AuthService } from "@shared/authentication";

export interface SendPasswordResetStatus {
  loading: boolean;
  error?: any;
}

export interface SendPasswordResetStateModel {
  sendPasswordResetForm: {
    model: { email: string };
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
    disabled: boolean;
    FormControlErrors: FormControlErrors;
  };
  status?: SendPasswordResetStatus;
}

export const STATE = "sendPasswordReset";

const sendPasswordResetFormPath = "sendPasswordReset.sendPasswordResetForm";

@State<SendPasswordResetStateModel>({
  name: STATE,
  defaults: {
    sendPasswordResetForm: {
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
export class SendPasswordResetState {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  @Action(SendPasswordReset)
  public startSendPasswordReset(
    ctx: StateContext<SendPasswordResetStateModel>,
  ) {
    const state = ctx.getState();
    if (state.sendPasswordResetForm.status === "INVALID") {
      return;
    }

    const model = state.sendPasswordResetForm.model;
    const payload = model;
    console.log(payload);

    ctx.dispatch(new SetFormDisabled(sendPasswordResetFormPath));
    ctx.patchState({ status: { loading: true } });

    return this.authService.sendPasswordReset(payload).pipe(
      switchMap(user => ctx.dispatch(new SendPasswordResetSucceeded())),
      catchError(error => ctx.dispatch(new SendPasswordResetFailed(error))),
      finalize(() => {
        ctx.dispatch(new SetFormEnabled(sendPasswordResetFormPath));
      }),
    );
  }

  @Action(SendPasswordResetFailed)
  public sendPasswordResetFailed(
    ctx: StateContext<SendPasswordResetStateModel>,
    action: SendPasswordResetFailed,
  ) {
    ctx.patchState({ status: { loading: false, error: action.error } });
  }

  @Action(SendPasswordResetSucceeded)
  public sendPasswordResetSucceeded(
    ctx: StateContext<SendPasswordResetStateModel>,
    action: SendPasswordResetSucceeded,
  ) {
    ctx.patchState({ status: { loading: false, error: undefined } });
  }
}
