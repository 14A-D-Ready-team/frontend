import { NgModule, Provider } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxsModule } from "@ngxs/store";
import { CategoryService, CategoryState } from "./data-access";
import { HttpClientModule } from "@angular/common/http";
import { ABILITY_FACTORY } from "@shared/policy";
import { CategoryAbilityFactory } from "./utils";

const abilityFactoryProvider: Provider = {
  provide: ABILITY_FACTORY,
  useClass: CategoryAbilityFactory,
  multi: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([CategoryState]),
  ],
  providers: [CategoryService, abilityFactoryProvider],
})
export class CategoryModule {}
