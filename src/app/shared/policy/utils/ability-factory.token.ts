import { InjectionToken } from "@angular/core";
import { AbilityFactory } from "./ability-factory.interface";

export const ABILITY_FACTORY = new InjectionToken<AbilityFactory>(
  "ability-factory",
);
