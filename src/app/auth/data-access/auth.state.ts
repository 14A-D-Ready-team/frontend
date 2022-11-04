import { SocialAuthService } from "@abacritt/angularx-social-login";
import { ExternalAuthService } from "./../../shared/external-auth/data-access/external-auth.service";
import { Injectable } from "@angular/core";
import { State, StateToken } from "@ngxs/store";
import { of } from "rxjs";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthStateModel {}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>("auth");

@State<AuthStateModel>({ name: AUTH_STATE_TOKEN })
@Injectable()
export class AuthState {
  constructor(
    private externalAuthService: ExternalAuthService,
    private socialAuthService: SocialAuthService,
    private,
  ) {
    this.externalAuthService.loginDisabled$ = of(false);
    this.socialAuthService.authState.subscribe({ next: user => {} });
  }
}
