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
} from "@shared/inputs/ui/ionic";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { NgxsModule } from "@ngxs/store";
import { NewProductState } from "./store";
import { ErrorMessagePipe, ExceptionsModule } from "@shared/exceptions";
import { ClearInputButtonComponent } from "@shared/inputs/ui/ionic";
import { CustomizationEditorComponent } from "../customization-editor";
import { ProductEditorComponent } from "../product-editor";

import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { ButtonGroupComponent } from "../../ui";
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
    CustomizationEditorComponent,
    ProductEditorComponent,
    ErrorCardComponent,
    ButtonGroupComponent,
  ],
  declarations: [NewProductPage],
})
export class NewProductPageModule {}
