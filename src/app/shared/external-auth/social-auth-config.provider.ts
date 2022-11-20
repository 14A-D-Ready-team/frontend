import { environment } from "@/environments/environment";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { Provider } from "@angular/core";
import {
  CustomGoogleAuthProvider,
  LoginDisabledStreamStore,
} from "./data-access";

export default {
  provide: "SocialAuthServiceConfig",
  useFactory: (store: LoginDisabledStreamStore) => {
    return {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new CustomGoogleAuthProvider(
            environment.google.clientId,
            store.loginDisabled$,
            { oneTapEnabled: true, scopes: ["email", "profile"] },
          ),
        },
      ],
    } as SocialAuthServiceConfig;
  },
  deps: [LoginDisabledStreamStore],
} as Provider;
