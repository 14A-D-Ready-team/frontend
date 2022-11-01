import { ExternalAuthService } from "./../../shared/external-auth/data-access/external-auth.service";
import { Injectable } from "@angular/core";
import { State, StateToken } from "@ngxs/store";
import { interval, map, of, tap } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthStateModel {}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({ name: AUTH_STATE_TOKEN })
@Injectable()
export class AuthState {
  constructor(private externalAuthService: ExternalAuthService) {
    this.externalAuthService.loginDisabled$ = of(false);
  }
}
