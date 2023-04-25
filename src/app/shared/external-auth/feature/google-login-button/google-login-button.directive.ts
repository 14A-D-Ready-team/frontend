import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Directive, ElementRef, Input } from "@angular/core";
import { take } from "rxjs";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "google-login-button",
})
export class GoogleLoginButtonDirective {
  @Input()
  public type: "icon" | "standard" = "icon";

  @Input()
  public size: "small" | "medium" | "large" = "medium";

  @Input()
  public text: "signin_with" | "signup_with" = "signin_with";

  @Input()
  public shape: "square" | "circle" | "pill" | "rectangular" = "rectangular";

  @Input()
  public theme: "outline" | "filled_blue" | "filled_black" = "outline";

  @Input()
  public logoAlignment: "left" | "center" = "left";

  @Input()
  public width = "";

  @Input()
  public locale = "";

  constructor(el: ElementRef, socialAuthService: SocialAuthService) {
    socialAuthService.initState.pipe(take(1)).subscribe(() => {
      Promise.resolve(this.width).then(value => {
        if (value > "400" || (value < "200" && value !== "")) {
          Promise.reject(
            "Please note .. max-width 400 , min-width 200 " +
              "(https://developers.google.com/identity/gsi/web/tools/configurator)",
          );
        } else {
          google.accounts.id.renderButton(el.nativeElement, {
            type: this.type,
            size: this.size,
            text: this.text,
            width: this.width,
            shape: this.shape,
            theme: this.theme,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            logo_alignment: this.logoAlignment,
            locale: this.locale,
          });
        }
      });
    });
  }
}
