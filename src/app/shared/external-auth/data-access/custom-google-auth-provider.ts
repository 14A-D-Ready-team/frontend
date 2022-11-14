/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  GoogleInitOptions,
  GoogleLoginProvider,
  SocialUser,
} from "@abacritt/angularx-social-login";
import { combineLatest, filter, Observable } from "rxjs";

export class CustomGoogleAuthProvider extends GoogleLoginProvider {
  constructor(
    clientId: string,
    private socialLoginDisabled$: Observable<boolean>,
    options?: GoogleInitOptions,
  ) {
    super(clientId, options);
  }

  public initialize(autoLogin?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.loadScript(
          GoogleLoginProvider.PROVIDER_ID,
          "https://accounts.google.com/gsi/client",
          () => {
            google.accounts.id.initialize({
              client_id: Reflect.get(this, "clientId"),
              auto_select: autoLogin,
              callback: ({ credential }) => {
                const socialUser = Reflect.get(this, "createSocialUser").bind(
                  this,
                )(credential);
                Reflect.get(this, "_socialUser").next(socialUser);
              },
              prompt_parent_id: Reflect.get(this, "initOptions")
                ?.prompt_parent_id,
              itp_support: Reflect.get(this, "initOptions")?.oneTapEnabled,
            });
            if (Reflect.get(this, "initOptions").oneTapEnabled) {
              const socialuser$: Observable<SocialUser> = Reflect.get(
                this,
                "_socialUser",
              );
              combineLatest([socialuser$, this.socialLoginDisabled$]).subscribe(
                ([socialUser, socialLoginDisabled]) => {
                  if (socialUser === null && !socialLoginDisabled) {
                    google.accounts.id.prompt(console.debug);
                  } else {
                    google.accounts.id.cancel();
                  }
                },
              );
            }
            if (Reflect.get(this, "initOptions").scopes) {
              const scope =
                Reflect.get(this, "initOptions").scopes instanceof Array
                  ? Reflect.get(this, "initOptions")
                      .scopes.filter(s => s)
                      .join(" ")
                  : Reflect.get(this, "initOptions").scopes;
              const tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: Reflect.get(this, "clientId"),
                scope,
                prompt: Reflect.get(this, "initOptions").prompt,
                callback: tokenResponse => {
                  if (tokenResponse.error) {
                    Reflect.get(this, "_accessToken").error({
                      code: tokenResponse.error,
                      description: tokenResponse.error_description,
                      uri: tokenResponse.error_uri,
                    });
                  } else {
                    Reflect.get(this, "_accessToken").next(
                      tokenResponse.access_token,
                    );
                  }
                },
              });

              Reflect.set(this, "_tokenClient", tokenClient);
            }
            resolve();
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
