import { NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { BuffetService, BuffetState } from "./data-access";
import { ABILITY_FACTORY } from "@shared/policy";
import { BuffetAbilityFactory } from "./utils";

const abilityFactoryProvider: Provider = {
  provide: ABILITY_FACTORY,
  useClass: BuffetAbilityFactory,
  multi: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([BuffetState]),
  ],
  providers: [BuffetService, abilityFactoryProvider],
})
export class BuffetModule {}
