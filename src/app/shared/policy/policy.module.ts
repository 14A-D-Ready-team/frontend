import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PureAbility } from "@casl/ability";
import { AbilityModule, AbilityService } from "@casl/angular";
import { PolicyEffects } from "./data-access";

@NgModule({
  declarations: [],
  imports: [CommonModule, AbilityModule],
  providers: [
    { provide: PureAbility, useValue: new PureAbility() },
    PolicyEffects,
  ],
})
export class PolicyModule {
  constructor(effects: PolicyEffects) {
    effects.start();
  }
}
