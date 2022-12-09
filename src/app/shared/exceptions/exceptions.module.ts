import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  defaultErrorMessages,
  ErrorMessageDictionary,
  ERROR_MESSAGES,
  ExceptionService,
} from "./utils";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ExceptionService,
    {
      provide: ERROR_MESSAGES,
      useValue: defaultErrorMessages,
      multi: true,
    },
  ],
})
export class ExceptionsModule {
  public static forFeature(
    errorMessages: ErrorMessageDictionary,
  ): ModuleWithProviders<ExceptionsModule> {
    return {
      ngModule: ExceptionsModule,
      providers: [
        {
          provide: ERROR_MESSAGES,
          useValue: errorMessages,
          multi: true,
        },
      ],
    };
  }
}
