import { Injectable } from "@angular/core";
import { State, StateToken } from "@ngxs/store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthStateModel {}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({ name: AUTH_STATE_TOKEN })
@Injectable()
export class AuthState {}
