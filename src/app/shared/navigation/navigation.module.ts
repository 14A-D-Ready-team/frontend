import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationService } from "./navigation.service";
import { BackButtonDirective } from "./back-button.directive";

@NgModule({
  declarations: [BackButtonDirective],
  imports: [CommonModule],
  providers: [NavigationService],
  exports: [BackButtonDirective],
})
export class NavigationModule {}
