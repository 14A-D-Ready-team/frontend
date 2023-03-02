import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, Provider } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { ABILITY_FACTORY } from "@shared/policy";
import {
  ProductAbilityFactory,
  ProductService,
  ProductState,
} from "./data-access";

const abilityFactoryProvider: Provider = {
  provide: ABILITY_FACTORY,
  useClass: ProductAbilityFactory,
  multi: true,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([ProductState]),
  ],
  providers: [ProductService, abilityFactoryProvider],
})
export class ProductModule {}
