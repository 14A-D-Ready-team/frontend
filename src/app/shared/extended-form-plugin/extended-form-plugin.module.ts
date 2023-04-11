import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NGXS_PLUGINS } from "@ngxs/store";
import { ExtendedFormDirective, ExtendedFormPlugin } from "./data-access";
import { ɵFormDirective } from "@ngxs/form-plugin";

@NgModule({
  declarations: [ExtendedFormDirective],
  imports: [CommonModule],
  exports: [ExtendedFormDirective],
})
export class ExtendedFormPluginModule {
  public static forRoot(): ModuleWithProviders<ExtendedFormPluginModule> {
    return {
      ngModule: ExtendedFormPluginModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: ExtendedFormPlugin,
          multi: true,
        },
      ],
    };
  }
}
