import { ExternalAuthService } from "./data-access";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SocialAuthService,
  SocialLoginModule,
} from "@abacritt/angularx-social-login";
import socialAuthConfigProvider from "./social-auth-config.provider";

@NgModule({
  declarations: [],
  imports: [CommonModule, SocialLoginModule],
  exports: [],
  providers: [socialAuthConfigProvider, ExternalAuthService],
})
export class ExternalAuthModule {
  constructor(private socialAuthService: SocialAuthService) {}
}
