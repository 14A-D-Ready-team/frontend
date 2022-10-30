import { Injectable } from "@angular/core";
import { State, StateToken } from "@ngxs/store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginStateModel {}

export const LOGIN_STATE_TOKEN = new StateToken<LoginStateModel>("login");

@State<LoginStateModel>({
  name: LOGIN_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class LoginState {}
