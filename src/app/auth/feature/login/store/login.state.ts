import { Dictionary } from "@/types";
import { Injectable } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { LoginDto } from "@app/auth/data-access/dto";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { Start } from "./login.actions";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginStateModel {
  loginForm: {
    model: LoginDto;
    dirty: boolean;
    status: FormControlStatus;
    errors: Dictionary<any>;
  };
}

export const LOGIN_STATE_TOKEN = new StateToken<LoginStateModel>("login");

@State<LoginStateModel>({
  name: LOGIN_STATE_TOKEN,
  defaults: {
    loginForm: {
      model: new LoginDto("", ""),
      dirty: false,
      status: "VALID",
      errors: {},
    },
  },
})
@Injectable()
export class LoginState {
  @Action(Start)
  public startLogin(ctx: StateContext<LoginStateModel>) {
    const state = ctx.getState();
  }
}
