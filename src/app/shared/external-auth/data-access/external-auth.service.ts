import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { CustomGoogleAuthProvider } from "./custom-google-auth-provider";
import { LoginDisabledStreamStore } from "./login-disabled-stream.store";

@Injectable()
export class ExternalAuthService {
  public get loginDisabled$() {
    return this.loginDisabledStreamStore.loginDisabled$;
  }

  public set loginDisabled$(condition: Observable<boolean>) {
    this.loginDisabledStreamStore.loginDisabled$ = condition;
  }

  public get googleToken$() {
    return this.socialAuthService.authState.pipe(
      filter(state => state.provider === CustomGoogleAuthProvider.PROVIDER_ID),
      map(state => state.idToken),
    );
  }

  constructor(
    private loginDisabledStreamStore: LoginDisabledStreamStore,
    private socialAuthService: SocialAuthService,
  ) {}
}
