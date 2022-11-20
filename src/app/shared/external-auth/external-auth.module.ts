import { ExternalAuthService, LoginDisabledStreamStore } from "./data-access";
import { NgModule, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SocialAuthService,
  SocialLoginModule,
} from "@abacritt/angularx-social-login";
import socialAuthConfigProvider from "./social-auth-config.provider";
import { GoogleLoginButtonDirective } from "./feature/google-login-button";

@NgModule({
  declarations: [GoogleLoginButtonDirective],
  exports: [GoogleLoginButtonDirective],
})
export class ExternalAuthBaseModule {}

@NgModule({
  imports: [CommonModule, SocialLoginModule, ExternalAuthBaseModule],
  providers: [
    socialAuthConfigProvider,
    ExternalAuthService,
    LoginDisabledStreamStore,
  ],
  exports: [GoogleLoginButtonDirective],
})
export class ExternalAuthRootModule {
  constructor(private socialAuthService: SocialAuthService) {}
}

@NgModule({
  imports: [CommonModule, ExternalAuthBaseModule],
  exports: [GoogleLoginButtonDirective],
})
export class ExternalAuthFeatureModule {
  constructor(@Optional() private externalAuthService: ExternalAuthService) {
    if (!externalAuthService) {
      throw new Error(
        "ExternalAuthModule.forRoot() must be imported in the AppModule",
      );
    }
  }
}

@NgModule()
export class ExternalAuthModule {
  static forRoot() {
    return {
      ngModule: ExternalAuthRootModule,
    };
  }

  static forFeature() {
    return {
      ngModule: ExternalAuthFeatureModule,
    };
  }
}
