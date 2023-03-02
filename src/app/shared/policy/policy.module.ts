import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  PureAbility,
} from "@casl/ability";
import { AbilityModule, AbilityService } from "@casl/angular";
import { AppAbility, PolicyEffects } from "./data-access";

@NgModule({
  declarations: [],
  imports: [CommonModule, AbilityModule],
  providers: [
    {
      provide: Ability,
      useFactory: () =>
        new AbilityBuilder<AppAbility>(createMongoAbility).build(),
    },
    { provide: PureAbility, useExisting: Ability },
    PolicyEffects,
  ],
})
export class PolicyModule {
  constructor(effects: PolicyEffects) {
    effects.start();
  }
}
