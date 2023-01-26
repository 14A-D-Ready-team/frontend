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
import { NgxsEffectsModule } from "ngxs-effects";
import { ProductModule } from "@shared/product";
import { BuffetEditorModule } from './admin/buffets/feature/buffet-editor/buffet-editor.module';
import { BuffetFilterModule } from './admin/buffets/feature/buffet-filter/buffet-filter.module';
import { BuffetListModule } from './admin/buffets/feature/buffet-list/buffet-list.module';
import { BuffetsModule } from './admin/buffets/buffets.module';

const routeReuseStrategyProvider = {
  provide: RouteReuseStrategy,
  useClass: IonicRouteStrategy,
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
    NgxsEffectsModule.forRoot(),
    IonicModule.forRoot(),
    ExtendedFormPluginModule.forRoot(),
    ExternalAuthModule.forRoot(),
    ClassValidatorFormBuilderModule.forRoot(),
    ExceptionsModule,
    CategoryModule,
    ProductModule,
    AppRoutingModule,
    BuffetEditorModule,
    BuffetFilterModule,
    BuffetListModule,
    BuffetsModule,
  ],
  providers: [routeReuseStrategyProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
