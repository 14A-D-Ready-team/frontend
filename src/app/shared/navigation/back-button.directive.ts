/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener, Input } from "@angular/core";
import { NavigationService } from "./navigation.service";

@Directive({
  selector: "[backButton]",
})
export class BackButtonDirective {
  constructor(private navigation: NavigationService) {}

  @Input()
  public fallbackUrl?: string;

  @HostListener("click")
  onClick(): void {
    this.navigation.back(this.fallbackUrl);
  }
}
