import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { NgxsModule } from "@ngxs/store";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "@/environments/environment";
import { ExternalAuthModule } from "./shared/external-auth";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { CategoryModule } from "./shared/category";
import { ClassValidatorFormBuilderModule } from "ngx-reactive-form-class-validator";
import { ExtendedFormPluginModule } from "./shared/extended-form-plugin";
import { ExceptionsModule } from "./shared/exceptions";
import { BuffetModule } from "@shared/buffet";
import { ProductModule } from "@shared/product";
import { AuthenticationModule } from "@shared/authentication";
import { APP_ABILITY_FACTORY, PolicyModule } from "@shared/policy";
import { AppAbility, AppAbilityFactory } from "./app-ability.factory";
import { AbilityModule, AbilityService } from "@casl/angular";

const routeReuseStrategyProvider = {
  provide: RouteReuseStrategy,
  useClass: IonicRouteStrategy,
};

const appAbilityFactoryProvider = {
  provide: APP_ABILITY_FACTORY,
  useClass: AppAbilityFactory,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsFormPluginModule.forRoot(),
    IonicModule.forRoot(),
    ExtendedFormPluginModule.forRoot(),
    ExternalAuthModule.forRoot(),
    ClassValidatorFormBuilderModule.forRoot(),
    ExceptionsModule,
    AuthenticationModule,
    CategoryModule,
    ProductModule,
    PolicyModule,
    BuffetModule,
    AppRoutingModule,
  ],
  providers: [routeReuseStrategyProvider, appAbilityFactoryProvider],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private s: AbilityService<AppAbility>) {
    console.log(s);
  }
}
