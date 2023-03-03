import { InjectionToken } from "@angular/core";
import { AbilityFactory } from "./ability-factory.interface";

export const APP_ABILITY_FACTORY = new InjectionToken<AbilityFactory>(
  "app-ability-factory",
);
