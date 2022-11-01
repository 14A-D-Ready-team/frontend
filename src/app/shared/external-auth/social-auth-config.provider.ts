import { environment } from "@/environments/environment";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { Provider } from "@angular/core";
import { CustomGoogleAuthProvider } from "./data-access";
import { ExternalAuthService } from "./data-access/external-auth.service";

export default {
  provide: "SocialAuthServiceConfig",
  useFactory: (externalAuthService: ExternalAuthService) => {
    return {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new CustomGoogleAuthProvider(
            environment.google.clientId,
            externalAuthService.loginDisabled$,
            { oneTapEnabled: true, scopes: ["email", "profile"] },
          ),
        },
      ],
    } as SocialAuthServiceConfig;
  },
  deps: [ExternalAuthService],
} as Provider;
