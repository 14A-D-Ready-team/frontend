import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NewProductPageRoutingModule } from "./new-product-routing.module";

import { NewProductPage } from "./new-product.page";
import {
  ErrorListComponent,
  ImageSelectorComponent,
  SelectorInputComponent,
} from "@shared/inputs/feature/ionic";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { NgxsModule } from "@ngxs/store";
import { NewProductState } from "./store";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";
import { ClearInputButtonComponent } from "@shared/inputs/ui";
import { CustomizationInputComponent } from "../customization-input";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    NgxsModule.forFeature([NewProductState]),
    ExceptionsModule.forFeature({}),
    NewProductPageRoutingModule,
    SelectorInputComponent,
    ErrorListComponent,
    ImageSelectorComponent,
    ErrorMessagePipe,
    ClearInputButtonComponent,
    CustomizationInputComponent,
  ],
  declarations: [NewProductPage],
})
export class NewProductPageModule {}
