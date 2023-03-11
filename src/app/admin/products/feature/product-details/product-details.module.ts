import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductDetailsPage } from "./product-details.page";
import {
  ErrorListComponent,
  SelectorInputComponent,
} from "@shared/inputs/feature/ionic";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";
import { ProductDetailsPageRoutingModule } from "./product-details-routing.module";
import { ProductEditorComponent } from "../product-editor";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    ProductDetailsPageRoutingModule,
    SelectorInputComponent,
    ErrorListComponent,
    ProductEditorComponent,
  ],
  declarations: [ProductDetailsPage],
})
export class ProductDetailsPageModule {}
